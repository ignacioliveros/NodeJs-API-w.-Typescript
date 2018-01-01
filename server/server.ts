import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';

import {Student} from '../models/studentModel';
import { DbContex } from '../mongoDb/dbContext';
import { DbSeeder} from '../mongoDb/dbSeeder';
import { StudentRepository } from '../repositories/student.repository';
import { Routes } from '../router/routes';
import {Enviroment, EnviromentOptions } from './enviroment';

export class Server {

    public app: express.Application;
    private port = 3000;
    private server: http.Server;

    constructor() {
        this.app = express();
        this.bootstrap();
        this.initExpressMiddleWare();
        this.router();
        this.dbConnection();
    }

    private bootstrap() {
        Enviroment.setEnviroment(EnviromentOptions.development);
        this.server = http.createServer(this.app);
        this.server.listen(this.port);
        this.server.on('listening', () => {
            console.log(`Listening on port ` + this.port);
        });
    }

    private dbConnection() {
        const database = new DbContex();
        const seeder = new DbSeeder();
        database.open(() => {
            // Set NODE_ENV to 'development' to only run
            // the seeder when in dev mode
            if (process.env.NODE_ENV === EnviromentOptions.development) {
                seeder.init();
             }
        });
    }

    public initExpressMiddleWare() {
        this.app.use(express.static('public'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private router(): void {
         const router = new Routes();
         router.load(this.app, './controller');
    }
}
const server = new Server();

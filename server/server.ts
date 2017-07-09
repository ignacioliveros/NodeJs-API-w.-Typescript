import * as express from 'express';
import * as http from 'http';

import { StudentRepository } from '../repositories/student.repository';
import { DbContex } from '../mongoDb/dbContext';
import { Routes } from '../routes/routes';


export class Server {
 
    public app: express.Application;
    private port=3000;
    private server: http.Server;

    constructor() {
        this.app = express();  
        this.bootstrap();
        this.router();
        this.dbConnection();
    }    

    private bootstrap() {              
        this.server = http.createServer(this.app);
        this.server.listen(this.port);
        this.server.on("listening", () => {
            console.log(`Listening on port ` + this.port);
        });
    }

    private dbConnection() {
        var db = new DbContex();
    }
   
    private router(): void {   
        let repo = new StudentRepository();
        let routes = new Routes(repo);
        this.app.use('/api', routes.routesSet());     
    }
}

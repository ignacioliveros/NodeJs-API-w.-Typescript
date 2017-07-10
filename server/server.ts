import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';

import { StudentRepository } from '../repositories/student.repository';
import { DbContex } from '../mongoDb/dbContext';
import { StudentsRoutes } from '../routes/routes';


export class Server {
 
    public app: express.Application;
    private port=3000;
    private server: http.Server;

    constructor() {
        this.app = express();  
        this.bootstrap();
        this.config();
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

    public config() { 
        this.app.use(bodyParser.json());       
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
    }
   
    private router(): void {   
        let repo = new StudentRepository();
        let studentsRoutes = new StudentsRoutes(repo);        
        this.app.use('/api/students', studentsRoutes.routesSet());  
        
    }
}
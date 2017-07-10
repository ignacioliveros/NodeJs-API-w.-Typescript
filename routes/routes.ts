import { Router, Request, Response, NextFunction } from 'express';

import Student from '../mongoDb/models/studentModel';
import { IStudent } from '../mongoDb/models/studentModel';
import { IStudentRepository } from '../repositories/student.repository';


export class StudentsRoutes{

    public studentRouter: Router;   
    public student: IStudent;    

    constructor(public repo: IStudentRepository) {
        this.studentRouter = Router();        
    }    
    
    public routesSet() {
        this.studentRouter.route('/')
            .get((req: Request, res: Response) => {
                this.repo.GetAll()
                    .then((data) => {
                        if (data.err) {
                            res.status(500).send(data.err);
                        }
                        else {
                            res.json(data.student);
                        }
                    });
            })
            .post((req: Request, res: Response) => {
                this.repo.Create(req.body)
                    .then((data) => {
                        if (data.err) {
                            res.status(500).send(data.err);
                        }
                        else {
                            res.status(201).json(data.student);
                        }
                    });
                
            });
        
        this.studentRouter.use('/:studentId', (req: Request, res: Response, next: NextFunction)=>{
            this.repo.GetById(req.params.studentId)
                .then((data) => {
                    if (data.err) {
                        res.status(500).send(data.err);
                    }
                    else if (data.student) {
                        req.object = data.student; // I add the var 'object: any' to 'interface Request' in node_modules\@types\express-serve-static-core\index.d.ts 
                        next();
                    }
                    else {
                        res.status(400).send({ "message": "Student does not exist" });
                    }
                });
        }); 

        this.studentRouter.route('/:studentId')
            .get((req: Request, res: Response) => {
                res.json(req.object);
            })
            .put((req: Request, res: Response) => {               
                this.repo.Update(req.object, req.body)                   
                    .then((data) => {
                        if (data.err) {
                            res.status(500).send(data.err);
                        }
                        else {
                            res.status(200).json(data.raw);
                        }
                    });
            })
            .delete((req: Request, res: Response) => {
                this.repo.Delete(req.object)
                    .then((data) => {
                        if (data.err) {
                            res.status(500).send(data.err);
                        }
                        else {
                            res.status(204).send({ "message": "Deleted" });;
                        }
                    });
            });     

       //404 
       this.studentRouter.use(function (req, res, next) {
           res.status(404);
           
           // respond with json
           if (req.accepts('json')) {
               res.send({ error: 'Not found' });
               return;
           }

           // default to plain-text. send()
           res.type('txt').send('Not found');
       }); 
      
       return this.studentRouter;
    }

  
}
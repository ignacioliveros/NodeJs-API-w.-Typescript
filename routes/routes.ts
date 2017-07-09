import { Router, Request, Response } from 'express';

import Student from '../mongoDb/models/studentModel';
import { IStudent } from '../mongoDb/models/studentModel';
import { IStudentRepository } from '../repositories/student.repository';


export class Routes{

    public studentRouter: Router;   
    public student: IStudent;    

    constructor(public repo: IStudentRepository) {
        this.studentRouter = Router();
    }    
    
    public routesSet() {
        this.studentRouter.route('/Student')
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
            });
        
       this.studentRouter.get('/Student', (req: Request, res: Response) => {   
          this.repo.GetAll()
               .then((data) => {
                   if (data.err)
                   {
                       res.status(500).send(data.err);
                   }                   
                   else {                       
                       res.json(data.student);   
               }   
           });             
       });
       
       this.studentRouter.get('/Student/:studentId', (req: Request, res: Response) => {
          this.repo.GetById(req.params.studentId)
               .then((data) => {
                   if (data.err) {
                       res.status(500).send(data.err);
                   }
                   else if (data.student === null) {
                       res.status(400).send({ "message": "Student does not exist" });
                   }
                   else {                      
                       res.json(data.student);
                   }
               });
       });
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
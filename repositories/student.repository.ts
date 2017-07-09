import Student from '../mongoDb/models/studentModel'
import {IStudent} from '../mongoDb/models/studentModel'

export interface IStudentRepository{
    GetAll():Promise<{ student: IStudent[], err:any }>;
    GetById(studentId: string): Promise<{ student: IStudent, err: any }>;
    Create();
    Update();
}

export class StudentRepository implements IStudentRepository{  
  
   constructor() {
       
   } 

   public GetAll(): Promise<{ student: IStudent[], err:any }>{   
       return new Promise((resolve) => {
           Student.find((err, studentModel) => { 
               let student:IStudent[] = studentModel ;
               resolve({ student, err });
           });           
        });           
    }

   public GetById(studentId: string): Promise<{ student: IStudent, err: any }> {
       return new Promise((resolve) => {
           Student.findById(studentId, (err, studentModel) => {
               let student: IStudent = studentModel;
               resolve({ student, err });
           });
       });
   }     
  
    Create() { 
     
    };
    Update() { 

    };
}


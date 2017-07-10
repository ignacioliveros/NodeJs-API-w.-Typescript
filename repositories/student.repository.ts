import Student from '../mongoDb/models/studentModel'
import {IStudent} from '../mongoDb/models/studentModel'

export interface IStudentRepository{
    GetAll():Promise<{ student: IStudent[], err:any }>;
    GetById(studentId: string): Promise<{ student: IStudent, err: any }>;
    Create(student: IStudent): Promise<{ student: IStudent, err: any }>;
    Update(studentToUpdate: IStudent, student: IStudent): Promise<{ raw: any, err: any }>;
    Delete(studentToRemove: IStudent): Promise<{ err: any }>;
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
  
   public Create(student: IStudent):Promise<{ student: IStudent, err:any }>{
       return new Promise((resolve) => {
           Student.create(student,(err, studentModel) => {
               let student: IStudent = studentModel;
               resolve({ student, err });
           });
       });           
   }
    
   public Update(studentToUpdate: IStudent, student:IStudent ): Promise<{ raw: any, err: any }> {      
       return new Promise((resolve) => {           
                   Student.update(studentToUpdate, student, (err, raw) => {
                       resolve({ raw, err });
                   }); 
       });
   }

   public Delete(studentToRemove: IStudent): Promise<{ err: any }> { 
       return new Promise((resolve) => {          
                   Student.findByIdAndRemove(studentToRemove, (err) => {                       
                       resolve({ err });
                   });  
       });      
   } 
}


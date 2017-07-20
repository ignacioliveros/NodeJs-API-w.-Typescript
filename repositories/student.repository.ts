import { Document, Model } from "mongoose";
import { IStudent, IStudentModel, Student } from "../models/studentModel";
import { BaseRepository, IBaseRepository } from "./base.repository";

// tslint:disable-next-line:no-empty-interface
export interface IStudentRepository extends BaseRepository<IStudent, IStudentModel> {
    GetByName(fullName: string): Promise<{ students: IStudent[], err: any }>;
}

export class StudentRepository extends BaseRepository<IStudent, IStudentModel> implements IStudentRepository  {

    constructor(private student: Model<IStudentModel> ) {
        super(student);
    }

    GetByName(fullName: string): Promise<{ students: IStudent[], err: any }> {
        return new Promise((resolve) => {
            let regex = new RegExp(this.escapeRegex(fullName), "gi");
            Student.find({ fullName: regex }, (err, studentModel) => {
                let students: IStudent[] = studentModel;
                resolve({ students, err });
            });
        });
    }

    escapeRegex(text): string {
        if (text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }
    }
}

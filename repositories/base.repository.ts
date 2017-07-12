import { Document, Model} from "mongoose";

export interface IBaseRepository<T> {
    GetAll(): Promise<{ students: T[], err: any }>;
    GetById(studentId: string): Promise<{ student: T, err: any }>;
    Create(student: T): Promise<{ student: T, err: any }>;
    Update(studentToUpdate: T, student: T): Promise<{ raw: any, err: any }>;
    Delete(studentToRemove: T): Promise<{ err: any }>;
}

export class BaseRepository<T, M extends T & Document> implements IBaseRepository<T> {

    constructor(private dbModel: Model<M>) {

    }

    public GetAll(): Promise<{ students: T[], err: any }> {
        return new Promise((resolve) => {
            this.dbModel.find((err, studentModel) => {
                let students: T[] = studentModel;
                resolve({ students, err });
            });
        });
    }

    public GetById(studentId: string): Promise<{ student: T, err: any }> {
        return new Promise((resolve) => {
            this.dbModel.findById(studentId, (err, studentModel) => {
                let student: T = studentModel;
                resolve({ student, err });
            });
        });
    }

    public Create(student: T): Promise<{ student: T, err: any }> {
        return new Promise((resolve) => {
            this.dbModel.create(student, (err, studentModel) => {
                let student: T = studentModel;
                resolve({ student, err });
            });
        });
    }

    public Update(studentToUpdate: T, student: T): Promise<{ raw: any, err: any }> {
        return new Promise((resolve) => {
            this.dbModel.update(studentToUpdate, student, (err, raw) => {
                resolve({ raw, err });
            });
        });
    }

    public Delete(studentToRemove: T): Promise<{ err: any }> {
        return new Promise((resolve) => {
            this.dbModel.findByIdAndRemove(studentToRemove, (err) => {
                resolve({ err });
            });
        });
    }
}

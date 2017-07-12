import { IStudent, IStudentModel } from "../mongoDb/models/studentModel";
import { BaseRepository, IBaseRepository} from "./base.repository";

// tslint:disable-next-line:no-empty-interface
export interface IStudentRepository extends IBaseRepository < IStudent> {

}

export class StudentRepository extends BaseRepository<IStudent, IStudentModel> {

}

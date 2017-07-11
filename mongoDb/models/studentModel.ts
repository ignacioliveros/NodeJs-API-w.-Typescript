import {  Document, model, Mongoose, Schema, Types } from "mongoose";

export interface IStudent  {
    name: string;
    lastName: string;
    age: number;
    email: string;
    address: IAddress[];
}

export interface IAddress  {
    street: string;
    number: number;
    floor?: number;
    apartment?: string;
}

interface IAddressModel extends IAddress, Types.Subdocument { }

interface IStudentModel extends IStudent, Document { }

export const AddressSchema = new Schema({
    apartment: { type: String, required: false },
    floor: { type: Number, required: false },
    number: Number,
    street: String,

});

export const StudentSchema = new Schema({
    address: [AddressSchema],
    age: Number,
    email: { type: String, required: true },
    lastName: { type: String, required: true },
    name: { type: String, required: true },
});

const Student = model<IStudentModel>("Student", StudentSchema);

export default Student;

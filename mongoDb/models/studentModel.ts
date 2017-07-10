import {  Document, Schema, Mongoose, model, Types } from 'mongoose';

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

export interface IStudentModel extends IStudent, Document { }

export const AddressSchema = new Schema({
    street: String,
    number: Number,
    floor: { type: Number, required: false },
    apartment: { type: String, required: false }
});

export const StudentSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    age: Number,
    email: { type: String, required: true },
    address: [AddressSchema]
});


const Student = model<IStudentModel>('Student', StudentSchema);

export default Student;
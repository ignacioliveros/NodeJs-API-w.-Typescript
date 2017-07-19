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

export interface IStudentModel extends IStudent, Document { }

const AddressSchema = new Schema({
    apartment: { type: String, required: false },
    floor: { type: Number, required: false },
    number: Number,
    street: String,

});

const StudentSchema = new Schema({
    address: [AddressSchema],
    age: Number,
    email: {
        type: String,
        required: true,
        validate: (email: string) => {
            return /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
        },
        message: "{VALUE} is not a valid email!",
    },
    lastName: { type: String, required: true },
    name: { type: String, required: true },
});

export const Student = model<IStudentModel>("Student", StudentSchema);

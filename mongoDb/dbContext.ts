import * as mongoose from "mongoose";

import { IAddress, IStudent } from "../mongoDb/models/studentModel";
import Student from "../mongoDb/models/studentModel";

export class DbContex {

    constructor() {
        this.dbConnection();
        this.DbSeed(); // only for dev...
    }

   public  dbConnection() {
        return mongoose.connect("mongodb://localhost/student");
    }

   private DbSeed() {
       let studentsSeed: IStudent[] = [{
           name: "Ignacio",
           lastName: "Oliveros",
           age: 37,
           email: "ignacioliveros@gmail.com",
           address: [{
               street: "Acuña de Figueroa",
               number: 1511,
               apartment: "C",
               floor: 8,
           },
           {
               number: 1050,
               street: "Somosa",
           },
           ],
       },
       {
           name: "Joanna",
           lastName: "Roney",
           age: 38,
           email: "joannaroney@gmail.com",
           address: [{
               street: "Acuña de Figueroa",
               number: 1511,
               apartment: "C",
               floor: 8,
           }],
       },
       {
           name: "Evangelina",
           lastName: "Oliveros",
           age: 39,
           email: "evanoliveros@gmail.com",
           address: [{
               street: "Somosa",
               number: 1050,
           }],

       },
       {
           name: "Luis",
           lastName: "Oliveros",
           age: 70,
           email: "luisoliveros@gmail.com",
           address: [{
               street: "Somosa",
               number: 1050,
           }],

       }];

       Student.find((err, students) => {
           if (students.length === 0) {
               for (let student of studentsSeed) {
               Student.create(student);
               }
           } else {
               console.log("Db exist");
           }
       });
   }

}

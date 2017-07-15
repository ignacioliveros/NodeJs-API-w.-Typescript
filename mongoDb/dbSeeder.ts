import * as mongoose from "mongoose";

import { IAddress, IStudent, Student } from "../models/studentModel";

export class DbSeeder {
    public init() {
        mongoose.connection.db.listCollections({ name: "students" })
            .next((err, collinfo) => {
                if (!collinfo) {
                    console.log("Starting dbSeeder...");
                    this.DbSeed();
                }
            });
    }

    private DbSeed() {
        for (let student of this.studentsSeed) {
            Student.create(student);
        }
    }

    private studentsSeed: IStudent[] = [{
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

}

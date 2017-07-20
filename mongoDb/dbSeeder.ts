import * as mongoose from 'mongoose';

import { IAddress, IStudent, Student } from '../models/studentModel';

export class DbSeeder {


    private studentsSeed: IStudent[] = [{
        name: 'Juan',
        lastName: 'Perez',
        fullName: 'Juan Perez',
        age: 37,
        email: 'juanperezs@gmail.com',
        address: [{
            street: 'Medrano',
            number: 1501,
            apartment: 'B',
            floor: 8,
        },
        {
            number: 1050,
            street: 'Somosa',
        },
        ],
    },
    {
        name: 'Maria',
        lastName: 'Fernandez',
        fullName: 'Maria Fernandez',
        age: 38,
        email: 'mfernandez@gmail.com',
        address: [{
            street: 'Rivadavia',
            number: 2300,
            apartment: 'A',
            floor: 2,
        }],
    },
    {
        name: 'Martin',
        lastName: 'Gonzalez',
        fullName: 'Martin Gonzalez',
        age: 39,
        email: 'tinchogonzalez@gmail.com',
        address: [{
            street: 'Cordoba',
            number: 2020,
        }],

    },
    {
        name: 'Luis',
        lastName: 'Rodriguez',
        fullName: 'Luis Rodriguez',
        age: 70,
        email: 'rluis@gmail.com',
        address: [{
            street: 'Charcas',
            number: 2258,
            floor: 10,
            apartment: 'D',
        }],

    }];

    public init() {
        mongoose.connection.db.listCollections({ name: 'students' })
            .next((err, collinfo) => {
                if (!collinfo) {
                    console.log('Starting dbSeeder...');
                    this.DbSeed();
                }
            });
    }


    private DbSeed() {
        console.log('Seeding data....');
        for (const student of this.studentsSeed) {
            Student.create(student);
            console.log('inserted customer: ' + student.fullName);
        }
        console.log('Database created and seeded');
    }


}

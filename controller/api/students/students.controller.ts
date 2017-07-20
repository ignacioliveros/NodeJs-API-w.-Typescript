import { NextFunction, Request, Response, Router } from "express";

import { IStudent, Student } from "../../../models/studentModel";
import {IStudentRepository , StudentRepository } from "../../../repositories/student.repository";

export class StudentController {

    public student: IStudent;
    private studentRepo: IStudentRepository;

    constructor(private studentRouter: Router) {
        this.routesSet();
        this.studentRepo = new StudentRepository(Student);
    }
    public routesSet() {
        this.studentRouter.route("/")
            .get((req: Request, res: Response) => {
                if (req.query.fullname ) {
                    this.studentRepo.GetByName(req.query.fullname)
                        .then((data) => {
                            if (data.err) {
                                res.status(500).send(data.err);
                            } else {
                                res.json(data.students);
                            }
                        });
                }else {
                    this.studentRepo.GetAll()
                        .then((data) => {
                            if (data.err) {
                                res.status(500).send(data.err);
                            } else {
                                res.json(data.entities);
                            }
                        });
                }
                })
            .post((req: Request, res: Response) => {
                let student: IStudent = req.body;
                if (!student.fullName) {
                    student.fullName = req.body.name + " " + req.body.lastName;
                }
                this.studentRepo.Create(student)
                    .then((data) => {
                        if (data.err) {
                            res.status(500).send(data.err);
                        } else {
                            res.status(201).json(data.entity);
                        }
                    });

            });

        this.studentRouter.use("/:studentId", (req: Request, res: Response, next: NextFunction) => {
            this.studentRepo.GetById(req.params.studentId)
                .then((data) => {
                    if (data.err) {
                        res.status(500).send(data.err);
                    } else if (data.entity) {
                        // I added the 'var object: any' to 'interface Request'
                        // in node_modules\ @types\express - serve - static - core\index.d.ts
                        req.object = data.entity;
                        next();
                    } else {
                        res.status(400).send({ message: "Student does not exist" });
                    }
                });
        });

        this.studentRouter.route("/:studentId")
            .get((req: Request, res: Response) => {
                res.json(req.object);
            })
            .put((req: Request, res: Response) => {
                this.studentRepo.Update(req.object, req.body)
                    .then((data) => {
                        if (data.err) {
                            res.status(500).send(data.err);
                        } else {
                            res.status(200).json(data.raw);
                        }
                    });
            })
            .delete((req: Request, res: Response) => {
                this.studentRepo.Delete(req.object)
                    .then((data) => {
                        if (data.err) {
                            res.status(500).send(data.err);
                        } else {
                            res.status(204).send({ message: "Deleted" });
                        }
                    });
            });

        // 404
        this.studentRouter.use((req, res, next) => {
            res.status(404);

            // respond with json
            if (req.accepts("json")) {
                res.send({ error: "Not found" });
                return;
            }

            // default to plain-text. send()
            res.type("txt").send("Not found");
        });

       // return this.studentRouter;
    }

}

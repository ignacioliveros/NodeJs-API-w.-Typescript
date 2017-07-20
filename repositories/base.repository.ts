import { Document, Model} from "mongoose";

export interface IBaseRepository<T> {
    GetAll(): Promise<{ entities: T[], err: any }>;
    GetById(entityId: string): Promise<{ entity: T, err: any }>;
    Create(entity: T): Promise<{ entity: T, err: any }>;
    Update(entityToUpdate: T, entity: T): Promise<{ raw: any, err: any }>;
    Delete(entityToRemove: T): Promise<{ err: any }>;
}

export class BaseRepository<T, M extends T & Document> implements IBaseRepository<T> {

    constructor(private dbModel: Model<M>) {

    }

    public GetAll(): Promise<{ entities: T[], err: any }> {
        return new Promise((resolve) => {
            this.dbModel.find((err, model) => {
                let entities: T[] = model;
                resolve({ entities, err });
            });
        });
    }

    public GetById(entityId: string): Promise<{ entity: T, err: any }> {
        return new Promise((resolve) => {
            this.dbModel.findById(entityId, (err, model) => {
                let entity: T = model;
                resolve({ entity, err });
            });
        });
    }

    public Create(entity: T): Promise<{ entity: T, err: any }> {
        return new Promise((resolve) => {
            this.dbModel.create(entity, (err, model) => {
                let entity: T = model;
                resolve({ entity, err });
            });
        });
    }

    public Update(entityToUpdate: T, entity: T): Promise<{ raw: any, err: any }> {
        return new Promise((resolve) => {
            this.dbModel.update(entityToUpdate, entity, (err, raw) => {
                resolve({ raw, err });
            });
        });
    }

    public Delete(entityToRemove: T): Promise<{ err: any }> {
        return new Promise((resolve) => {
            this.dbModel.findByIdAndRemove(entityToRemove, (err) => {
                resolve({ err });
            });
        });
    }
}

import {Model, ModelCtor} from "sequelize-typescript";

export interface PaginateQueryInterface {
    page?: number;
    skip?: number;
    take?: number;
    filter?: string;
    sort?: string;
}

export interface PaginateOptions {
    model?: ModelCtor<Model<any, any>>;
    skip?: number;
    page?: number;
    take?: number;
    filter?: string;
    sort?: string;
}
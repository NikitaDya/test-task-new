import { UserModelType, HobbiesModelType } from './type';
import { StatusHttpCodeEnum } from './enum';
import {ResponseEntity} from "./model/responce";

interface IService {
    getAll(limit?: number, offset?: number);
    getById(id: string);
    updateById(id: string);
    deleteById(id: string);
}

export interface IUserService extends IService {
    create(body: UserModelType);
}

export interface IHobbiesService extends IService {
    create(body);
}

export interface IServiceResponce<T> {
    status: StatusHttpCodeEnum;
    error?: string;
    data?: T;
}
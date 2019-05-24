import {NextFunction, Request, Response} from 'express';
import { HobbiesModelType, UserModelType } from '../type'

export abstract class AbstractController {

    abstract getAll(req: Request, res: Response, next: NextFunction): void;
    abstract getById(req: Request, res: Response, next: NextFunction): void;
    abstract create(req: Request, res: Response, next: NextFunction): void;
    abstract updateById(req: Request, res: Response, next: NextFunction): void;
    abstract deleteById(req: Request, res: Response, next: NextFunction): void;
}


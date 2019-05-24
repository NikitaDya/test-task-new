import { Request, Response, NextFunction } from 'express';
import { AbstractController } from '../shared/model/controller';
import service from '../service/user';
import {APIError} from "../shared/model/handlerError";
import { validate } from '../validate';

export class UserController extends AbstractController {

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await service.getAll();
            res.status(result.status).json(result.data);
        } catch (err) {
            next(new APIError(err.status, err.message))
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        try {
            validate('CREATE_USER', req.body);

            const body = req.body;
            const result = await service.create(body);

            res.status(result.status).json(result.data);
        } catch (err) {
            next(new APIError(err.status, err.message))
        }
    }

    async getById(req: Request, res: Response, next: NextFunction){}

    async updateById(req: Request, res: Response, next: NextFunction){}

    async deleteById(req: Request, res: Response, next: NextFunction){}
}
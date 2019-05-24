import {NextFunction, Request, Response} from 'express';
import { AbstractController } from '../shared/model/controller';
import { ResponseEntity } from '../shared/model/responce';
import service from "../service/hobbies";
import {APIError} from "../shared/model/handlerError";
import { CreateHobbyType } from '../shared/type';
import {validate} from "../validate";

export class HobbiesController extends AbstractController {
    async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const result = await service.deleteById(id);
            res.status(result.status).json(result.data);
        } catch (err) {
            next(new APIError(err.status, err.message))
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        try {
            validate('CREATE_HOBBIES', req.body);
            const body: CreateHobbyType = req.body;
            const result = await service.create(body);
            res.status(result.status).json(result.data);
        } catch (err) {
            next(new APIError(err.status, err.message))
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {}

    async getById(req: Request, res: Response, next: NextFunction){}

    async updateById(req: Request, res: Response, next: NextFunction){}
}
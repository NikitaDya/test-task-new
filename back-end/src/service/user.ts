import {models} from 'mongoose';
import {IServiceResponce, IUserService} from '../shared/interface';
import {CollectionEmun, StatusHttpCodeEnum} from '../shared/enum';
import { UserModelType} from '../shared/type';
import {ResponseEntity} from '../shared/model/responce';
import {APIError} from "../shared/model/handlerError";

class UserService implements IUserService {

    async getAll(limit = 30, offset = 0) {
        let result: IServiceResponce<ResponseEntity<Array<UserModelType>>> = {
            status: StatusHttpCodeEnum.OK
        };

        await models[CollectionEmun.USER].aggregate([
            { $lookup: {from: 'hobbies', localField: '_id', foreignField: 'user', as: 'hobbies'} },
            { $skip: offset},
            { $limit: limit}
        ]) .then(res => {
            console.log(res);
            if (!res) {
                throw new APIError(StatusHttpCodeEnum.NOT_FOUND, 'Not Found')
            }
            result.data = new ResponseEntity({data: res});
        })
            .catch(err => {
                throw new APIError(StatusHttpCodeEnum.SERVER_ERROR, err.message)
            });

        return result;
    }

    async getById(id: string) {
        let result: IServiceResponce<ResponseEntity<UserModelType>> = {
            status: StatusHttpCodeEnum.OK
        };
        await models[CollectionEmun.USER]
            .findById(id)
            .populate({
                path: 'hobbies',
                model: CollectionEmun.HOBBIES
            })
            .then(res => {
                if (!res) {
                    throw new APIError(StatusHttpCodeEnum.NOT_FOUND, 'Not Found')
                }
                result.data = new ResponseEntity({data: res});
            })
            .catch(err => {
                throw new APIError(StatusHttpCodeEnum.SERVER_ERROR, err.message)
            });

        return result;
    }

    async create(body: UserModelType): Promise<IServiceResponce<ResponseEntity<UserModelType>>> {
        let result: IServiceResponce<ResponseEntity<UserModelType>> = {
            status: StatusHttpCodeEnum.CREATED
        };
        await models[CollectionEmun.USER]
            .create(body)
            .then(res => {
                if (!res) {
                    throw new APIError(StatusHttpCodeEnum.BAD_REQUEST, 'Bad request')
                }
                result.data = new ResponseEntity({data: res});
            })
            .catch(err => {
                throw new APIError(StatusHttpCodeEnum.SERVER_ERROR, err.message)
            });

        return  result;
    }

    async updateById(id: string) {}

    async deleteById(id: string) {}
}

export default new UserService();

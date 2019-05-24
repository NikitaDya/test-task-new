import {models} from 'mongoose';
import {IServiceResponce, IHobbiesService} from '../shared/interface';
import {CollectionEmun, StatusHttpCodeEnum} from '../shared/enum';
import {CreateHobbyType, HobbiesModelType} from '../shared/type';
import {ResponseEntity} from '../shared/model/responce';
import {APIError} from "../shared/model/handlerError";

class HobbiesService implements IHobbiesService {

    async getAll(limit = 20, offset = 0) {
        let result: IServiceResponce<ResponseEntity<Array<HobbiesModelType>>> = {
            status: StatusHttpCodeEnum.OK
        };

        await models[CollectionEmun.HOBBIES]
            .aggregate([
                { $lookup: {from: 'users', localField: 'user', foreignField: '_id', as: 'user'} },
                {
                    $unwind: {
                        path: '$user',
                        preserveNullAndEmptyArrays: true
                    },
                },
                { $skip: offset },
                { $limit: limit },
            ])
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

    async deleteById(id: string): Promise<IServiceResponce<ResponseEntity<boolean>>> {
        let result: IServiceResponce<ResponseEntity<boolean>> = {
            status: StatusHttpCodeEnum.CREATED
        };

        await models[CollectionEmun.HOBBIES].remove({_id: id})
            .then(res => {
                result.data = new ResponseEntity({data: true});
            })
            .catch(err => {
                throw new APIError(StatusHttpCodeEnum.SERVER_ERROR, err.message)
            });
        return result;
    }

    async create(body: CreateHobbyType) {
        let result: IServiceResponce<ResponseEntity<any>> = {
            status: StatusHttpCodeEnum.CREATED
        };

        const user = await models[CollectionEmun.USER].findOne({_id: body.user});

        if (!user) {
            throw new APIError(StatusHttpCodeEnum.BAD_REQUEST, 'Bad request');
        }

        await models[CollectionEmun.HOBBIES]
            .create(body)
            .then(res => {
                console.log(res);
                if (!res) {
                    throw new APIError(StatusHttpCodeEnum.BAD_REQUEST, 'Bad request')
                }
                result.data = new ResponseEntity({data: res});
            })
            .catch(err => {
                throw new APIError(StatusHttpCodeEnum.SERVER_ERROR, err.message)
            });
        return result;
    }


    async getById(id: string) {
        //TODO  Will need to implement

        return null;
    }

    async updateById(id: string) {
        //TODO  Will need to implement
        return null;
    }
}

export default new HobbiesService();
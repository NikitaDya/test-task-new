import Validator from 'z-schema';
import {APIError} from "../shared/model/handlerError";
import { CREATE_USER, CREATE_HOBBIES } from './schemas';
import {StatusHttpCodeEnum} from "../shared/enum";

const validator: Validator = new Validator({
    noTypeless: true,
    noExtraKeywords: true,
    noEmptyArrays: true,
    noEmptyStrings: true
});

const isSchemasValid: boolean = validator.validateSchema([CREATE_USER, CREATE_HOBBIES]);

export const validate = (schema: string, data: any) => {
    return validator.validate(data, schema, (err, isValid: boolean) => {
        if(err) {
            return false;
        }
        return true
    })
};

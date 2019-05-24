import {PassionEnum} from "./enum";

export type UserModelType = {
    id?: string
    name: string;
    hobbies: string | HobbiesModelType
}

export type HobbiesModelType = {
    name: string;
    passionLevel: PassionEnum;
    year: number;
}

export type CreateHobbyType = {
    name: string;
    passionLevel: PassionEnum;
    year: number;
    user: string;
}
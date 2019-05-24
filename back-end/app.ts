import express, { Application, Router, NextFunction, Response, Request }  from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

import { UserController, HobbiesController } from './src/controller';
import { UserRoute, HobbiesRoute } from './src/route';
import {APIError} from "./src/shared/model/handlerError";
import {ResponseEntity} from "./src/shared/model/responce";

class App {
    private static instance: App;
    private static app: Application;

    private constructor() {
        App.app = express();

        App.app.use(json());
        App.app.use(urlencoded({
            extended: false
        }));
        App.app.use(cors());

        this.initRoute();
    }

    public static getApp() {
        if(!App.instance) {
            App.instance = new App();
        }
        return this.app;
    }

    private initRoute() {
        const routes = Router();

        const userCtrl = new UserController();
        const userRoute = new UserRoute(routes, userCtrl);

        const hobbyCtrl = new HobbiesController();
        const hobbyRoute = new HobbiesRoute(routes, hobbyCtrl);


        App.app.use('/api/hobbies', hobbyRoute.route);
        App.app.use('/api/users',  userRoute.route);

        App.app.use(this.handlerError)
    }

    private handlerError(err: APIError, req: Request, res: Response, next: NextFunction) {
        if (!err.status || !err.message) {
            res.status(400).json(new ResponseEntity({error: 'Bad request'}));
        }

        res.status(err.status).json(new ResponseEntity({error: err.message}));
    }
}

export default App;
import { Router } from 'express';
import { AbstractController } from '../shared/model/controller';

export class UserRoute {
    public route: Router;
    private controller: AbstractController;

    constructor(route: Router, controller: AbstractController) {
        this.route = Router();
        this.controller = controller;

        this.init();
    }

    init() {
        this.route.get('/', this.controller.getAll);
        this.route.get('/:id', this.controller.getById);

        this.route.post('/', this.controller.create);
        this.route.put('/:id', this.controller.updateById);
        this.route.delete('/:id', this.controller.deleteById);
    }
}

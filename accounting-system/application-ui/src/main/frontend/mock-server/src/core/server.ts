import 'reflect-metadata';
import {InversifyExpressServer} from 'inversify-express-utils';
import {JsonServer} from './json-server/json-server';
import {Application, Router} from 'express';

import {interfaces} from 'inversify';
import Container = interfaces.Container;

export class Server {
    readonly router: Router;
    readonly express: InversifyExpressServer;
    readonly app: Application;

    constructor(readonly container: Container) {
        this.router = Router();
        this.express = new InversifyExpressServer(container, this.router);
        this.app = this.express.build();
    }

    start(port = 10200) {
        (<JsonServer>this.container.get(JsonServer)).start(this.router);
        this.app.listen(port);
    }
}


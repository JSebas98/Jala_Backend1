import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './shared/inversify.config';
import './controller/user.controller';
import handleError from './shared/exceptions/errorHandler.middleware';

export class Server {
    private port = process.env.API_PORT;
    private server: InversifyExpressServer;

    constructor() {
        this.server = new InversifyExpressServer(container);
        this.server.setConfig((app: Application) => {
            app.use(express.urlencoded({extended: true}));
            app.use(express.json());
        });
    }

    start() {
        const api = this.server.build();
        
        api.use(handleError);
        api.listen(this.port, ()=> {
            console.log(`Server is listening on ${this.port} port.`);
        });
    }
}

const server = new Server();
server.start();
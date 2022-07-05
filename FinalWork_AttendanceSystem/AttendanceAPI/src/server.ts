import 'reflect-metadata'
import express, { Application } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./shared/inversify.config";
import './controller/attendance.controller';

export class Server {
    private port: number = 3000;
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

        api.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}.`);
        });
    }
}

const server = new Server();
server.start();
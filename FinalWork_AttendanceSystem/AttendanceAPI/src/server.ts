import 'reflect-metadata'
import * as dotenv from 'dotenv';
dotenv.config();
import express, { Application } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./shared/inversify.config";
import './controller/attendance.controller';
import { DbConnection } from './infrastructure/db-connection';
import handleError from './shared/exceptions/errorHandler.middleware';
import { StatsService } from './service/stats.service';

export class Server {
    private port = process.env.API_PORT;
    private server: InversifyExpressServer;
    private dbConnection: DbConnection;

    constructor() {
        this.server = new InversifyExpressServer(container);
        this.server.setConfig((app: Application) => {
            app.use(express.urlencoded({extended: true}));
            app.use(express.json());
        });
        this.dbConnection = new DbConnection();
    }

    async start() {
        await this.dbConnection.connect();

        const api = this.server.build();
        api.use(handleError);        
        
        api.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}.`);
        });
    }
}

const server = new Server();
server.start();
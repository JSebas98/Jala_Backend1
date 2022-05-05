import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    database: "chess.sql",
    host: "localhost",
    port: 3306,
    synchronize: true,
    logging: false,
    entities: ["entity/*js"],
    migrations: [],
    subscribers: []
});
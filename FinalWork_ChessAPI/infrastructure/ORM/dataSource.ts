import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    database: "chess.sql",
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: []
});
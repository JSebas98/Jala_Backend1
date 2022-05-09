import "reflect-metadata";
import { DataSource } from "typeorm";

export const SQLiteDataSource = new DataSource({
    type: "sqlite",
    database: "chess.sqlite",
    synchronize: true,
    logging: false,
    entities: ["../../entity/*.ts"],
    migrations: [],
    subscribers: []
});

// Initialize database
SQLiteDataSource.initialize();
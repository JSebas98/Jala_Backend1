import { DataSource } from "typeorm";
import { User } from "../entity/user.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Sebas.root.98',
    database: 'User',
    entities: [User]
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized.');
    })
    .catch((err) => {
        console.log('Error during Data Source initialization', err);
    });
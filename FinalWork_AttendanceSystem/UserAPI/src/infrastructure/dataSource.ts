import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User]
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized.');
    })
    .catch((err) => {
        console.log('Error during Data Source initialization', err);
    });
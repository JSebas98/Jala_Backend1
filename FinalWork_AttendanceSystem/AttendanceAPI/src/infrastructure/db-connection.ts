import mongoose from 'mongoose';

export class DbConnection {
    
    async connect() {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {})
            .then(() => console.log('Database attendances has been initialized.'))
            .catch(error => console.log('Error connecting to database attendances: ', error));
    }

    async disconnect() {
        await mongoose.disconnect()
            .then(() => console.log('Connection to attendances has been closed.'))
            .catch(error => console.log('Error disconnecting from database attendances: ', error));
    }
}
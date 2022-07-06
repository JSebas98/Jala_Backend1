import mongoose from 'mongoose';

export class DbConnection {

    private DB_CONNECTION_STRING = 'mongodb://localhost:27017/attendances';
    
    async connect() {
        await mongoose.connect(this.DB_CONNECTION_STRING, {})
            .then(() => console.log('Database attendances has been initialized.'))
            .catch(error => console.log('Error connecting to database attendances: ', error));
    }

    async disconnect() {
        await mongoose.disconnect()
            .then(() => console.log('Connection to attendances has been closed.'))
            .catch(error => console.log('Error disconnecting from database attendances: ', error));
    }
}
import mongoose from 'mongoose';

export class DbConnection {

    private DB_CONNECTION_STRING = 'mongodb://localhost:27017/myapp';
    
    async connect() {
        await mongoose.connect(this.DB_CONNECTION_STRING, {});
    }

    async disconnect() {
        await mongoose.disconnect();
    }
    
}
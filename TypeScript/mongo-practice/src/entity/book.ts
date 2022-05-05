import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    author: {
        type: String
    },
    title: {
        type: String,
        default: 'No title'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Book', bookSchema);
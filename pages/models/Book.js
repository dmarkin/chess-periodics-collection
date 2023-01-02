import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    previousNames: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: false
    },
    startDate: {
        type: String,
        required: false
    },
    notPrecisedStartDate: {
        type: Boolean,
        required: false
    },
    endDate: {
        type: String,
        required: false
    },
    notPrecisedEndDate: {
        type: Boolean,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    countries: {
        type: [String],
        required: true
    },
    language: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    sources: {
        type: [String],
        required: true
    },
    availability: {
        type: String,
        required: false
    }
});

export default mongoose.models.book || mongoose.model('book', bookSchema);

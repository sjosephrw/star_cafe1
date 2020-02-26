const mongoose = require('mongoose');

const slideShowSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Slide must have a name.'],
        unique: true,
        trim: true
    },
    summary: {
        type: String,
        required: [true, 'A Slide mst have a summary.'],
        trim: true
    },
    link: {
        type: String,
        required: [true, 'A Slide mst have a summary.'],
        trim: true
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }     
});

const SlideShow = mongoose.model('SlideShow', slideShowSchema);

module.exports = SlideShow;
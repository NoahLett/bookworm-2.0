const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 500,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        isbn: {
            type: String,
            max: 100,
            required: true,
        },
        title: {
            type: String,
            max: 100,
            required: true,
        },
        likes: {
            type: Array,
            default:[],
        },
        sale: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model('Post', PostSchema);
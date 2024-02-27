const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 4,
            max: 20,
            unique: true,
        },
        email: {
            type: String,
            require: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        profilePicture: {
            type: String,
            default: '',
        },
        coverPicture: {
            type: String,
            default: '',
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        desc: {
            type: String,
            max: 50,
        },
        city: {
            type: String,
            max: 50,
        },
        state: {
            type: String,
            max: 50,
        },
        areaOfStudy: {
            type: String,
            max: 100,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
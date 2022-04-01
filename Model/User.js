const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    dateCreated: {
        type: Date,
    },
    dateUpdated: {
        type: Date
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ['user', 'admin', 'privileged'],
        required: true
    }
})
module.exports = mongoose.model("User", UserSchema);
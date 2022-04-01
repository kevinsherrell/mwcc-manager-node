const mongoose = require('mongoose');
const {Schema} = mongoose;
const ProfileSchema = new Schema({
    dateCreated: {
        type: Date,
        // default: Date.now(),
        // required: true
    },
    dateUpdated: {
        type: Date,
        // default: Date.now(),
        // required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    store:{
      type: Schema.Types.ObjectId,
        ref: 'Store'
    },
    role: {
        type: String,
        required: true
    },
    salesHourly: {
        type: Number,
        required: true,
        default: 0
    },
    hourlyRegular: {
        type: Number,
        required: true,
        default: 0
    },
    uhaulRate: {
        type: Number,
        required: true,
        default: 0
    },
    vacationDays: {
        type: Number,
        required: true,
        default: 0
    },
    sickDays: {
        type: Number,
        required: true,
        default: 0
    }
})
module.exports = mongoose.model('Profile', ProfileSchema);
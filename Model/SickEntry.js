const mongoose = require('mongoose');
const {Schema} = mongoose;
const SickEntrySchema = new Schema({
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    dateUpdated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    timesheet: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Timesheet'
    },
    date: {
        type: Date,
        required: true
    },
    totalHours: {
        type: Number,
        required: true,
        default: 8
    }
})
module.exports = mongoose.model('SickEntry', SickEntrySchema);
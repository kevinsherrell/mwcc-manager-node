const mongoose = require('mongoose');
const {Schema} = mongoose;
const VacationEntrySchema = new Schema({
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
        required: true,
        default: null
    },
    totalHours: {
        type: Number,
        required: true,
        default: 8
    }
})
module.exports = mongoose.model('VacationEntry', VacationEntrySchema);
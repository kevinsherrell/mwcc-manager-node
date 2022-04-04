const mongoose = require('mongoose');
const {Schema} = mongoose;

const Profile = require('./Profile');
const Sale = require('./Sale');

const TimesheetSchema = new Schema({
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
        employee: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        period: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "PayPeriod"
        },
        regularEntries: [{
            type: Schema.Types.ObjectId,
            ref: "RegularEntry"
        }],
        sickEntries: [{
            type: Schema.Types.ObjectId,
            ref: "SickEntry"
        }],
        vacationEntries: [{
            type: Schema.Types.ObjectId,
            ref: "VacationEntry"
        }],
        sales: [{
            type: Schema.Types.ObjectId,
            ref: "Sale"
        }],
        uhaul: {
            type: Number,
            default: 0
        },
        spiff: {
            type: Number,
            default: 0
        },
        special: [{
            type: Number,
            default: 0
        }]

    }
)

module.exports = mongoose.model('Timesheet', TimesheetSchema);
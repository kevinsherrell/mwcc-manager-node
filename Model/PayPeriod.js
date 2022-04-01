const mongoose = require('mongoose');
const {Schema} = mongoose;
const PayPeriodSchema = new Schema({
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
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
})
module.exports = mongoose.model("PayPeriod", PayPeriodSchema);
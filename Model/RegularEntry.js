const mongoose = require('mongoose');
const {Schema} = mongoose;
const RegularEntrySchema = new Schema({
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
    in: {
        type: Date,
        required: true,
        default: null
    },
    out: {
        type: Date,
        required: true,
        default: null
    },
    totalHours: {
        type: Number,
        required: true,
        default: 0
    }
})
module.exports = mongoose.model('RegularEntry', RegularEntrySchema);
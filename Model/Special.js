const mongoose = require('mongoose');
const {Schema} = mongoose;

const SpecialSchema = new Schema({
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
            requird: true
        },
        description: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }
)




module.exports = mongoose.model('Special', SpecialSchema);
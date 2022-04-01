const mongoose = require('mongoose');
const {Schema} = mongoose;
const StoreSchema = new Schema({
    dateCreated: {
        type: Date,
    },
    dateUpdated: {
        type: Date,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("Store", StoreSchema);
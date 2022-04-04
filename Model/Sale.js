const mongoose = require('mongoose');
const {Schema} = mongoose;

const SaleSchema = new Schema({
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
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
        salePrice: {
            type: Number,
            required: true
        },
        profit: {
            type: Number,
            default: 0
        }

    }
)

SaleSchema.methods.getProfit = function (cost, salePrice) {
    return salePrice - cost;
}


module.exports = mongoose.model('Sale', SaleSchema);
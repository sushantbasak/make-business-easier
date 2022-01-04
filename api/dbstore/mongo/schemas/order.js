const mongoose = require('mongoose');
const { COLLECTIONS } = require('../../../../constants');

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Please add a buyer"]
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "Please add a seller"]
    },
    gig: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gig',
        required: [true, "Please add the gig"]
    },
    status: {
        type: String,
        enum: ['pending', 'inprogress', 'completed', 'rejected'],
        default: 'pending'
    },
    messages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model(COLLECTIONS.ORDER, orderSchema);
const mongoose = require('mongoose');
const {COLLECTIONS} = require('../../../../constants');

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    gig: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gig',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'inprogress', 'completed', 'rejected'],
        default: 'pending'
    },
    messages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: message
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model(COLLECTION.ORDER, orderSchema);
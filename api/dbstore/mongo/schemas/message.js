const mongoose = require('mongoose');
const { COLLECTIONS } = require('../../../../constants');

const messageSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model(COLLECTIONS.MESSAGE, messageSchema);
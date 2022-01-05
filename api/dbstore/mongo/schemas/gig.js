const mongoose = require('mongoose');
const {COLLECTIONS} = require('../../../../constants');

const gigSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: COLLECTIONS.USER
    },
    title: {
        type: String,
        required: [true, "Please add gig title"],
        maxLength: [50, "Please add title shorter than 50 characters"]
    },
    category: {
        type: String,
        default: 'general'
    },
    about: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number
    },
    picture: {
        type: String,
        default: "picture.jpg"
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = {
  schema: mongoose.model(COLLECTIONS.GIG, gigSchema)
};
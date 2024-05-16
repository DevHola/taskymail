const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mailSchema = new Schema({
    from: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    to: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        
    },
    subject: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false,
        required: true
    }
},{
    timestamps: true
})
module.exports = mongoose.model('mails',mailSchema)
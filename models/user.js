const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: false,
        validate: function (v) {
            return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: props => `${props.value} n'est pas une adresse mail valide !`
    },
    youtube: {
        type: String, 
        required: false
    },    
    role: {
        type: String, 
        enum: ['admin', 'user', 'temp'],
        default: 'temp'
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    dumbAF: {
        type: Boolean, 
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    full_Name: {
        type: String,
        require: true,
    },
    user_Name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    
    email: {
        type: String,
        require: true,
    },
    bitcoin: {
        type: String,
    },
    ip_address:{
        type: String,
        require: true
    },
    accountBalance: {
        type: Number,
    },
    reffer:{
        type: String
    },
    restartLinkPassword:{
        type: String,
    },
    question:{
        type: String,
    },
    question__ans:{
        type: String,
    },
    activetDeposit: {
        type: Number,
    },
    date: {
        
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;
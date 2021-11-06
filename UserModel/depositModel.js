const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     
    user_id: {
        type: String,
        require: true,
    },
    full_Name: {
        type: String,
        require: true,
    },
    user_Name: {
        type: String,
        require: true,
    },
    fixedDepositAmount: {
        type: String,
        require: true,
    },
    depositAmount: {
        
        type: Number,
        require: true,
    },
  
    walletAddress: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    
    deposit_date:{
    },
    date: {
        
    }
    
    
    
},{
    timestamps: true
}

)

const UserDeposit = mongoose.model('UserDeposit', userSchema)

module.exports = UserDeposit;
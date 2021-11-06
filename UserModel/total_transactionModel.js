const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
    startDate: {
        type: String,
    },
    endDate: { 
        type: String,
    }  
   
  

    
})

const Total_TransactionModel = mongoose.model('Total_TransactionModel', userSchema)

module.exports = Total_TransactionModel;
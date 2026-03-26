const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  user_id: String,
  username: String,
  totalFees: Number,
  paymentMethod: String,
  status: {
    type: String,
    default: "pending"
  },
  date: Date
}, {
  timestamps: true
});

module.exports = mongoose.model("UserFeePayment", feeSchema);
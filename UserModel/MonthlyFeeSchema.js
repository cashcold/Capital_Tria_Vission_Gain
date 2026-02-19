const mongoose = require("mongoose");
 
const MonthlyFeeSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, index: true },
    user_Name: { type: String, required: true },
    full_Name: { type: String, required: true },
    email: { type: String, required: true },
    bitcoin: { type: String, required: true }, // momo number in your DB

    year: { type: Number, required: true, index: true },
    month: { type: Number, required: true, index: true }, // 1-12

    totalWithdrawn: { type: Number, default: 0 },
    miningCost10: { type: Number, default: 0 }, // 10% of totalWithdrawn
    payableFee: { type: Number, default: 0 },  // 20% of miningCost10 (2% of totalWithdrawn)

    paid: { type: Boolean, default: false },
    paidDate: { type: Date, default: null },
  },
  { timestamps: true }
);

// 1 record per user per month
MonthlyFeeSchema.index({ user_id: 1, year: 1, month: 1 }, { unique: true });

module.exports = mongoose.model("MonthlyFee", MonthlyFeeSchema);

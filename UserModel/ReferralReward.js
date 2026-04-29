const mongoose = require("mongoose");

const referralRewardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  referredUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  depositId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDeposit",
  },

  amount: {
    type: Number,
    required: true,
  },

  type: {
    type: String,
    default: "withdrawal",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ReferralReward", referralRewardSchema);

// const mongoose = require('mongoose');

// const referralRewardSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const ReferralReward = mongoose.model('ReferralReward', referralRewardSchema);

// module.exports = ReferralReward;

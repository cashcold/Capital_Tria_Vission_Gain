const mongoose = require('mongoose');

const referralRewardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ReferralReward = mongoose.model('ReferralReward', referralRewardSchema);

module.exports = ReferralReward;

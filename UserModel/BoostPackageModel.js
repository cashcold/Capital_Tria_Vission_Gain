const mongoose = require('mongoose');

const BoostPackageSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user_Name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  packageName: {
    type: String,
    required: true
  },
  profit: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BoostPackage', BoostPackageSchema);
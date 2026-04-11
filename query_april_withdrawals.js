const mongoose = require('mongoose');
const WithdrawDeposit = require('./UserModel/widthdraw');
require('dotenv').config();

async function queryAprilWithdrawals() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdb');
    
    const userId = '69a86e2054941cd1b77536d3';
    const start = new Date(Date.UTC(2026, 3, 1, 0, 0, 0)); // April 1, 2026
    const end = new Date(Date.UTC(2026, 4, 1, 0, 0, 0));   // May 1, 2026
    
    const withdrawals = await WithdrawDeposit.find({
      user_id: userId,
      createdAt: { $gte: start, $lt: end }
    }).sort({ createdAt: -1 });
    
    console.log(`Found ${withdrawals.length} April 2026 withdrawals for user ${userId}:`);
    withdrawals.forEach((w, i) => {
      console.log(`${i+1}. TotalWithdraw: ${w.TotalWithdraw}, checkPercent: ${w.checkPercent}, createdAt: ${w.createdAt}`);
    });
    
    const totalWithdrawn = withdrawals.reduce((sum, w) => sum + (w.TotalWithdraw || 0), 0);
    const totalProfit = withdrawals.reduce((sum, w) => sum + (w.checkPercent || 0), 0);
    console.log(`\nTotal TotalWithdraw: ${totalWithdrawn}`);
    console.log(`Total checkPercent: ${totalProfit}`);
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.disconnect();
  }
}

queryAprilWithdrawals();
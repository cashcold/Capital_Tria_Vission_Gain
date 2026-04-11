const mongoose = require('mongoose');
const UserDeposit = require('./UserModel/depositModel');
const WithdrawDeposit = require('./UserModel/widthdraw');
require('dotenv').config();

async function queryDepositWithdrawTimeline() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdb');
    
    const userId = '69a86e2054941cd1b77536d3';
    const start = new Date(Date.UTC(2026, 3, 1, 0, 0, 0)); // April 1, 2026
    const end = new Date(Date.UTC(2026, 4, 1, 0, 0, 0));   // May 1, 2026
    
    const deposits = await UserDeposit.find({
      user_id: userId,
      createdAt: { $gte: start, $lt: end }
    }).sort({ createdAt: 1 });
    
    const withdrawals = await WithdrawDeposit.find({
      user_id: userId,
      type: 'Withdrawal',
      createdAt: { $gte: start, $lt: end }
    }).sort({ createdAt: 1 });
    
    console.log('=== APRIL 2026 TIMELINE FOR USER BONZY ===\n');
    
    console.log('--- DEPOSITS ---');
    let totalDeposited = 0;
    let totalDepositProfit = 0;
    deposits.forEach((d, i) => {
      totalDeposited += d.depositAmount;
      totalDepositProfit += d.checkPercent;
      console.log(`${i+1}. ${d.createdAt.toLocaleDateString()} - Deposit: GHC${d.depositAmount}, Expected Profit: GHC${d.checkPercent}`);
    });
    console.log(`\nTotal Deposited: GHC${totalDeposited}, Total Expected Profit: GHC${totalDepositProfit}`);
    
    console.log('\n--- WITHDRAWALS ---');
    let totalWithdrawn = 0;
    let totalWithdrawnProfit = 0;
    withdrawals.forEach((w, i) => {
      totalWithdrawn += w.TotalWithdraw;
      totalWithdrawnProfit += (w.checkPercent || 0);
      console.log(`${i+1}. ${new Date(w.createdAt).toLocaleDateString()} - TotalWithdraw: GHC${w.TotalWithdraw}, Profit Withdrawn: GHC${w.checkPercent || 0}, Principal: GHC${w.activetDeposit}`);
    });
    console.log(`\nTotal Withdrawn: GHC${totalWithdrawn}, Total Profit Withdrawn: GHC${totalWithdrawnProfit}`);
    
    console.log('\n--- SUMMARY ---');
    console.log(`Total Deposited: GHC${totalDeposited}`);
    console.log(`Total Withdrawn: GHC${totalWithdrawn}`);
    console.log(`Principal Withdrawn: GHC${totalWithdrawn - totalWithdrawnProfit}`);
    console.log(`Profit Expected (from deposits): GHC${totalDepositProfit}`);
    console.log(`Profit Actually Withdrawn: GHC${totalWithdrawnProfit}`);
    console.log(`Profit Still Pending: GHC${totalDepositProfit - totalWithdrawnProfit}`);
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.disconnect();
  }
}

queryDepositWithdrawTimeline();
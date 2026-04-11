const mongoose = require('mongoose');
const UserDeposit = require('./UserModel/depositModel');
require('dotenv').config();

async function queryAprilDeposits() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdb');
    
    const userId = '69a86e2054941cd1b77536d3';
    const start = new Date(Date.UTC(2026, 3, 1, 0, 0, 0)); // April 1, 2026
    const end = new Date(Date.UTC(2026, 4, 1, 0, 0, 0));   // May 1, 2026
    
    const deposits = await UserDeposit.find({
      user_id: userId,
      createdAt: { $gte: start, $lt: end }
    }).sort({ createdAt: -1 });
    
    console.log(`Found ${deposits.length} April 2026 deposits for user ${userId}:`);
    deposits.forEach((d, i) => {
      console.log(`${i+1}. depositAmount: ${d.depositAmount}, checkPercent: ${d.checkPercent}, createdAt: ${d.createdAt}`);
    });
    
    const totalDeposited = deposits.reduce((sum, d) => sum + (d.depositAmount || 0), 0);
    const totalProfit = deposits.reduce((sum, d) => sum + (d.checkPercent || 0), 0);
    console.log(`\nTotal depositAmount: ${totalDeposited}`);
    console.log(`Total checkPercent: ${totalProfit}`);
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.disconnect();
  }
}

queryAprilDeposits();
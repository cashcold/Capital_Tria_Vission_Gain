const mongoose = require('mongoose');
const UserDeposit = require('./UserModel/depositModel');
require('dotenv').config();

async function queryCurrentMonthCheckPercent() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdb');
    console.log('Connected successfully!');
    
    const userId = '69946dc8e32d22a3b1454f8e';
    
    // Current month: April 2026
    const start = new Date(Date.UTC(2026, 3, 1, 0, 0, 0)); // April 1, 2026
    const end = new Date(Date.UTC(2026, 4, 1, 0, 0, 0));   // May 1, 2026
    
    const deposits = await UserDeposit.find({
      user_id: userId,
      createdAt: { $gte: start, $lt: end }
    }).sort({ createdAt: 1 });
    
    console.log(`Found ${deposits.length} deposits\n`);
    
    if (deposits.length === 0) {
      console.log('No deposits found for this user in April 2026');
      mongoose.connection.close();
      return;
    }
    
    console.log('--- ALL CHECK PERCENT ---');
    let totalCheckPercent = 0;
    deposits.forEach((d, i) => {
      const checkPercent = Number(d.checkPercent || 0);
      totalCheckPercent += checkPercent;
      console.log(`${i+1}. Date: ${d.createdAt.toLocaleDateString()} | Amount: GHC${d.depositAmount} | checkPercent: GHC${checkPercent}`);
    });
    
    console.log(`\n--- SUMMARY ---`);
    console.log(`Total Deposits in April: ${deposits.length}`);
    console.log(`Total checkPercent: GHC${totalCheckPercent}`);
    console.log(`Average checkPercent per deposit: GHC${(totalCheckPercent / deposits.length).toFixed(2)}`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Query error:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

queryCurrentMonthCheckPercent();

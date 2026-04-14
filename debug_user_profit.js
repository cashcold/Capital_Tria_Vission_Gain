const mongoose = require('mongoose');
const UserDeposit = require('./UserModel/depositModel');
const User = require('./UserModel/userModel');
require('dotenv').config();

async function debugUserProfit() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdb');
    console.log('Connected successfully!\n');
    
    const userId = '69946dc8e32d22a3b1454f8e';
    
    // Get user profile
    const user = await User.findById(userId);
    
    if (!user) {
      console.log('❌ User not found!');
      return;
    }
    
    console.log('=== USER PROFILE ===');
    console.log(`User Name: ${user.user_Name}`);
    console.log(`Full Name: ${user.full_Name}`);
    console.log(`systemMoney: ${user.systemMoney}`);
    
    // Current month: April 2026
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    console.log(`\n=== CHECKING APRIL 2026 (${firstDayOfMonth.toLocaleDateString()} to ${lastDayOfMonth.toLocaleDateString()}) ===\n`);
    
    const deposits = await UserDeposit.find({
      user_id: userId,
      createdAt: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth
      }
    }).sort({ createdAt: 1 });
    
    const totalProfitEarned = deposits.reduce((sum, deposit) => {
      return sum + Number(deposit.checkPercent || 0);
    }, 0);
    
    const systemMoney = Number(user.systemMoney || 0);
    const profitThreshold = (170 / 100) * systemMoney;
    const maxAllowedInvestment = (systemMoney * 40) / 100;
    
    console.log('--- CALCULATIONS ---');
    console.log(`systemMoney: GHC${systemMoney.toFixed(2)}`);
    console.log(`profitThreshold (170%): GHC${profitThreshold.toFixed(2)}`);
    console.log(`maxAllowedInvestment (40%): GHC${maxAllowedInvestment.toFixed(2)}`);
    console.log(`totalProfitEarned: GHC${totalProfitEarned.toFixed(2)}`);
    
    console.log('\n--- PROFIT LIMIT STATUS ---');
    if (totalProfitEarned >= profitThreshold) {
      console.log(`✅ PROFIT LIMIT REACHED!`);
      console.log(`Current profit (${totalProfitEarned.toFixed(2)}) >= Threshold (${profitThreshold.toFixed(2)})`);
    } else {
      console.log(`❌ Profit limit NOT reached`);
      console.log(`Remaining: GHC${(profitThreshold - totalProfitEarned).toFixed(2)}`);
    }
    
    console.log('\n--- TEST DEPOSIT AMOUNT ---');
    const testAmount = 100;
    console.log(`Testing deposit of: GHC${testAmount}`);
    
    if (totalProfitEarned >= profitThreshold) {
      if (testAmount > maxAllowedInvestment) {
        console.log(`⛔ BLOCKED! GHC${testAmount} > GHC${maxAllowedInvestment.toFixed(2)} (40% cap)`);
      } else {
        console.log(`✅ ALLOWED (limited mode). GHC${testAmount} <= GHC${maxAllowedInvestment.toFixed(2)} (40% cap)`);
      }
    } else {
      console.log(`✅ ALLOWED (normal mode). Profit limit not reached yet.`);
    }
    
    console.log('\n--- ALL DEPOSITS IN APRIL ---');
    deposits.forEach((d, i) => {
      console.log(`${i+1}. ${d.createdAt.toLocaleDateString()} - Amount: GHC${d.depositAmount}, checkPercent: GHC${d.checkPercent}`);
    });
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

debugUserProfit();

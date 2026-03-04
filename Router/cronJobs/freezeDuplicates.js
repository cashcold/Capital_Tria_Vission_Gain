const cron = require("node-cron");
const User = require('../../UserModel/userModel')
const { markDuplicateWarnings } = require('../dupHelper');

cron.schedule("0 0 * * *", async () => {
  // Runs every day at midnight

  try {
    // Refresh warnings first so freeze logic uses up-to-date data
    await markDuplicateWarnings();

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 3); // 3 days

    const result = await User.updateMany(
      {
        duplicateWarningSent: true,
        warningDate: { $lte: cutoffDate },
        isFrozen: false
      },
      { isFrozen: true }
    );

    console.log(`Auto-froze ${result.modifiedCount} duplicate accounts`);

  } catch (err) {
    console.error("Auto-freeze error:", err);
  }
});
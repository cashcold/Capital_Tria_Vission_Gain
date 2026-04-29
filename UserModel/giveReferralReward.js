const User = require("./userModel");
const UserDeposit = require("./depositModel");
const ReferralReward = require("./ReferralReward");

const giveReferralReward = async (deposit) => {
  try {
    const user = await User.findById(deposit.user_id);

    if (!user) return;

    // Check if this is the user's first deposit
    const depositCount = await UserDeposit.countDocuments({
      user_id: user._id.toString(),
    });

    if (depositCount !== 1) return;

    // Check if user was referred
    if (!user.reffer) return;

    // Find the person who referred this user
    const referrer = await User.findOne({
      user_Name: user.reffer,
    });

    if (!referrer) return;

    // Prevent duplicate reward
    const alreadyRewarded = await ReferralReward.findOne({
      referredUserId: user._id,
      depositId: deposit._id,
      type: "first_deposit_bonus",
    });

    if (alreadyRewarded) return;

    // Calculate 10%
    const rewardAmount = Number(deposit.depositAmount) * 0.1;

    // Save referral reward record
    await ReferralReward.create({
      userId: referrer._id,
      referredUserId: user._id,
      depositId: deposit._id,
      amount: rewardAmount,
      type: "first_deposit_bonus",
      date: new Date(),
    });

    // Add reward to referrer's balance
    await User.findByIdAndUpdate(referrer._id, {
      $inc: { refferReward: rewardAmount },
    });

    console.log("Referral reward given:", rewardAmount);
  } catch (error) {
    console.log("Referral reward error:", error.message);
  }
};

module.exports = giveReferralReward;
const User = require('../UserModel/userModel');

async function markDuplicateWarnings() {
  // Find groups of identical `bitcoin` (MoMo) numbers used by multiple accounts
  const duplicates = await User.aggregate([
    { $group: { _id: '$bitcoin', count: { $sum: 1 }, ids: { $push: '$_id' } } },
    { $match: { count: { $gt: 1 } } }
  ]);

  const ids = duplicates.flatMap(d => d.ids);

  // Mark current duplicates with a warningDate
  if (ids.length) {
    await User.updateMany(
      { _id: { $in: ids } },
      { $set: { duplicateWarningSent: true, warningDate: new Date() } }
    );
  }

  // Clear warning flags for users no longer duplicated
  await User.updateMany(
    { duplicateWarningSent: true, _id: { $nin: ids } },
    { $set: { duplicateWarningSent: false }, $unset: { warningDate: "" } }
  );
}

module.exports = { markDuplicateWarnings };


async function markDuplicateWarnings() {
  const duplicates = await User.aggregate([
    { $group: { _id: '$bitcoin', count: { $sum: 1 }, ids: { $push: '$_id' } } },
    { $match: { count: { $gt: 1 } } }
  ]);
  const ids = duplicates.flatMap(d => d.ids);

  if (ids.length) {
    await User.updateMany(
      { _id: { $in: ids } },
      { $set: { duplicateWarningSent: true, warningDate: new Date() } }
    );
  }
  await User.updateMany(
    { duplicateWarningSent: true, _id: { $nin: ids } },
    { $set: { duplicateWarningSent: false }, $unset: { warningDate: '' } }
  );
}

module.exports = { markDuplicateWarnings };
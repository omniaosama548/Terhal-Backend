// cron/deleteInactiveUsers.js
import cron from 'node-cron';
import User from '../models/User.js';
import Favorite from '../models/Favorite.js';
import History from '../models/History.js';
import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'logs', 'cron-log.txt');

function logToFile(message) {
  const now = new Date().toISOString();
  fs.appendFileSync(logFile, `[${now}] ${message}\n`);
}

cron.schedule('0 2 * * *', async () => {
  logToFile('Starting cleanup of deactivated accounts');
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  const cutoffDate = new Date(Date.now() - THIRTY_DAYS);

  const inactiveUsers = await User.find({
    isDeleted: true,
    updatedAt: { $lte: cutoffDate },
  });

  logToFile(`Found${inactiveUsers.length} Deactivated account`);

  for (const user of inactiveUsers) {
    await Favorite.deleteMany({ userId: user._id });
    await History.deleteMany({ userId: user._id });
    await User.findByIdAndDelete(user._id);
    logToFile(`Deleted user ${user.email} and related data`);
  }

  logToFile('Deactivated accounts cleanup completed');
});

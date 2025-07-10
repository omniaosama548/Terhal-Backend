// cron/deleteInactiveUsers.js
import cron from 'node-cron';
import User from '../models/User.js';
import Favorite from '../models/Favorite.js';
import History from '../models/History.js';
import Place from '../models/Place.js'; // [MODIFIED] Import Place model
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

// [MODIFIED] Notify users of new places near their last known location (demo: log to file)
cron.schedule('*/10 * * * *', async () => { // Every 10 minutes
  logToFile('Checking for new places near users...');
  const users = await User.find({ lastLat: { $ne: null }, lastLng: { $ne: null } });
  const places = await Place.find({ visible: true });
  const RADIUS = 5; // km
  function haversine(lat1, lng1, lat2, lng2) {
    const toRad = v => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }
  for (const user of users) {
    const nearby = places.filter(place => {
      if (!place.coordinates) return false;
      const [lat, lng] = place.coordinates.split(',').map(Number);
      if (isNaN(lat) || isNaN(lng)) return false;
      return haversine(user.lastLat, user.lastLng, lat, lng) <= RADIUS;
    });
    if (nearby.length > 0) {
      logToFile(`Notify user ${user.email}: ${nearby.length} new places near you!`);
    }
  }
  logToFile('Nearby place notification check complete.');
});

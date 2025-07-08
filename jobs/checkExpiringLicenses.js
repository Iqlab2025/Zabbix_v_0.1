// jobs/checkExpiringLicenses.js
import 'dotenv/config'; // <- correct for ESM

import mongoose from 'mongoose';
import License from '../src/models/License.js';
import { sendLicenseExpiryAlert } from '../src/utils/mailer.js';

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('❌ MONGO_URI is missing in .env file');
  process.exit(1);
}

await mongoose.connect(uri);
console.log('✅ Connected to MongoDB');

const licenses = await License.find({
  status: 'active',
  expiryDate: {
    $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    $gt: new Date()
  }
});

for (const lic of licenses) {
  try {
    await sendLicenseExpiryAlert({
      to: lic.email,
      clientId: lic.clientId,
      expiryDate: lic.expiryDate
    });
    console.log(`✅ Email sent to ${lic.email}`);
  } catch (err) {
    console.error(`❌ Failed to send to ${lic.email}:`, err.message);
  }
}

await mongoose.disconnect();
console.log('✅ MongoDB connection closed');

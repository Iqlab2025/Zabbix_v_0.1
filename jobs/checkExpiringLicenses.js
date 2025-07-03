// jobs/checkExpiringLicenses.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import License from '../src/models/License.js';
import { sendLicenseExpiryAlert } from '../src/utils/mailer.js';

await mongoose.connect(process.env.MONGO_URI);

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

mongoose.connection.close();

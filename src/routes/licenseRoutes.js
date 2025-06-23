// src/routes/licenseRoutes.js
import { Router } from 'express';
const router = Router();
import {
  checkLicense,
  generateLicense,
  getAllLicenses
} from '../controllers/licenseController.js';

router.get('/check-license/:licenseKey', checkLicense);
router.post('/generate-license', generateLicense);
router.get('/all-licenses', getAllLicenses); // ✅ This line is required


export default router;

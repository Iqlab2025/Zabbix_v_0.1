// src/routes/licenseRoutes.js
import { Router } from 'express';
const router = Router();
import {
  checkLicense,
  generateLicense,
  getAllLicenses,
  deleteLicense
} from '../controllers/licenseController.js';

router.get('/check-license/:licenseKey', checkLicense);
router.post('/generate-license', generateLicense);
router.get('/all-licenses', getAllLicenses); 
router.delete('/license/:licenseKey', deleteLicense); // ✅ This line is required


export default router;

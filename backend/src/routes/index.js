const express = require('express');
const multer = require('multer');

function buildRouter({ citizenService, governmentService }) {
  const router = express.Router();
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 3 * 1024 * 1024 }
  });

  router.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'zimid-api' });
  });

  router.post('/api/v1/citizens/register', upload.single('photo'), async (req, res, next) => {
    try {
      const { firstName, surname, dateOfBirth, idNumber } = req.body;

      if (!firstName || !surname || !dateOfBirth || !idNumber) {
        return res.status(400).json({ message: 'firstName, surname, dateOfBirth and idNumber are required.' });
      }

      const photoBase64 = req.file ? req.file.buffer.toString('base64') : null;
      const citizen = await citizenService.registerCitizen({
        firstName,
        surname,
        dateOfBirth,
        idNumber,
        photoBase64
      });

      return res.status(201).json({ citizen });
    } catch (error) {
      return next(error);
    }
  });

  router.get('/api/v1/citizens/:id', async (req, res, next) => {
    try {
      const citizen = await citizenService.getCitizenById(Number(req.params.id));
      if (!citizen) {
        return res.status(404).json({ message: 'Citizen not found.' });
      }

      return res.json({ citizen });
    } catch (error) {
      return next(error);
    }
  });

  router.get('/api/v1/services/dashboard', (_req, res) => {
    res.json({ services: governmentService.listDashboardServices() });
  });

  const handleServiceSubmission = (serviceType) => async (req, res, next) => {
    try {
      const citizenId = Number(req.body.citizenId);
      if (!citizenId) {
        return res.status(400).json({ message: 'citizenId is required.' });
      }

      const application = await governmentService.submitApplication(citizenId, serviceType, req.body);
      return res.status(201).json({ application });
    } catch (error) {
      return next(error);
    }
  };

  router.post('/api/v1/services/passport/apply', handleServiceSubmission('passport'));
  router.post('/api/v1/services/birth-certificate/apply', handleServiceSubmission('birth_certificate'));
  router.post('/api/v1/services/drivers-license/apply', handleServiceSubmission('drivers_license'));

  return router;
}

module.exports = buildRouter;

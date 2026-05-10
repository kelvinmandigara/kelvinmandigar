const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const createApp = require('../src/app');

function buildApp() {
  const citizens = [];
  const applications = [];

  const citizenService = {
    async registerCitizen(data) {
      const citizen = {
        id: citizens.length + 1,
        firstName: data.firstName,
        surname: data.surname,
        dateOfBirth: data.dateOfBirth,
        idNumber: data.idNumber,
        hasPhoto: Boolean(data.photoBase64),
        createdAt: new Date().toISOString()
      };
      citizens.push(citizen);
      return citizen;
    },
    async getCitizenById(id) {
      return citizens.find((citizen) => citizen.id === id) || null;
    }
  };

  const governmentService = {
    listDashboardServices() {
      return [
        { key: 'passport', title: 'Passport Application' },
        { key: 'birth-certificate', title: 'Birth Certificate' },
        { key: 'drivers-license', title: 'Driver\'s License' }
      ];
    },
    async submitApplication(citizenId, serviceType, payload) {
      const app = {
        applicationId: applications.length + 1,
        citizenId,
        serviceType,
        status: 'submitted',
        payload,
        createdAt: new Date().toISOString()
      };
      applications.push(app);
      return app;
    }
  };

  return createApp({ citizenService, governmentService, corsOrigins: ['http://localhost:3000'] });
}

test('register citizen and fetch profile', async () => {
  const app = buildApp();

  const registerRes = await request(app)
    .post('/api/v1/citizens/register')
    .field('firstName', 'Tinashe')
    .field('surname', 'Moyo')
    .field('dateOfBirth', '1999-01-01')
    .field('idNumber', '63-123456-A-12');

  assert.equal(registerRes.statusCode, 201);
  assert.equal(registerRes.body.citizen.firstName, 'Tinashe');

  const getRes = await request(app).get('/api/v1/citizens/1');
  assert.equal(getRes.statusCode, 200);
  assert.equal(getRes.body.citizen.idNumber, '63-123456-A-12');
});

test('submit passport application', async () => {
  const app = buildApp();

  const response = await request(app)
    .post('/api/v1/services/passport/apply')
    .send({ citizenId: 1, travelDate: '2026-10-01', purpose: 'Official' });

  assert.equal(response.statusCode, 201);
  assert.equal(response.body.application.serviceType, 'passport');
});

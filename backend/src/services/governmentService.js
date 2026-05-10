class GovernmentService {
  constructor(pool) {
    this.pool = pool;
    this.serviceCatalog = [
      { key: 'passport', title: 'Passport Application', description: 'Apply for or renew your passport.' },
      { key: 'birth-certificate', title: 'Birth Certificate', description: 'Request certified birth records.' },
      { key: 'drivers-license', title: 'Driver\'s License', description: 'Apply or renew your driver\'s license.' }
    ];
  }

  listDashboardServices() {
    return this.serviceCatalog;
  }

  async submitApplication(citizenId, serviceType, payload) {
    const result = await this.pool.query(
      `INSERT INTO service_applications (citizen_id, service_type, payload)
       VALUES ($1, $2, $3)
       RETURNING id, citizen_id, service_type, status, payload, created_at`,
      [citizenId, serviceType, payload]
    );

    return {
      applicationId: result.rows[0].id,
      citizenId: result.rows[0].citizen_id,
      serviceType: result.rows[0].service_type,
      status: result.rows[0].status,
      payload: result.rows[0].payload,
      createdAt: result.rows[0].created_at
    };
  }
}

module.exports = GovernmentService;

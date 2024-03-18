import request from 'supertest';
import app from '../app';
import sequelize from '../database';
import DeliveryReport from '../models/DeliveryReport';

let transaction: any;
beforeAll(async () => {
  await sequelize.sync();
  transaction = await sequelize.transaction();
});

afterAll(async () => {
  if (transaction) {
    await transaction.rollback();
  }
  await sequelize.close();
});

describe('Integration tests for routes', () => {
  let deliveryReportId: any;

  test('Add delay order', async () => {
    const res = await request(app).post('/api/orders/2/delay').send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');

    deliveryReportId = res.body.data.deliveryReportId;
  });

  test('Assign delay report to employee', async () => {
    const res = await request(app)
      .post(`/api/delivery-reports/assign-employee`)
      .send({
        agentId: 1
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');

    DeliveryReport.destroy({
      where: {
        id: deliveryReportId
      }
    });
  });

  test('Get weekly delay vendors report', async () => {
    const res = await request(app)
      .get('/api/vendors/reports/weekly');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');

  });
});

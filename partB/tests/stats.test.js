process.env.DB_PATH = ':memory:';

const request = require('supertest');
const app = require('../src/app');
const { closeDb } = require('../src/db/database');

afterAll(() => closeDb());

describe('GET /api/stats', () => {
  it('returns zero counts on empty db', async () => {
    const res = await request(app).get('/api/stats');
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject({
      total: 0, done: 0, pending: 0, overdue: 0,
    });
  });

  it('counts total and done correctly', async () => {
    await request(app).post('/api/tasks').send({ title: 'T1' });
    const t2 = await request(app).post('/api/tasks').send({ title: 'T2' });
    await request(app).put(`/api/tasks/${t2.body.data.id}`).send({ status: 'done' });

    const res = await request(app).get('/api/stats');
    expect(res.body.data.total).toBeGreaterThanOrEqual(2);
    expect(res.body.data.done).toBeGreaterThanOrEqual(1);
    expect(res.body.data.pending).toBeGreaterThanOrEqual(1);
  });

  it('counts overdue tasks', async () => {
    await request(app)
      .post('/api/tasks')
      .send({ title: 'Overdue', due_date: '2020-01-01', status: 'pending' });

    const res = await request(app).get('/api/stats');
    expect(res.body.data.overdue).toBeGreaterThanOrEqual(1);
  });

  it('has by_priority breakdown', async () => {
    const res = await request(app).get('/api/stats');
    expect(res.body.data.by_priority).toHaveProperty('high');
    expect(res.body.data.by_priority).toHaveProperty('medium');
    expect(res.body.data.by_priority).toHaveProperty('low');
  });
});

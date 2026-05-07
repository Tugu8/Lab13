process.env.DB_PATH = ':memory:';

const request = require('supertest');
const app = require('../src/app');
const { closeDb } = require('../src/db/database');

afterAll(() => closeDb());

describe('POST /api/labels', () => {
  it('creates a label', async () => {
    const res = await request(app)
      .post('/api/labels')
      .send({ name: 'work', color: '#ff0000' });
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({ name: 'work', color: '#ff0000' });
  });

  it('returns 400 for empty name', async () => {
    const res = await request(app)
      .post('/api/labels')
      .send({ name: '  ' });
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid hex color', async () => {
    const res = await request(app)
      .post('/api/labels')
      .send({ name: 'red', color: 'red' });
    expect(res.status).toBe(400);
  });

  it('returns 409 for duplicate label name', async () => {
    await request(app).post('/api/labels').send({ name: 'unique' });
    const res = await request(app)
      .post('/api/labels')
      .send({ name: 'unique' });
    expect(res.status).toBe(409);
  });
});

describe('GET /api/labels', () => {
  it('returns all labels', async () => {
    const res = await request(app).get('/api/labels');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe('DELETE /api/labels/:id', () => {
  it('deletes a label', async () => {
    const create = await request(app)
      .post('/api/labels')
      .send({ name: 'to-delete' });
    const id = create.body.data.id;
    const del = await request(app).delete(`/api/labels/${id}`);
    expect(del.status).toBe(200);
    const get = await request(app).get(`/api/labels/${id}`);
    expect(get.status).toBe(404);
  });
});

describe('Task-label assignment', () => {
  it('adds and removes a label from a task', async () => {
    const task = await request(app)
      .post('/api/tasks')
      .send({ title: 'Labeled task' });
    const label = await request(app)
      .post('/api/labels')
      .send({ name: 'assign-test' });
    const tid = task.body.data.id;
    const lid = label.body.data.id;

    const add = await request(app).post(`/api/tasks/${tid}/labels/${lid}`);
    expect(add.status).toBe(200);

    const check = await request(app).get(`/api/tasks/${tid}`);
    expect(check.body.data.labels.some(l => l.id === lid)).toBe(true);

    const remove = await request(app).delete(`/api/tasks/${tid}/labels/${lid}`);
    expect(remove.status).toBe(200);
  });
});

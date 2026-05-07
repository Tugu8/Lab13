process.env.DB_PATH = ':memory:';

const request = require('supertest');
const app = require('../src/app');
const { closeDb } = require('../src/db/database');

afterAll(() => closeDb());

describe('GET /api/tasks', () => {
  it('returns empty array initially', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.meta.total).toBe(0);
  });
});

describe('POST /api/tasks', () => {
  it('creates a task with valid data', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test task', priority: 'high', due_date: '2026-12-31' });
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({
      title: 'Test task',
      priority: 'high',
      status: 'pending',
      due_date: '2026-12-31',
    });
    expect(res.body.data.id).toBeDefined();
  });

  it('returns 400 when title is missing', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ priority: 'high' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('returns 400 for invalid priority', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Bad priority', priority: 'urgent' });
    expect(res.status).toBe(400);
  });

  it('returns 400 for invalid due_date format', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Bad date', due_date: '31-12-2026' });
    expect(res.status).toBe(400);
  });
});

describe('GET /api/tasks/:id', () => {
  it('returns 404 for non-existent task', async () => {
    const res = await request(app).get('/api/tasks/99999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Task not found');
  });

  it('returns task by id', async () => {
    const create = await request(app)
      .post('/api/tasks')
      .send({ title: 'Find me' });
    const id = create.body.data.id;
    const res = await request(app).get(`/api/tasks/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Find me');
  });
});

describe('PUT /api/tasks/:id', () => {
  it('updates task fields', async () => {
    const create = await request(app)
      .post('/api/tasks')
      .send({ title: 'Original' });
    const id = create.body.data.id;
    const res = await request(app)
      .put(`/api/tasks/${id}`)
      .send({ title: 'Updated', status: 'done' });
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Updated');
    expect(res.body.data.status).toBe('done');
  });

  it('returns 404 for non-existent task', async () => {
    const res = await request(app)
      .put('/api/tasks/99999')
      .send({ title: 'Ghost' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('deletes a task', async () => {
    const create = await request(app)
      .post('/api/tasks')
      .send({ title: 'Delete me' });
    const id = create.body.data.id;
    const del = await request(app).delete(`/api/tasks/${id}`);
    expect(del.status).toBe(200);
    const get = await request(app).get(`/api/tasks/${id}`);
    expect(get.status).toBe(404);
  });

  it('returns 404 when deleting non-existent task', async () => {
    const res = await request(app).delete('/api/tasks/99999');
    expect(res.status).toBe(404);
  });
});

describe('GET /api/tasks — filters', () => {
  it('filters by status', async () => {
    await request(app).post('/api/tasks').send({ title: 'Pending task' });
    const done = await request(app).post('/api/tasks').send({ title: 'Done task' });
    await request(app).put(`/api/tasks/${done.body.data.id}`).send({ status: 'done' });

    const res = await request(app).get('/api/tasks?status=done');
    expect(res.status).toBe(200);
    expect(res.body.data.every(t => t.status === 'done')).toBe(true);
  });
});

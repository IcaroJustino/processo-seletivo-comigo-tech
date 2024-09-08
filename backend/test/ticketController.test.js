const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const ticketRoutes = require('../src/routes/ticketRoutes');
const authRoutes = require('../src/routes/authRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/api', ticketRoutes);
app.use('/auth', authRoutes);


describe('Ticket Controller', () => {
  let server;
  let token;
  let ticketid;

  beforeAll(async () => {
    server = app.listen(4000);
    agent = request.agent(server);
    const response = await agent.post('/auth/signin').send({ email: "superadmin@email.com", password: "123456" })
    token= response.body.token

    const ticketmock = await agent.post('/api/ticket').set('Authorization', `Bearer ${token}`).send({
        title: "Ticket Teste do atendente 2",
        contactId: "fe2ba9f9-789e-4bc9-892d-1f76a3f53e1a",
        veichleId: "3bacfb4f-991c-4840-a788-6d450be28fe7",
        reasonId: "f4e2d5ae-7272-42cd-8bd1-c55d949b2aec",
        description: "descrição do ticket",
        statusId: "88f67340-0cd3-437f-8686-cf86ed197e66",
        hascontact: true,
        estimatedTime: "2023-10-05T14:48:00.000Z"
     })
     
     ticketid = ticketmock.body.id

  });

  afterAll(async () => {
    if (server) {
      await server.close();
    }
  });

  it('should create a ticket', async () => {
    const response = await agent.post('/api/ticket')
    .set('Authorization', `Bearer ${token}`) // Replace YOUR_TOKEN_HERE with the actual bearer token
    .send({
        title: "Ticket Teste do atendente 2",
        contactId: "fe2ba9f9-789e-4bc9-892d-1f76a3f53e1a",
        veichleId: "3bacfb4f-991c-4840-a788-6d450be28fe7",
        reasonId: "f4e2d5ae-7272-42cd-8bd1-c55d949b2aec",
        description: "descrição do ticket",
        statusId: "88f67340-0cd3-437f-8686-cf86ed197e66",
        hascontact: true,
        estimatedTime: "2023-10-05T14:48:00.000Z"
    })
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
});

 it('should not create a ticket', async () => {
    const response = await agent.post('/api/ticket')
     .send({
         title: "Ticket Teste do atendente 2",
         contactId: "fe2ba9f9-789e-4bc9-892d-1f76a3f53e1a",
         veichleId: "3bacfb4f-991c-4840-a788-6d450be28fe7",
         reasonId: "f4e2d5ae-7272-42cd-8bd1-c55d949b2aec",
         description: "descrição do ticket",
         statusId: "88f67340-0cd3-437f-8686-cf86ed197e66",
         hascontact: true,
         estimatedTime: "2023-10-05T14:48:00.000Z"
     })
    expect(response.statusCode).toBe(401);
 })

it('should get all tickets', async () => {
    const response = await agent.get('/api/tickets').set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
});


it('should get a ticket by id', async () => {
     const response = await agent.get('/api/ticket/94158863-5cb8-4d48-bc1a-73ce9f1ac759').set('Authorization', `Bearer ${token}`)
     expect(response.statusCode).toBe(200||404);
     expect(response.body).toHaveProperty('id');
 })

 it('should update a ticket', async () => {
     const response = await agent.put('/api/ticket/94158863-5cb8-4d48-bc1a-73ce9f1ac759').set('Authorization', `Bearer ${token}`)
     .send({
         title: "Ticket Teste do atendente 2",
         description: "descrição do ticket",
         statusId: "6d231795-a984-4af4-9006-7df73433f48d",
     })
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
    });

 it('should delete a ticket', async () => {
     const response = await agent.delete(`/api/ticket/${ticketid}`).set('Authorization', `Bearer ${token}`)
     expect(response.statusCode).toBe(204);
 });

  it('should not delete a ticket', async () => {
      const response = await agent.delete(`/api/ticket/${ticketid}`)
         expect(response.statusCode).toBe(401);
     });
});
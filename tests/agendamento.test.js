require('dotenv').config()
const app = require('../src/app')
const request = require('supertest')

let agendamentoCriadoId

describe('Testes de Integração - Agendamento', () => {
  const new_agendamento = {
    estabelecimento_id: 3,
    usuario_id: 1,
    horario: '2025-04-11T14:30',
    detalhes: 'Usuário Teste API',
  }

  test('Deve criar um agendamento via API', async () => {
    const res = await request(app).post('/agendamentos').send(new_agendamento)
    console.log('Resposta da criação:', res.body)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    agendamentoCriadoId = res.body.id
  })

  test('Deve listar um agendamento do Supabase', async () => {
    const res = await request(app).get(`/agendamentos/${agendamentoCriadoId}`)
    console.log('Resposta da listagem:', res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveProperty('id', agendamentoCriadoId)
  })

  test('Deve listar agendamentos do Supabase', async () => {
    const res = await request(app).get(`/agendamentos`)
    console.log('Resposta da listagem:', res.body)
    console.log('Total de agendamentos:', res.body.length)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  test('Deve atualizar o horario de um agendamento existente', async () => {
    const updates = { horario: '2025-04-11T15:30' }
    const res = await request(app).put(`/agendamentos/${agendamentoCriadoId}`).send(updates)
    console.log('Resposta da atualização:', res.body)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body[0].horario).toBe('2025-04-11T18:30:00+00:00') // O banco converte para UTC
  })

  test('Deve remover um agendamento do Supabase', async () => {
    const res = await request(app).delete(`/agendamentos/${agendamentoCriadoId}`)
    console.log('Resposta da exclusão:', res.body)
    expect(res.status).toBe(204)
  })
})

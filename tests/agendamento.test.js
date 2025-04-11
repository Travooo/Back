const request = require('supertest')
const { app } = require('../app')

let agendamentoCriadoId

describe('Testes de Integração - Agendamento', () => {
  test('Deve criar um agendamento via API', async () => {
    const new_agendamento = {
      estabelecimento_id: '3',
      usuario_id: '1',
      horario: '2025-04-06T14:30:00Z',
      detalhes: 'Usuário Teste API',
    }
    const res = await request(app).post('/agendamentos').send(new_agendamento)
    console.log('Resposta da criação:', res.body)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    agendamentoCriadoId = res.body.id
  })

  test('Deve listar um agendamento do Supabase', async () => {
    const res = await request(app).get(`/agendamentos/${agendamentoCriadoId}`)
    console.log('Agendamento buscado:', res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveProperty('id', agendamentoCriadoId)
  })

  test('Deve listar agendamentos do Supabase', async () => {
    const res = await request(app).get('/agendamentos')
    console.log('Total de agendamentos:', res.body.length)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  test('Deve atualizar um agendamento existente', async () => {
    const updates = { horario: '2025-04-06T15:40:00Z' }
    const res = await request(app).put(`/agendamentos/${agendamentoCriadoId}`).send(updates)
    console.log('Agendamento atualizado:', res.body)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body[0].horario.startsWith('2025-04-06T15:40:00')).toBe(true)
  })

  test('Deve remover um agendamento do Supabase', async () => {
    const res = await request(app).delete(`/agendamentos/${agendamentoCriadoId}`)
    console.log('Resposta da exclusão:', res.body)
    expect(res.status).toBe(204)
    expect(res.body).not.toBeInstanceOf(Error)
  })
})

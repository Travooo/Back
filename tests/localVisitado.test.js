require('dotenv').config()
const app = require('../src/app')
const request = require('supertest')

let localVisitadoCriadoId

describe('Testes de Integração - Local Visitado', () => {
  const localVisitado = {
    usuario_id: 1,
    estabelecimento_id: 3,
    data_visita: '2025-06-20',
  }

  test('Deve criar um local visitado via API', async () => {
    const res = await request(app).post('/locais_visitados').send(localVisitado)
    console.log('Resposta da criação:', res.body)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    localVisitadoCriadoId = res.body.id
  })

  test('Deve listar um local visitado do Supabase', async () => {
    const res = await request(app).get(`/locais_visitados/${localVisitadoCriadoId}`)
    console.log('Resposta da listagem:', res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveProperty('id', localVisitadoCriadoId)
  })

  test('Deve listar locais visitados do Supabase', async () => {
    const res = await request(app).get('/locais_visitados')
    console.log('Resposta da listagem:', res.body)
    console.log('Total de usuários:', res.body.length)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  test('Deve atualizar um local visitado existente', async () => {
    const updates = { data_visita: '2025-07-20' }
    const res = await request(app).put(`/locais_visitados/${localVisitadoCriadoId}`).send(updates)
    console.log('Resposta da atualização:', res.body)
    expect(res.status).toBe(200)
    expect(res.body.data_visita).toContain('2025-07-20')
  })

  test('Deve remover um local visitado do Supabase', async () => {
    const res = await request(app).delete(`/locais_visitados/${localVisitadoCriadoId}`)
    console.log('Resposta da exclusão:', res.body)
    expect(res.status).toBe(200)
  })
})

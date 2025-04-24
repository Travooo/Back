require('dotenv').config()
const app = require('../src/app')
const request = require('supertest')

let avaliacaoCriadaId

describe('Testes de Integração - Avaliação', () => {
  const hoje = new Date().toISOString().slice(0, 10)
  const avaliacao = {
    estabelecimento_id: 3,
    usuario_id: 1,
    comentario: 'Lamentável!',
    numero_estrelas: 1,
    data_comentario: hoje,
  }

  test('Deve criar uma avaliação via API', async () => {
    const res = await request(app).post('/avaliacoes').send(avaliacao)
    console.log('Resposta da criação:', res.body)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    avaliacaoCriadaId = res.body.id
  })

  test('Deve listar uma avaliação do Supabase', async () => {
    const res = await request(app).get(`/avaliacoes/${avaliacaoCriadaId}`)
    console.log('Resposta da listagem:', res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveProperty('id', avaliacaoCriadaId)
  })

  test('Deve listar avaliações do Supabase', async () => {
    const res = await request(app).get('/avaliacoes')
    console.log('Resposta da listagem:', res.body)
    console.log('Total de avaliações:', res.body.length)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  test('Deve atualizar o comentário e número de estrelas de uma avaliação existente', async () => {
    const updates = { comentario: 'Foram super atenciosos!', numero_estrelas: 4 }
    const res = await request(app).put(`/avaliacoes/${avaliacaoCriadaId}`).send(updates)
    console.log('Resposta da atualização:', res.body)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('comentario', 'Foram super atenciosos!')
    expect(res.body).toHaveProperty('numero_estrelas', 4)
  })

  test('Deve remover uma avaliação do Supabase', async () => {
    const res = await request(app).delete(`/avaliacoes/${avaliacaoCriadaId}`)
    console.log('Resposta da exclusão:', res.body)
    expect(res.status).toBe(200)
  })
})

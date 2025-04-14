require('dotenv').config()
const app = require('../src/app')
const request = require('supertest')

let estabelecimentoCriadoId

describe('Testes de Integração - Estabelecimento', () => {
  const new_estabelecimento = {
    usuario_organizacao_id: 1,
    nome: 'Johnny Lanches',
    sobre: 'Confira nosso cardápio digital! Jonnny',
    endereco: 'Rua do Johnny, Bairro do Jonnny, Eu sou o Johnny - Johnny',
    horarios: 'Todas terças e quinta-feiras, das 17h as 22h.',
    foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4//8/AwAI/AL+fctJ7wAAAABJRU5ErkJggg==',
    tipo: 'Restaurante',
  }

  test('Deve criar um estabelecimento via API', async () => {
    const res = await request(app).post('/estabelecimentos').send(new_estabelecimento)
    console.log('Resposta da criação:', res.body)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    estabelecimentoCriadoId = res.body.id
  })

  test('Deve listar um estabelecimento do Supabase', async () => {
    const res = await request(app).get(`/estabelecimentos/${estabelecimentoCriadoId}`)
    console.log('Resposta da listagem:', res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveProperty('id', estabelecimentoCriadoId)
  })

  test('Deve listar estabelecimentos do Supabase', async () => {
    const res = await request(app).get('/estabelecimentos')
    console.log('Resposta da listagem:', res.body)
    console.log('Total de estabelecimentos:', res.body.length)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
  })

  test('Deve atualizar um estabelecimento existente', async () => {
    const updates = { sobre: 'Segunda a sábado, das 17h as 22h.' }
    const res = await request(app).put(`/estabelecimentos/${estabelecimentoCriadoId}`).send(updates)
    console.log('Resposta da atualização:', res.body)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body[0].sobre).toBe('Segunda a sábado, das 17h as 22h.')
  })

  test('Deve remover um estabelecimento do Supabase', async () => {
    const res = await request(app).delete(`/estabelecimentos/${estabelecimentoCriadoId}`)
    console.log('Resposta da exclusão:', res.body)
    expect(res.status).toBe(204)
  })
})

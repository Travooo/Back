require('dotenv').config()
const app = require('../src/app')
const request = require('supertest')

let usuarioCriadoId

describe('Testes de Integração - Usuario', () => {
  const new_user = {
    email: 'new_email@email.com',
    senha: 'senha123',
    nome_usuario: 'testeUser',
    nome_completo: 'Usuário Teste API',
    foto_perfil:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4//8/AwAI/AL+fctJ7wAAAABJRU5ErkJggg==',
    data_nascimento: '2002-06-20',
    admin: false,
    tipo_plano: 1,
  }
  test('Deve criar um usuário via API', async () => {
    const res = await request(app).post('/usuarios').send(new_user)
    console.log('Resposta da criação:', res.body)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    usuarioCriadoId = res.body.id
    console.log('Resposta da criação:', res.body)
    console.log('Usuário buscado:', res.body)
    console.log('Total de usuários:', res.body.length)
  })

  test('Deve listar um usuário do Supabase', async () => {
    const res = await request(app).get(`/usuarios/${usuarioCriadoId}`)
    console.log('Usuário buscado:', res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveProperty('id', usuarioCriadoId)
    expect(res.body).not.toHaveProperty('senha')
    console.log('Resposta da criação:', res.body)
    console.log('Usuário buscado:', res.body)
    console.log('Total de usuários:', res.body.length)
  })

  test('Deve listar usuários do Supabase', async () => {
    const res = await request(app).get('/usuarios')
    console.log('Total de usuários:', res.body.length)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
    console.log('Resposta da criação:', res.body)
    console.log('Usuário buscado:', res.body)
    console.log('Total de usuários:', res.body.length)
  })

  test('Deve atualizar um usuario existente', async () => {
    const updates = { nome_usuario: 'NomeAtualizadoViaTeste' }
    const res = await request(app).put(`/usuarios/${usuarioCriadoId}`).send(updates)
    console.log('Usuário atualizado:', res.body)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body[0].nome_usuario).toBe('NomeAtualizadoViaTeste')
    console.log('Resposta da criação:', res.body)
    console.log('Usuário buscado:', res.body)
    console.log('Total de usuários:', res.body.length)
  })

  test('Deve remover um usuário do Supabase', async () => {
    const res = await request(app).delete(`/usuarios/${usuarioCriadoId}`)
    console.log('Resposta da exclusão:', res.body)
    expect(res.status).toBe(204)
    console.log('Resposta da criação:', res.body)
    console.log('Usuário buscado:', res.body)
    console.log('Total de usuários:', res.body.length)
  })
})

require("dotenv").config();
const app = require("../src/app");
const request = require("supertest");

let usuarioCriadoId;

describe("Testes de Integração - Usuário", () => {
  test("Deve criar um usuario via API", async () => {
    const res = await request(app).post("/usuarios").send({
      email: "eita5@email.com",
      senha: "senha123",
      nome_usuario: "testeUser",
      nome_completo: "Usuário Teste API",
      foto_perfil: null,
      sobre: "O sujeito é enraivado",
      data_nascimento: "2002-06-20",
      admin: false,
      tipo_plano: 1,
    });
    console.log("Resposta da criação:", res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    usuarioCriadoId = res.body.id;
  });

  describe("Leitura", () => {
    test("Deve listar o usuario criado pelo ID", async () => {
      const res = await request(app).get(`/usuarios/${usuarioCriadoId}`);
      console.log("Resposta da listagem por ID:", res.body);
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty("id", usuarioCriadoId);
    });
    test("Deve listar todos os usuarios cadastrados", async () => {
      const res = await request(app).get("/usuarios");
      console.log("Resposta da listagem geral:", res.body);
      console.log("Total de usuários:", res.body.length);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("Atualização", () => {
    test("Deve atualizar o nome de usuario", async () => {
      const atualizacao = { nome_usuario: "NomeAtualizadoViaTeste" };
      const res = await request(app)
        .put(`/usuarios/${usuarioCriadoId}`)
        .send(atualizacao);
      console.log("Resposta da atualização:", res.body);
      expect(res.status).toBe(200);
      expect(res.body.nome_usuario).toContain("NomeAtualizadoViaTeste");
    });
  });

  describe("Exclusão", () => {
    test("Deve excluir o usuario criado", async () => {
      const res = await request(app).delete(`/usuarios/${usuarioCriadoId}`);
      console.log("Resposta da exclusão:", res.body);
      expect(res.status).toBe(200);
    });
  });
});

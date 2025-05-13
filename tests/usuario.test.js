const app = require("../server.js");
const request = require("supertest");

let usuarioCriadoId;

describe("Testes de Integração - Usuário", () => {
  test("Deve criar um usuario via API", async () => {
    const res = await request(app).post("/rest/v1/usuarios").send({
      email: "luiz@email.com",
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

});

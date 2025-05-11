require("dotenv").config();
const app = require("../src/app");
const request = require("supertest");

let anexoCriadoId;

describe("Testes de Integração - Anexo", () => {
  test("Deve criar um anexo via API", async () => {
    const res = await request(app).post("/anexos").send({
      email: "eita5@email.com",
      senha: "senha123",
      nome_anexo: "testeUser",
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
    anexoCriadoId = res.body.id;
  });

  describe("Leitura", () => {
    test("Deve listar o anexo criado pelo ID", async () => {
      const res = await request(app).get(`/anexos/${anexoCriadoId}`);
      console.log("Resposta da listagem por ID:", res.body);
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty("id", anexoCriadoId);
    });
    test("Deve listar todos os anexos cadastrados", async () => {
      const res = await request(app).get("/anexos");
      console.log("Resposta da listagem geral:", res.body);
      console.log("Total de anexos:", res.body.length);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("Atualização", () => {
    test("Deve atualizar o nome de anexo", async () => {
      const atualizacao = { nome_anexo: "NomeAtualizadoViaTeste" };
      const res = await request(app)
        .put(`/anexos/${anexoCriadoId}`)
        .send(atualizacao);
      console.log("Resposta da atualização:", res.body);
      expect(res.status).toBe(200);
      expect(res.body.nome_anexo).toContain("NomeAtualizadoViaTeste");
    });
  });

  describe("Exclusão", () => {
    test("Deve excluir o anexo criado", async () => {
      const res = await request(app).delete(`/anexos/${anexoCriadoId}`);
      console.log("Resposta da exclusão:", res.body);
      expect(res.status).toBe(200);
    });
  });
});

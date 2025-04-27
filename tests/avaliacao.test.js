require("dotenv").config();
const app = require("../src/app");
const request = require("supertest");

let avaliacaoCriadaId;

describe("Testes de Integração - Avaliação", () => {
  test("Deve criar uma avaliacao via API", async () => {
    const res = await request(app).post("/avaliacoes").send({
      servico_id: 3,
      usuario_id: 1,
      comentario: "Lamentável!",
      numero_estrelas: 1,
      data_comentario: "2025-03-25",
    });
    console.log("Resposta da criação:", res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    avaliacaoCriadaId = res.body.id;
  });

  describe("Leitura", () => {
    test("Deve listar uma avaliacao pelo ID", async () => {
      const res = await request(app).get(`/avaliacoes/${avaliacaoCriadaId}`);
      console.log("Resposta da listagem por ID:", res.body);
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty("id", avaliacaoCriadaId);
    });

    test("Deve listar todas as avaliacoes cadastradas", async () => {
      const res = await request(app).get("/avaliacoes");
      console.log("Resposta da listagem geral:", res.body);
      console.log("Total de avaliações:", res.body.length);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("Atualização", () => {
    test("Deve atualizar o comentario e numero de estrelas", async () => {
      const updates = {
        comentario: "Foram super atenciosos!",
      };
      const res = await request(app)
        .put(`/avaliacoes/${avaliacaoCriadaId}`)
        .send(updates);
      console.log("Resposta da atualização:", res.body);
      expect(res.status).toBe(200);
      expect(res.body.comentario).toContain("Foram super atenciosos!");
    });
  });

  describe("Exclusão", () => {
    test("Deve excluir a avaliacao criada", async () => {
      const res = await request(app).delete(`/avaliacoes/${avaliacaoCriadaId}`);
      console.log("Resposta da exclusão:", res.body);
      expect(res.status).toBe(200);
    });
  });
});

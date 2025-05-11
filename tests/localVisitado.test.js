const app = require("../server.js");
const request = require("supertest");

let localVisitadoCriadoId;

describe("Testes de Integração - Serviço", () => {
  test("Deve criar um local visitado via API", async () => {
    const res = await request(app).post("/rest/v1/localvisitado/").send({
      servico_id: 3,
      usuario_id: 2,
      data_visita: "2025-02-25",
    });
    console.log("Resposta da criação:", res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    localVisitadoCriadoId = res.body.id;
  });

  describe("Leitura", () => {
    test("Deve listar um local visitado pelo ID", async () => {
      const res = await request(app).get(
        `/rest/v1/localvisitado/${localVisitadoCriadoId}`
      );
      console.log("Resposta da listagem por ID:", res.body);
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty("id", localVisitadoCriadoId);
    });

    test("Deve listar todos os locais visitados", async () => {
      const res = await request(app).get("/rest/v1/localvisitado");
      console.log("Resposta da listagem geral:", res.body);
      console.log("Total de locais visitados:", res.body.length);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("Atualização", () => {
    test("Deve atualizar a data de visita", async () => {
      const updates = { data_visita: "2025-02-22" };
      const res = await request(app)
        .put(`/rest/v1/localvisitado/${localVisitadoCriadoId}`)
        .send(updates);
      console.log("Resposta da atualização:", res.body);
      expect(res.status).toBe(200);
      expect(res.body.data_visita).toContain("2025-02-22");
    });
  });

  describe("Exclusão", () => {
    test("Deve remover o local visitado", async () => {
      const res = await request(app).delete(
        `/rest/v1/localvisitado/${localVisitadoCriadoId}`
      );
      console.log("Resposta da exclusão:", res.body);
      expect(res.status).toBe(200);
    });
  });
});

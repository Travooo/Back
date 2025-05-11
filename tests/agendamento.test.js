require("dotenv").config();
const app = require("../server.js");
const request = require("supertest");

let agendamentoCriadoId;

describe("Testes de Integração - Agendamento", () => {
  test("Deve criar um agendamentos via API", async () => {
    const res = await request(app).post("/rest/v1/agendamento").send({
      servico_id: 3,
      usuario_id: 2,
      horario: "2025-04-10T19:30",
      detalhes: "Agendamento Teste API",
    });
    console.log("Resposta da criação:", res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    agendamentoCriadoId = res.body.id;
  });

  describe("Leitura", () => {
    test("Deve listar o agendamento criado pelo ID", async () => {
      const res = await request(app).get(
        `/rest/v1/agendamento/${agendamentoCriadoId}`
      );
      console.log("Resposta da listagem:", res.body);
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty("id", agendamentoCriadoId);
    });
    test("Deve listar todos os agendamentos cadastrados", async () => {
      const res = await request(app).get("/rest/v1/agendamento");
      console.log("Resposta da listagem:", res.body);
      console.log("Total de agendamentos:", res.body.length);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("Atualização", () => {
    test("Deve atualizar o horario de um agendamento existente", async () => {
      const updates = { horario: "2025-02-11T18:30" };
      const res = await request(app)
        .put(`/rest/v1/agendamento/${agendamentoCriadoId}`)
        .send(updates);
      console.log("Resposta da atualização:", res.body);
      expect(res.status).toBe(200);
      expect(res.body.horario).toContain("2025-02-11T18:30");
    });
  });

  describe("Exclusão", () => {
    test("Deve remover um agendamento do Supabase", async () => {
      const res = await request(app).delete(
        `/rest/v1/agendamento/${agendamentoCriadoId}`
      );
      console.log("Resposta da exclusão:", res.body);
      expect(res.status).toBe(200);
    });
  });
});

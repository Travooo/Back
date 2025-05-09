const app = require("../server.js");
const request = require("supertest");

let pagamentoCriadoId;

describe("Testes de Integração - Pagamentos", () => {
  test("Deve criar um pagamento via API", async () => {
    const res = await request(app).post("/rest/v1/pagamento").send({
      valor: 150.75,
      metodo_pagamento: "pix",
      status: "pendente",
      usuario_id: 2,
    });
    console.log("Resposta da criação:", res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    pagamentoCriadoId = res.body.id;
  });

  describe("Leitura", () => {
    test("Deve buscar um pagamento por ID", async () => {
      const res = await request(app).get(`/rest/v1/pagamento/${pagamentoCriadoId}`);
      console.log("Resposta da leitura:", res.body);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("id", pagamentoCriadoId);
    });

    test("Deve buscar o status de um pagamento", async () => {
      const res = await request(app).get(
        `/rest/v1/pagamento/${pagamentoCriadoId}/status`
      );
      console.log("Status retornado:", res.body);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("status");
    });

    test("Deve listar todos os pagamentos", async () => {
      const res = await request(app).get("/rest/v1/pagamento");
      console.log("Lista de pagamentos:", res.body);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("Atualização", () => {
    test("Deve atualizar o status de um pagamento", async () => {
      update = { status: "cancelado" };
      const res = await request(app)
        .put(`/rest/v1/pagamento/${pagamentoCriadoId}/status`)
        .send(update);
      console.log("Status atualizado:", res.body);
      expect(res.status).toBe(200);
      expect(res.body.status).toEqual("cancelado");
    });

    test("Deve atualizar um pagamento existente", async () => {
      const res = await request(app)
        .put(`/rest/v1/pagamento/${pagamentoCriadoId}`)
        .send({ valor: 199.99, metodo_pagamento: "credito" });
      console.log("Pagamento atualizado:", res.body);
      expect(res.status).toBe(200);
      expect(res.body.valor).toEqual(199.99);
      expect(res.body.metodo_pagamento).toEqual("credito");
    });
  });

  describe("Exclusão", () => {
    test("Deve deletar um pagamento", async () => {
      const res = await request(app).delete(`/rest/v1/pagamento/${pagamentoCriadoId}`);
      console.log("Pagamento removido:", res.body);
      expect(res.status).toBe(200);
    });
  });
});

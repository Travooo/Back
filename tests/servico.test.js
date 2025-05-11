require("dotenv").config();
const app = require("../server.js");
const request = require("supertest");

let servicoCriadoId;

describe("Testes de Integração - Serviço", () => {
  const novoServico = {
    usuario_organizacao_id: 1,
    nome: "Johnny Lanches",
    sobre: "Confira nosso cardápio digital!",
    endereco: "Rua do Johnny, Bairro do Jonnny, Eu sou o Johnny - Johnny",
    horarios: "Todas terças e quinta-feiras, das 17h as 22h.",
    foto: null,
    tipo: "Bar",
  };

  test("Deve criar um servico via API", async () => {
    const res = await request(app).post("/rest/v1/servico").send(novoServico);
    console.log("Resposta da criação:", res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    servicoCriadoId = res.body.id;
  });

  describe("Leitura", () => {
    test("Deve listar o servico criado pelo ID", async () => {
      const res = await request(app).get(`/rest/v1/servico/${servicoCriadoId}`);
      console.log("Resposta da listagem por ID:", res.body);
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty("id", servicoCriadoId);
    });

    test("Deve listar todos os servicos cadastrados", async () => {
      const res = await request(app).get("/rest/v1/servico");
      console.log("Resposta da listagem geral:", res.body);
      console.log("Total de servicos:", res.body.length);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("Atualização", () => {
    test("Deve atualizar o campo 'sobre' do servico", async () => {
      const atualizacao = { sobre: "Segunda a sábado, das 17h as 22h." };
      const res = await request(app)
        .put(`/rest/v1/servico/${servicoCriadoId}`)
        .send(atualizacao);
      console.log("Resposta da atualização:", res.body);
      expect(res.status).toBe(200);
      expect(res.body.sobre).toBe("Segunda a sábado, das 17h as 22h.");
    });
  });

  describe("Exclusão", () => {
    test("Deve excluir o servico criado", async () => {
      const res = await request(app).delete(`/rest/v1/servico/${servicoCriadoId}`);
      console.log("Resposta da exclusão:", res.body);
      expect(res.status).toBe(204);
    });
  });
});

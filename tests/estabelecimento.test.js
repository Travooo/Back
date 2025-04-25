require("dotenv").config();
const app = require("../src/app");
const request = require("supertest");

let estabelecimentoCriadoId;

describe("Testes de Integração - Estabelecimento", () => {
  const novoEstabelecimento = {
    usuario_organizacao_id: 1,
    nome: "Johnny Lanches",
    sobre: "Confira nosso cardápio digital!",
    endereco: "Rua do Johnny, Bairro do Jonnny, Eu sou o Johnny - Johnny",
    horarios: "Todas terças e quinta-feiras, das 17h as 22h.",
    foto: null,
    tipo: "Bar",
  };

  test("Deve criar um estabelecimento via API", async () => {
    const res = await request(app)
      .post("/estabelecimentos")
      .send(novoEstabelecimento);
    console.log("Resposta da criação:", res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    estabelecimentoCriadoId = res.body.id;
  });

  describe("Leitura", () => {
    test("Deve listar o estabelecimento criado pelo ID", async () => {
      const res = await request(app).get(
        `/estabelecimentos/${estabelecimentoCriadoId}`
      );
      console.log("Resposta da listagem por ID:", res.body);
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty("id", estabelecimentoCriadoId);
    });

    test("Deve listar todos os estabelecimentos cadastrados", async () => {
      const res = await request(app).get("/estabelecimentos");
      console.log("Resposta da listagem geral:", res.body);
      console.log("Total de estabelecimentos:", res.body.length);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("Atualização", () => {
    test("Deve atualizar o campo 'sobre' do estabelecimento", async () => {
      const atualizacao = { sobre: "Segunda a sábado, das 17h as 22h." };
      const res = await request(app)
        .put(`/estabelecimentos/${estabelecimentoCriadoId}`)
        .send(atualizacao);
      console.log("Resposta da atualização:", res.body);
      expect(res.status).toBe(200);
      expect(res.body.sobre).toBe("Segunda a sábado, das 17h as 22h.");
    });
  });

  describe("Exclusão", () => {
    test("Deve excluir o estabelecimento criado", async () => {
      const res = await request(app).delete(
        `/estabelecimentos/${estabelecimentoCriadoId}`
      );
      console.log("Resposta da exclusão:", res.body);
      expect(res.status).toBe(204);
    });
  });
});

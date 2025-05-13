const app = require("../server.js");
const request = require("supertest");

let organizacaoCriadaId;

describe("Testes de Integração - UsuarioOrganizacao", () => {
  test("Deve criar uma organizacao via API", async () => {
    const res = await request(app).post("rest/v1/usuarios_organizacao").send({
      cnpj: "01415862000148",
      nome_fantasia: "Empresa Teleinformática",
      email: "email.empresa3@email.me",
      telefone: "51999999999",
      razao_social: "Empresa Teleinformatica Ltda",
      senha: "marquinhosalgadinhos",
    });
    console.log("Resposta da criação:", res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    organizacaoCriadaId = res.body.id;
  });

  describe("Leitura", () => {
    test("Deve listar a organizacao criada pelo ID", async () => {
      const res = await request(app).get(
        `/usuarios_organizacao/${organizacaoCriadaId}`
      );
      console.log("Resposta da listagem por ID:", res.body);
      expect(res.status).toBe(200);
      expect(res.body).toBeDefined();
      expect(res.body).toHaveProperty("id", organizacaoCriadaId);
    });

    test("Deve listar todas as organizacoes cadastradas", async () => {
      const res = await request(app).get("/usuarios_organizacao");
      console.log("Resposta da listagem geral:", res.body);
      console.log("Total de organizações:", res.body.length);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("Atualização", () => {
    test("Deve atualizar o CNPJ da organizacao", async () => {
      const atualizacao = { cnpj: "01415862000144" };
      const res = await request(app)
        .put(`/usuarios_organizacao/${organizacaoCriadaId}`)
        .send(atualizacao);
      console.log("Resposta da atualização:", res.body);
      expect(res.status).toBe(200);
      expect(res.body.cnpj).toContain("01415862000144");
    });
  });

  describe("Exclusão", () => {
    test("Deve excluir a organizacao criada", async () => {
      const res = await request(app).delete(
        `/usuarios_organizacao/${organizacaoCriadaId}`
      );
      console.log("Resposta da exclusão:", res.body);
      expect(res.status).toBe(200);
    });
  });
});

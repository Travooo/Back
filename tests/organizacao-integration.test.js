const request = require("supertest");
const OrganizacaoService = require("../services/OrganizacaoService");
const app = require("../server");

describe("Testes de Integração - Organização Router", () => {
  test("Deve criar uma organização via API", async () => {
    new_user = {
      cnpj: "01415862000148",
      nome_fantasia: "Empresa",
      email: "empresa@email.com",
      telefone: "51999999999",
      razao_social: "Empresa Ltda",
      senha: "senha123",
    };
    const res = await request(app).post("/organizacoes").send(new_user);
    console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("email", new_user.email);
  });

  test("Deve listar uma organização do Supabase", async () => {
    const usuario = await OrganizacaoService.get_by_id(1);
    console.log(usuario);
    expect(usuario).toBeDefined();
    expect(typeof usuario).toBe("object");
  });

  test("Deve listar todas organizações do Supabase", async () => {
    const usuarios = await OrganizacaoService.get_all();
    console.log(usuarios);
    expect(Array.isArray(usuarios)).toBe(true);
  });

  test("Deve atualizar uma organização existente", async () => {
    const id = 4;
    const updates = { nome_fantasia: "Teste Nome Novo" };
    const updated_user = await OrganizacaoService.update(id, updates);
    expect(updated_user).toBeDefined();
    expect(updated_user[0].nome_fantasia).toBe("Teste Nome Novo");
  });

  test("Deve remover uma organização do Supabase", async () => {
    const id = 5;
    const user = await OrganizacaoService.delete(id);
    expect(user).not.toBeInstanceOf(Error);
    if (user === null || user.error) {
      console.log("Organização #" + id + " removido (ou não encontrado).");
    }
  });
});

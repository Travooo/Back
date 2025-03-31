const request = require("supertest");
const UsuarioService = require("../services/UsuarioService");
const app = require("../server");

describe("Testes de Integração - Usuario Router", () => {
  test("Deve criar um usuário via API", async () => {
    new_user = {
      email: "teste@teste.com",
      senha: "senha123",
      nome_usuario: "testeUser",
      nome_completo: "User Testador",
      data_nascimento: "2002-06-20",
    };
    const res = await request(app).post("/usuarios").send(new_user);
    console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("email", new_user.email);
  });

  test("Deve listar um usuário do Supabase", async () => {
    const usuario = await UsuarioService.get_by_id(1);
    console.log(usuario);
    expect(usuario).toBeDefined();
    expect(typeof usuario).toBe("object");
  });

  test("Deve listar usuários do Supabase", async () => {
    const usuarios = await UsuarioService.get_all();
    console.log(usuarios);
    expect(Array.isArray(usuarios)).toBe(true);
  });

  test("Deve atualizar um usuário existente", async () => {
    const id = 2;
    const updates = { nome_usuario: "Teste Nome Novo" };
    const updated_user = await UsuarioService.update(id, updates);
    expect(updated_user).toBeDefined();
    expect(updated_user[0].nome_usuario).toBe("Teste Nome Novo");
  });

  test("Deve remover um usuário do Supabase", async () => {
    const id = 64;
    const user = await UsuarioService.delete(id);
    expect(user).not.toBeInstanceOf(Error);
    if (user === null || user.error) {
      console.log("Usuário #" + id + " removido (ou não encontrado).");
    }
  });
});

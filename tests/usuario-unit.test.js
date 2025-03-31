const Usuario = require("../models/Usuario");

const testesUnidadeUsuario = () => {
  try {
    console.log();
    console.log(
      "Testando: Falha ao criar uma instância de usuário com email inválido"
    );
    new Usuario(
      "email_invalido",
      "123456",
      "userTester",
      "Testador User",
      null,
      null,
      "2002-06-20"
    );
  } catch (error) {
    console.log(`Erro: ${error.message}`);
    console.log();
  }

  try {
    console.log(
      "Testando: Falha ao instanciar um usuário sem campos obrigatórios"
    );
    new Usuario(
      "email_invalido", // email válido
      "123456", // senha válida
      null, // nome_usuario ausente
      null, // nome_completo ausente
      null,
      null,
      "2002-06-20"
    );
  } catch (error) {
    console.log(`Erro: ${error.message}`);
    console.log();
  }

  try {
    console.log(
      "Testando: Falha ao instanciar um usuário com senha menor que 6 caracteres"
    );
    new Usuario(
      "email@valido.com",
      "12345",
      "userTester",
      "Testador User",
      null,
      null,
      "2002-06-20"
    );
  } catch (error) {
    console.log(`Erro: ${error.message}`);
  }
};

testesUnidadeUsuario();

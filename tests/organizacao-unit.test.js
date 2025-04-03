const Organizacao = require("../models/Organizacao");

const testesUnidadeOrganizacao = () => {
  try {
    console.log();
    console.log(
      "Testando: Falha ao criar uma instância de organização com email inválido"
    );
    new Organizacao(
      "01415862000148",
      "Empresa",
      "email_invalido",
      "51999999999",
      "Empresa Ltda",
      "senha123"
    );
  } catch (error) {
    console.log(`Erro: ${error.message}`);
    console.log();
  }

  try {
    console.log(
      "Testando: Falha ao instanciar um usuário sem campos obrigatórios"
    );
    new Organizacao(
      null,
      null,
      "empresa@email.com",
      "51999999999",
      "Empresa Ltda",
      "senha123"
    );
  } catch (error) {
    console.log(`Erro: ${error.message}`);
    console.log();
  }

  try {
    console.log(
      "Testando: Falha ao instanciar um usuário com senha menor que 6 caracteres"
    );
    new Organizacao(
      "01415862000148",
      "Empresa",
      "empresa@email.com",
      "51999999999",
      "Empresa Ltda",
      "senha"
    );
  } catch (error) {
    console.log(`Erro: ${error.message}`);
  }
};

testesUnidadeOrganizacao();

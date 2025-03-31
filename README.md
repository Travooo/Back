# 📌 Backend com Node.js, JavaScript, PostgreSQL e Supabase

Este projeto **Node.js** utiliza **JavaScript** e **PostgreSQL** hospedado no **Supabase**. Ele segue uma arquitetura **MVC (Model-View-Controller)** com separação clara entre **modelos de dados\*, **serviços**, **rotas** e **controladores\*\*, garantindo modularidade e escalabilidade.

### 📦 Instalando dependências

```bash
npm install
npm init -y
npm install express cors dotenv
npm install @supabase/supabase-js pg
node index.js
http://localhost:3001/test-supabase
```

### 📁 Estrutura

A estrutura segue os princípios de **separação de responsabilidades**. Abaixo, seguem explicações na ordem que o sistema é executado.

## Server.js

O arquivo 'server.js' é o ponto de entrada do servidor da aplicação, configurando e inicializando a aplicação _Express_ e realizando a conexão com o _Supabase_. Para ver sua configuração completa, acessar o arquivo. Abaixo, explico como ele inicia as interações com o back.
Em 'server.js' são criadas as rotas da aplicação:

# Importação e uso da rota "/usuarios":

```javascript
const caminho_usuario_router = require("./routes/usuarioRouter");
app.use("/usuarios", caminho_usuario_router);
```

São criadas as rotas associando seus routers (que precisam ser importados) ao Express, permitindo assim o roteamento das requisições para os roteadores corretos.

## Routers

São os arquivos que contêm as definições das rotas da aplicação. Usando o _express_ criam _routers_ definindo rotas com suas respectivas ações.
Exemplo de 'usuarioRouter.js' com rotas básicas de CRUD:

```javascript
const UsuarioController = require("../controllers/UsuarioController");
const express = require("express");
const usuarioRouter = express.Router();

usuarioRouter.post("/", UsuarioController.create);
usuarioRouter.get("/", UsuarioController.get_all);
usuarioRouter.get("/:id", UsuarioController.get_by_id);
usuarioRouter.put("/:id", UsuarioController.update);
usuarioRouter.delete("/:id", UsuarioController.delete);

module.exports = usuarioRouter;
```

Usando o _express_ cram _routers_ definindo rotas com suas respectivas ações. Essas _ações_ se iniciam pela chamada do respectivo método do _controller_.
Ou seja, as rotas criam URLs "conectando-as" com as respectivas funções que realmente tratam a requisição.

## Controllers

Organizam e separam as funções de cada requisição HTTP, centralizando a lógica de requisição.
Incluem tratamento de erros com respostas HTTP detalhadas para os casos de requisição bem e mal-sucedida. permitindo respostas HTTP mais granulares.
Servem como o ponto de entrada para as requisições HTTP e as direciona para os controladores apropriados.
Como vimos em usuarioRouter, quando uma requisição `usuarioRouter.post("/", UsuarioController.create);` chegar, o Express executa `UsuarioController.create(req, res)`.
Exemplo com o método 'UsuarioController.create()':

```javascript
const UsuarioService = require("../services/UsuarioService");

class UsuarioController {
  static async create(req, res) {
    try {
      const new_user_data = await UsuarioService.create(req.body);
      return res.status(201).json(new_user_data);
      // 201 Created: Indica que um novo recurso foi criado com sucesso, mas não há conteúdo a ser retornado na resposta.
    } catch (error) {
      console.error("Erro ao criar usuário:");
      return res.status(400).json({ error: error.message });
      // 400 Bad Request: Indica que a requisição do cliente é inválida.
      // Geralmente por falta de parâmetros obrigatórios ou formato incorreto.
    }
  }
}
module.exports = UsuarioController;
```

Essencialmente os métodos dos controladores tentam executar o método respectivo do service prevenindo crashs e tratando erros.

## Services

Encapsulam a lógica de interação com o Supabase e regras de negócio necessárias.
Responsáveis por interagir com o banco e por trazer os dados/feedbacks retornados da forma adequada aos controllers.

Exemplo com o método 'UsuarioService.create()':

```javascript
class UsuarioService {
  static async create(user_data_json) {
    // Aqui, a própria instanciação valida a integridade do objeto:
    try {
      const usuario = new Usuario(
        user_data_json.email,
        user_data_json.senha,
        user_data_json.nome_usuario,
        user_data_json.nome_completo,
        user_data_json.foto_perfil,
        user_data_json.sobre,
        user_data_json.data_nascimento,
        user_data_json.admin,
        user_data_json.tipo_plano
      );
      // Inserção no Supabase: passa os atributos do objeto em JSON:
      const { data, error } = await supabase
        .from("usuarios")
        .insert({
          email: usuario.email,
          senha: usuario.senha,
          nome_usuario: usuario.nome_usuario,
          nome_completo: usuario.nome_completo,
          foto_perfil: usuario.foto_perfil,
          sobre: usuario.sobre,
          data_nascimento: usuario.data_nascimento,
          admin: usuario.admin,
          tipo_plano: usuario.tipo_plano,
        })
        .single()
        .select();
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
```

## Models

Os models representam a estrutura dos dados. Podem ser úteis para:

- Validação de atributos nos próprios construtores. Os construtores dos Models possuem condicionais responsáveis por validar atributos.
- Definição de valores padrão para atributos opcionais (abstraindo lógica do banco).
  No Supabase não é possível fazer INSERT passando um objeto literal como parâmetro. O Supabase aceita inserções apenas em formato JSON. Por isso como demonstrado em 'UsuarioService.create()' o back está configurado para receber os dados do body das requisições do front em JSON, e os atributos do JSON, o _service_ tenta instanciar um modelo ('Usuario'). Se o objeto conseguir ser instanciado sem erro, logo os dados estão validados e apenas então são inseridos no banco, em JSON.
  Essa abordagem encapsula a lógica de validação e inserção de dados e facilita a manutenção do código.

## Middleware

Contém funções que podem ser executadas entre a requisição e a resposta, como verificação de autenticação.

## Config

Armazena configurações e variáveis de ambiente do projeto, como configurações do banco de dado e tokens de API.

## Possíveis novas funcionalidades para implementar:

Utilizar esse espaço para anotas novas funções que podem ser necessárias:

#### "Listagem filtrada":

Filtrar pagamentos por status, usuário, período...

**Exemplo de rota:**

```javascript
/pagamentos?status=pendente&id*usuario=123
router.get("/", PagamentoController.get_filtered);
```

**Caso de uso:**
Buscar pagamentos pendentes de um usuário específico.

#### "Pagamento por intervalo de datas"

Listar pagamentos dentro de um período específico.

**Exemplo de rota:**

```javascript
/pagamentos/periodo?inicio=2024-03-01&fim=2024-03-31
router.get("/periodo", PagamentoController.get_by_period);
```

**Caso de uso:**
Exibir pagamentos feitos em um mês específico.

### "Reembolso de pagamento:"

Atualizar o status para "reembolsado" e gravar a data do reembolso.

**Exemplo de rota:**

```javascript
/pagamentos/:id/reembolso
router.post("/:id/reembolso", PagamentoController.process_refund);
```

**Caso de uso:**
Um usuário solicitou reembolso de um pagamento.

### "Webhook de atualização (para integrações externas):"

Receber notificações de atualização de status de um pagamento.

**Exemplo de rota:**

```javascript
/pagamentos/webhook
router.post("/webhook", PagamentoController.payment*webhook);
```

**Caso de uso:**
Atualizar status automaticamente quando um gateway de pagamento confirma uma transação.

#### "Métodos de pagamento disponíveis:"

Retornar uma lista de métodos suportados (ex.: cartão, Pix, boleto).

**Exemplo de rota:**

```javascript
/pagamentos/metodos
router.get("/metodos", PagamentoController.get_payment_methods);
```

**Caso de uso:**
Exibir opções na interface do usuário antes do pagamento.

## Métodos Estáticos Assíncronos x Métodos de Instância Assíncronos:

#### Método estático:

Não depende de uma instância da classe. Ou seja, você chama o método diretamente na classe sem precisar criar uma instância da classe.

```javascript
class Exemplo {
  static async fetchData() {
    let response = await fetch("https://api.example.com/data");
    let data = await response.json();
    return data;
  }
}
// Chama diretamente na classe, sem criar uma instância:
Exemplo.fetchData().then((data) => console.log(data));
```

#### Método de instância:

Depende de uma instância da classe. Você precisa criar um objeto para chamar esse método.

```javascript
class Exemplo {
  async fetchData() {
    let response = await fetch("https://api.example.com/data");
    let data = await response.json();
    return data;
  }
}
// Aqui, você precisa criar uma instância da classe:
const exemplo = new Exemplo();
exemplo.fetchData().then((data) => console.log(data));
```

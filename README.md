# 📌 Backend com Node.js, JavaScript, PostgreSQL e Supabase

Este projeto **Node.js** utiliza **JavaScript** e **PostgreSQL** hospedado no **Supabase**. Ele segue uma arquitetura **MVC (Model-View-Controller)** com separação clara entre **serviços**, **rotas** e **controladores**, garantindo modularidade e escalabilidade.

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

A estrutura segue os princípios de **separação de responsabilidades**, onde cada pasta tem uma função no processo de desenvolvimento. Abaixo está a explicação de cada uma:

## Services

Encapsulam a lógica de interação com o Supabase e regras de negócio, como validação de dados. São responsáveis por buscar ou manipular dados do banco e retorná-los de forma adequada para os controladores.

## Controllers

Centralizam a lógica de requisição, organizando e separando as funções de cada requisição HTTP. Incluem tratamento de erros detalhados permitindo respostas HTTP mais granulares.

## Routes

Contém as definições de todas as rotas da aplicação. Ele serve como o ponto de entrada para as requisições HTTP e direciona as requisições para os controladores apropriados.

## Models

Os models representam a estrutura dos dados e podem ser utilizados para validação de atributos. No entanto, não são obrigatórios no projeto. Eles podem ser úteis para:

- Validação de atributos nos próprios construtores (embora isso possa ser tratado no service).
- Definição de valores padrão para atributos opcionais (embora isso possa ser tratado no service ou pelo banco).

### ⚠️ Sobre o Supabase:

O Supabase parece aceitar apenas inserções em formato JSON, não diretamente via classes. Isso significa que, recebendo a requisição em JSON do front, ao usar models, precisaríamos convertê-los novamente para JSON antes do insert, o que pode não justificar sua manutenção no projeto.

### Implementação atual:

O código nos services contém ambas as abordagens (com e sem models). A versão usando apenas JSON está comentada para facilitar a decisão final.

### Próximos passos:

Se for decidido remover os models, antes da exclusão devemos:

- ✅ Verificar quais validações de atributos eles possuem;
- ✅ Mover essas validações para os respectivos services, caso ainda não estejam lá.

## Middleware

Contém funções que podem ser executadas entre a requisição e a resposta, como verificação de autenticação.

## Config

Armazena configurações e variáveis de ambiente do projeto, como configurações do banco de dado e tokens de API.

## Possíveis novas funcionalidades para implementar:

### **Entidade PAGAMENTO**

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

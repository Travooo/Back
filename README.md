# 📌 Backend com Node.js, JavaScript, PostgreSQL e Supabase

Este projeto **Node.js** utiliza **JavaScript** e **PostgreSQL** hospedado no **Supabase**. Ele segue uma arquitetura **MVC (Model-View-Controller)** com separação clara entre **modelos de dados**, **serviços**, **rotas** e **controladores**, garantindo modularidade e escalabilidade.
A utilização dos modelos de dados será revisada e sua necessidade verificada conforme o andamento do projeto.

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

A estrutura segue os princípios de **separação de responsabilidades**, onde cada pasta tem uma função clara no processo de desenvolvimento. Abaixo está a explicação de cada uma:

## services

**- RESPONSABILIDADE:** Encapsulam a lógica de interação com o Supabase e regras de negócio, como validação de dados. São responsáveis por buscar ou manipular dados do banco e retorná-los de forma adequada para os controladores.

## controller

**- RESPONSABILIDADE:** Centraliza a lógica de requisição organizando e separando as funções de cada requisição HTTP. Inclui tratamento de erros detalhados, com mensagens padronizadas, permitindo respostas HTTP mais granulares.

## routes

**- RESPONSABILIDADE:** Contém as definições de todas as rotas da aplicação. Ele serve como o ponto de entrada para as requisições HTTP e direciona as requisições para os controladores apropriados.

## models

**- RESPONSABILIDADE:** Representar a estrutura dos dados para validação. Não é necessário, mas pode ser útil caso desejamos criar regras de negócio para validação antes de uma inserção. Essa lógica pode também ser abstraída para o banco. Está sendo implementada ambas, comentando como seria em JSON puro, para verificação posterior.

## middleware

**- RESPONSABILIDADE:** Contém funções que podem ser executadas entre a requisição e a resposta, como verificação de autenticação.

## config

**- RESPONSABILIDADE:** Armazena configurações e variáveis de ambiente do projeto, como configurações do banco de dado e tokens de API.

## Possíveis novas funcionalidades para implementar:

**\*ENTIDADE PAGAMENTO**
_"Listagem filtrada":_ filtrar pagamentos por status, usuário, período...
**Exemplo de rota:**
/pagamentos?status=pendente&id*usuario=123
router.get("/", PagamentoController.get_filtered);
**Caso de uso:**
Buscar pagamentos pendentes de um usuário específico.  
 *"Pagamento por intervalo de datas":_ Listar pagamentos dentro de um período específico.
**Exemplo de rota:**
/pagamentos/periodo?inicio=2024-03-01&fim=2024-03-31
router.get("/periodo", PagamentoController.get_by_period);
**Caso de uso:**
Exibir pagamentos feitos em um mês específico.
_"Reembolso de pagamento":_
Atualizar o status para "reembolsado" e gravar a data do reembolso.
**Exemplo de rota:**
/pagamentos/:id/reembolso
router.post("/:id/reembolso", PagamentoController.process_refund);
**Caso de uso:**
Um usuário solicitou reembolso de um pagamento.
_"Webhook de atualização (para integrações externas)":_
Receber notificações de atualização de status de um pagamento.
**Exemplo de rota:**
/pagamentos/webhook
router.post("/webhook", PagamentoController.payment_webhook);
**Caso de uso:**
Atualizar status automaticamente quando um gateway de pagamento confirma uma transação.
_"Métodos de pagamento disponíveis":\_
Retornar uma lista de métodos suportados (ex.: cartão, Pix, boleto).
**Exemplo de rota:**
/pagamentos/metodos
router.get("/metodos", PagamentoController.get_payment_methods);
**Caso de uso:**
Exibir opções na interface do usuário antes do pagamento.

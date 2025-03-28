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

## controller

**- RESPONSABILIDADE:** Centraliza a lógica de requisição organizando e separando as funções de cada requisição HTTP. Inclui tratamento de erros detalhados, com mensagens padronizadas, permitindo respostas HTTP mais granulares.

## routes

**- RESPONSABILIDADE:** Contém as definições de todas as rotas da aplicação. Ele serve como o ponto de entrada para as requisições HTTP e direciona as requisições para os controladores apropriados.

## services

**- RESPONSABILIDADE:** Encapsulam a lógica de interação com o Supabase e regras de negócio, como validação de dados. São responsáveis por buscar ou manipular dados do banco e retorná-los de forma adequada para os controladores.

## middleware

**- RESPONSABILIDADE:** Contém funções que podem ser executadas entre a requisição e a resposta, como verificação de autenticação.

## config

**- RESPONSABILIDADE:** Armazena configurações e variáveis de ambiente do projeto, como configurações do banco de dado e tokens de API.

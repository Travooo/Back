# 📌 Backend com Node.js, JavaScript, PostgreSQL e Supabase

Este projeto é a conversão da estrutura original desenvolvida em Java para **Node.js**, utilizando **JavaScript** e **PostgreSQL** hospedado no **Supabase**. Ele segue uma arquitetura **MVC (Model-View-Controller)** com separação clara entre **modelos de dados**, **serviços**, **rotas** e **controladores**, garantindo modularidade e escalabilidade.

### 📦 Instalando dependências

```bash
npm install
npm init -y
npm install express cors dotenv
npm install @supabase/supabase-js pg
node index.js
http://localhost:3001/test-supabase
```

### 📁 Estrutura de pastas

A estrutura de pastas segue os princípios de **separação de responsabilidades**, onde cada pasta tem uma função clara no processo de desenvolvimento. Abaixo está a explicação de cada uma:

## controller

**- RESPONSABILIDADE:** Centraliza a lógica de requisição. Em vez de ter toda a lógica dentro das rotas, o controlador organiza e separa as funções de cada requisição HTTP (como GET, POST, PUT, DELETE). Também pode incluir um tratamento de erros mais detalhado, permitindo respostas HTTP mais granulares e mensagens padronizadas.

## routes

**- RESPONSABILIDADE:** Contém as definições de todas as rotas da aplicação. Ele serve como o ponto de entrada para as requisições HTTP e direciona as requisições para os controladores apropriados.

## services

**- RESPONSABILIDADE:** Os serviços encapsulam a lógica de interação com o Supabase ou outras fontes de dados. Eles são responsáveis por buscar ou manipular dados do banco e retorná-los de uma forma mais organizada para os controladores.

## model

**- RESPONSABILIDADE:** Representa a estrutura dos dados e interage diretamente com o banco de dados. Ele define os esquemas, validações e fornece funções para manipulação dos dados (como salvar, atualizar, deletar).

## middleware

**- RESPONSABILIDADE:** Contém funções que podem ser executadas entre a requisição e a resposta. Isso pode incluir verificação de autenticação, validação de dados de entrada, manipulação de erros, entre outros.

## config

**- RESPONSABILIDADE:** Armazena configurações e variáveis de ambiente do projeto, como configurações do banco de dado e tokens de API.

# 📌 Backend com Node.js, JavaScript, PostgreSQL e Supabase

Este projeto é a conversão da estrutura original desenvolvida em Java (branch master) para **Node.js** com **JavaScript**, utilizando **PostgreSQL** hospedado no **Supabase**. 


## 📁 Estrutura do Projeto

```plaintext
back/
├── src/                         # Código-fonte do projeto
│   ├── config/                  # Configurações gerais e variáveis de ambiente
│   │   ├── supabase.js          # Configuração do Supabase (serviço de banco de dados)
│   │   ├── database.js          # Configuração do banco de dados (conexão, modelo de dados)
│   ├── controllers/             # Lógica de controle das rotas
│   │   ├── agendamentoController.js  
│   │   ├── usuarioController.js     
│   ├── models/                  # Modelos de dados (equivalente às classes Java)
│   │   ├── Agendamento.js       
│   │   ├── Usuario.js           
│   ├── routes/                  # Definição de rotas da aplicação
│   │   ├── agendamentos.js      
│   │   ├── usuarios.js          
│   ├── services/                # Camada de lógica de negócios (serviços)
│   │   ├── agendamentoService.js   
│   │   ├── usuarioService.js      
│   ├── middlewares/             # Middlewares utilizados nas rotas (ex: autenticação, logs)
│   │   ├── authMiddleware.js    # Middleware de autenticação (para validar tokens, etc.)
│   ├── app.js                   # Configuração principal do app, incluindo middlewares e rotas
│   ├── server.js                # Inicialização do servidor, como configurar o Express, por exemplo
├── tests/                       # Testes unitários para os módulos
│   ├── agendamento.test.js      
│   ├── usuario.test.js          
├── .env                         # Arquivo de variáveis de ambiente (ex: senhas, tokens, configurações)
├── .gitignore                   # Arquivo de configuração para ignorar arquivos no Git (como node_modules, .env, etc.)
├── package.json                 # Arquivo de dependências e scripts do Node.js (gerenciado pelo npm)
├── README.md                    # Documento com informações sobre o projeto
```

## 🚀 Instalação e Configuração

### 📌 Pré-requisitos
- **Node.js** instalado ([Baixar aqui](https://nodejs.org/))
- **PostgreSQL** configurado ([Supabase](https://supabase.com/) recomendado)
- **Git** instalado ([Baixar aqui](https://git-scm.com/))

### 📥 Clonando o repositório
```bash
git clone https://github.com/Travooo/Back.git
cd Back
```

### 📦 Instalando dependências
```bash
npm install
```

### 🛠️ Configuração do Banco de Dados
1. **Criar um banco no Supabase** e copiar a string de conexão (PostgreSQL).
2. Criar um arquivo `.env` na raiz do projeto escrevendo nele:
```plaintext
DATABASE_URL="postgres://user:password@host:port/database"
JWT_SECRET="sua-chave-secreta"
PORT=3000
```

### 🏗️ Compilando o projeto (TypeScript para JavaScript)
```bash
npm run build
```

### 🏃 Rodando o servidor
```bash
npm run dev  # Executa com Nodemon (recarrega automaticamente)
npm start    # Executa o servidor em produção
```

## 📡 Rotas da API
| Método  | Rota              | Descrição |
|---------|------------------|------------|
| `POST`  | `/usuarios`      | Criar usuário |
| `GET`   | `/usuarios/:id`  | Buscar usuário por ID |
| `POST`  | `/agendamentos`  | Criar agendamento |
| `GET`   | `/agendamentos`  | Listar agendamentos |

## 🧪 Testes
Para rodar os testes:
```bash
npm test
```

## 🚀 Contribuição
1. Fork este repositório
2. Crie uma branch (`git checkout -b minha-feature`)
3. Faça commit das mudanças (`git commit -m 'Minha nova feature'`)
4. Envie para o repositório (`git push origin minha-feature`)
5. Abra um Pull Request 😃

---
📌 **Projeto atualizado para TypeScript e Supabase!** 🚀

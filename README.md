# Travooo - Backend

Desenvolvido em Node.js com Express e Supabase.

## Pré-requisitos:

- Node.js e npm instalados ([download](https://nodejs.org/))
- Conta no [Supabase](https://supabase.com/) com projeto configurado


## Como rodar:

### 1. Clone o repositório:

```bash
git clone https://github.com/travooo/back.git
```

### 2. Inicialize o projeto Node.js:

```bash
npm init -y
```

### 3. Instale as dependências:

```bash
npm install express dotenv bcrypt jsonwebtoken cors superagent @supabase/supabase-js zod multer
```

### 4. Crie o arquivo `.env` com suas variáveis de ambiente

```bash
PORT=3000
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=your_supabase_key
JWT_SECRET=uma_senha_segura_e_complexa
JWT_EXPIRES_IN=2h
```
### 5. Instalar nodemon:

#####  Reinicia automaticamente o servidor quando há alterações no código:

```bash
npm install --save-dev nodemon
```

### 6. Inicie o servidor:

```bash
node server.js
```

##### Para rodar o projeto com `npm run dev` adicione na seção `scripts` de seu `package.json`:

```bash
"scripts": {
"dev": "nodemon server.js"   //ou "node server.js"
}
```

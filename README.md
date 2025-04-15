
### Instalando dependências

```bash
npm install
npm init -y
npm install express cors dotenv
npm install @supabase/supabase-js pg
npm install validator
npm install bcrypt
node index.js
http://localhost:3001/test-supabase
```

O projeto segue princípios de **separação de responsabilidades** com camadas para **modelos de entidades**, **serviços**, **rotas** e **controladores**.

## app.js

Arquivo central de configuração do servidor. Carrega as variáveis de ambiente, cria a instância do _Express_, configura o _CORS_, se conecta ao _Supabase_ e registra dinâmicamente as rotas da aplicação a partir dos módulos em Routes.

```javascript
const caminho_usuario_router = require('./routes/usuarioRouter')
app.use('/usuarios', caminho_usuario_router)
```

Cada rota é associada ao seu respectivo router, permitindo que o Express direcione as requisições para os controladores apropriados.

## index.js

Ponto de entrada do servidor da aplicação. Inicia o servidor _Express_ importando app.js.

## Routers

Definem as rotas da aplicação e mapeiam as URLs para as ações tratadas nos _controllers_, utilizando _Express_.

```javascript
const UsuarioController = require('../controllers/UsuarioController')
const express = require('express')
const usuarioRouter = express.Router()

usuarioRouter.post('/', UsuarioController.create)
usuarioRouter.get('/', UsuarioController.get_all)
usuarioRouter.get('/:id', UsuarioController.get_by_id)
usuarioRouter.put('/:id', UsuarioController.update)
usuarioRouter.delete('/:id', UsuarioController.delete)

module.exports = usuarioRouter
```

## Controllers

Centralizam a lógica de cada requisição HTTP, separando responsabilidades e mantendo o código organizado.
São responsáveis por:

- Receber e processar as requisições
- Acionar os serviços apropriados (_Services_)
- Tratar erros e retornar respostas HTTP adequadas

```javascript
const UsuarioService = require('../services/UsuarioService')

class UsuarioController {
  static async create(req, res) {
    try {
      const new_user = await UsuarioService.create(req.body)
      return res.status(201).json(new_user)
    } catch (error) {
      console.error('Erro ao criar usuário:')
      return res.status(400).json({ error: error.message })
    }
  }
  //...
}
```

## Services

Responsáveis por interagir com o banco. Encapsulam a interação com o Supabase, incuindo as lógicas e regras de negócio necessárias, e retornam os dados ou feedbacks de forma adequada aos controllers.

### Models
Responsáveis por definir um modelo de dados com regras e métodos de validação para a criação ou atualização de entidades.

### Middleware

Contém funções que podem ser executadas entre a requisição e a resposta, como verificação de autenticação.

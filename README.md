
### Instalando dependências

```bash
npm init -y
npm install express cors dotenv @supabase/supabase-js pg bcrypt
npm install --save-dev nodemon
# Adicionar em package.json/"scripts" "'dev'" : "'nodemon src/config/index.js'"
npm run dev
# http://localhost:3000/
```

O projeto segue princípios de **separação de responsabilidades** com camadas para **modelos de entidades**, **serviços**, **rotas** e **controladores**.

## *index.js*

Ponto de entrada do servidor da aplicação. Inicia o servidor importando app.js.

## *app.js*

Arquivo central de configuração do servidor. Carrega as variáveis de ambiente, instância _Express_/_CORS_, importa o SupabaseClient e registra as rotas da aplicação.

```javascript
const caminho_usuario_router = require('./routes/usuarioRouter')
app.use('/usuarios', caminho_usuario_router)
```

Associa cada rota ao seu router.

## Routers

Definem as rotas da aplicação e mapeiam as URLs para as ações tratadas nos _controllers_.

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

Recebem e extraem os dados das requisições, centralizando a lógica de cada funcionalidade ao chamar os serviços correspondentes. Tratam erros e enviam a resposta HTTP adequada.

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

Responsáveis por interagir com o banco. Encapsulam a interação com o Supabase (incuindo as regras de negócio) e retornam os dados (ou feedbacks) de forma adequada aos controllers.

```javascript
class UsuarioService {
  static async create(user) {
    try {
      const usuario = new Usuario(user)

      const emailExistente = await getIfExists({
        tabela: 'usuarios',
        coluna: 'email',
        value: usuario.email,
        select: 'id',
      }).catch(() => null)
      if (emailExistente) {
        throw new Error('Já existe um usuário com este email.')
      }

      const salt = await bcrypt.genSalt(10)
      usuario.senha = await bcrypt.hash(usuario.senha, salt)

      const { data, error } = await supabase.from('usuarios').insert(usuario.toJSON()).single().select()
      if (error) {
        throw new Error(error.message)
      }
      return data
    } catch (error) {
      throw new Error(error.message)
    }
  }
```

### Models

Responsáveis por definir modelos de dados com regras e métodos de validação, como foco na criação ou atualização de entidades.

### Middleware

Contém funções que podem ser executadas entre a requisição e a resposta, como verificação de autenticação.

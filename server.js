require('dotenv').config();
const express = require('express');
const cors = require('cors');

// ROTAS
const userRouteV1 = require('./routes/rota_usuario');
const usuarioOrgRouteV1 = require('./routes/rota_usuario_organizacao');
const conexaoRouteV1 = require('./routes/rota_conexao');
const cupomRouteV1 = require('./routes/rota_cupom');
const favoritosRouteV1 = require('./routes/rota_favorito');
const eventosRouteV1 = require('./routes/rota_evento');
const notificacoesRouteV1 = require('./routes/rota_notificacao');

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/rest/v1', userRouteV1);
app.use('/rest/v1', usuarioOrgRouteV1);
app.use('/rest/v1', conexaoRouteV1);
app.use('/rest/v1', cupomRouteV1);
app.use('/rest/v1', favoritosRouteV1);
app.use('/rest/v1', eventosRouteV1);
app.use('/rest/v1', notificacoesRouteV1);

app.listen(port, () => {
    console.log(`✅ Servidor rodando na porta ${port}`);
});

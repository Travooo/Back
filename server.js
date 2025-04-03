require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouteV1 = require('./routes/rota_usuario');
const usuarioOrgRouteV1 = require('./routes/rota_usuario_organizacao');

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/rest/v1', userRouteV1);
app.use('/rest/v1', usuarioOrgRouteV1);

app.listen(port, () => {
    console.log(`✅ Servidor rodando na porta ${port}`);
});
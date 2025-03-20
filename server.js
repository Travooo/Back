require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouteV1 = require('./routes/rota-usuario');

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/rest/v1', userRouteV1);

app.listen(port, () => {
    console.log(`✅ Servidor rodando na porta ${port}`);
});

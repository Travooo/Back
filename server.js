require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouteV1 = require('./routes/routes');

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.use('/rest/v1', userRouteV1);

app.listen(port, () => {
    console.log(`✅ Servidor rodando na porta ${port}`);
});

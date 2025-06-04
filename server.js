require('dotenv').config();
const express = require('express');
const cors = require('cors');

const rotas = [
  require('./routes/rota_usuario'),
  require('./routes/rota_usuario_organizacao'),
  require('./routes/rota_conexao'),
  require('./routes/rota_cupom'),
  require('./routes/rota_favorito'),
  require('./routes/rota_evento'),
  require('./routes/rota_notificacao'),
  require('./routes/rota_servico'),
  require('./routes/rota_anexo'),
  require('./routes/agendamentoRouter'),
  require('./routes/avaliacaoRouter'),
  require('./routes/pagamentoRouter'),
  require('./routes/localVisitadoRouter'),
];

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

rotas.forEach(route => app.use('/rest/v1', route));

app.listen(port, () => {
  console.log(`✅ Servidor rodando na porta ${port}`);
});


module.exports = app; // Exporta o app para outros usos

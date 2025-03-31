const express = require("express");
require("dotenv").config();

const cors = require("cors");
const port = process.env.PORT || 3001;
const app = express();

// Supabase config:
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Importação das rotas
//const caminho_agendamento_router = require("./routes/agendamentoRouter");
//const caminho_anexo_router = require("./routes/anexoRouter");
//const caminho_avaliacao_router = require("./routes/avaliacaoRouter");
//const caminho_conexao_router = require("./routes/conexaoRouter");
//const caminho_cupom_router = require("./routes/cupomRouter");
//const caminho_estabelecimento_router = require("./routes/estabelecimentoRouter");
//const caminho_evento_router = require("./routes/eventoRouter");
//const caminho_favorito_router = require("./routes/favoritoRouter");
//const caminho_local_visitado_router = require("./routes/localVisitadoRouter");
//const caminho_pagamento_router = require("./routes/pagamentoRouter");
const caminho_usuario_router = require("./routes/usuarioRouter");
//const caminho_organizacao_router = require("./routes/organizacaoRouter");

// Middlewares:
app.use(cors());
app.use(express.json());
// Rota teste de conexão Supabase:
app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("usuario")
      .select("*")
      .limit(10);
    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Erro ao conectar ao Supabase", error });
  }
});

// Usar as rotas
//app.use("/agendamentos", caminho_agendamento_router);
//app.use("/anexos", caminho_anexo_router);
//app.use("/avaliacoes", caminho_avaliacao_router);
//app.use("/conexoes", caminho_conexao_router);
//app.use("/cupons", caminho_cupom_router);
////app.use("/estabelecimentos", caminho_estabelecimento_router);
//app.use("/eventos", caminho_evento_router);
//app.use("/favoritos", caminho_favorito_router);
//app.use("/locais_visitados", caminho_local_visitado_router);
//app.use("/organizacoes", caminho_organizacao_router);
//app.use("/pagamentos", caminho_pagamento_router);
app.use("/usuarios", caminho_usuario_router);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`);
  });
}

module.exports = app;

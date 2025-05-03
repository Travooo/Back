const express = require("express");
const cors = require("cors");
const supabase = require("./config/supabaseClient");

const app = express();
app.use(cors());
app.use(express.json());

// Rota teste de conexão Supabase:
app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .limit(10);
    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: "Erro ao conectar ao Supabase. ",
      error,
    });
  }
});

const rotas = [
  //["agendamentos", "agendamentoRouter"],
  //["anexos", "anexoRouter"],
  //["avaliacoes", "avaliacaoRouter"],
  //['conexoes', 'conexaoRouter'],
  //['cupons', 'cupomRouter'],
  //['eventos', 'eventoRouter'],
  //['favoritos', 'favoritoRouter'],
  //["locais_visitados", "localVisitadoRouter"],
  //["notificacoes", "notificacaoRouter"],
  //['pagamentos', 'pagamentoRouter'],
  //["servicos", "servicoRouter"],
  //["usuarios", "usuarioRouter"],
  //["usuarios_organizacao", "usuarioOrganizacaoRouter"],
];

rotas.forEach(([path, file]) => {
  const rota = require(`./routes/${file}`);
  app.use(`/${path}`, rota);
});

module.exports = app;

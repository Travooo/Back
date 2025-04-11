const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const { SUPABASE_URL, SUPABASE_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Variáveis de ambiente do Supabase estão faltando. Cheque seu .env.');
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Rota teste de conexão Supabase:
app.get('/test-supabase', async (req, res) => {
  try {
    const { data, error } = await supabase.from('usuario').select('*').limit(10);
    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao conectar ao Supabase. ', error });
  }
});

const rotas = [
  ['agendamentos', 'agendamentoRouter'],
  ['anexos', 'anexoRouter'],
  ['avaliacoes', 'avaliacaoRouter'],
  ['conexoes', 'conexaoRouter'],
  ['cupons', 'cupomRouter'],
  ['estabelecimentos', 'estabelecimentoRouter'],
  ['eventos', 'eventoRouter'],
  ['favoritos', 'favoritoRouter'],
  ['locais_visitados', 'localVisitadoRouter'],
  ['organizacoes', 'organizacaoRouter'],
  ['pagamentos', 'pagamentoRouter'],
  ['usuarios', 'usuarioRouter'],
];

rotas.forEach(([path, file]) => {
  const rota = require(`./routes/${file}`);
  app.use(`/${path}`, rota);
});

module.exports = app;

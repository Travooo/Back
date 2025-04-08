const { supabase } = require('../config/supabaseClient');

async function verificarExistenciaUsuario(usuario_id) {
  const { data, error } = await supabase.from('usuarios').select('id').eq('id', usuario_id).maybeSingle();
  if (error) throw new Error('Erro ao verificar usuário.');
  if (!data) throw new Error('Usuário não encontrado.');
}

async function verificarExistenciaEstabelecimento(estabelecimento_id) {
  const { data, error } = await supabase.from('estabelecimentos').select('id').eq('id', estabelecimento_id).maybeSingle();
  if (error) throw new Error('Erro ao verificar estabelecimento.');
  if (!data) throw new Error('Estabelecimento não encontrado.');
}

module.exports = { verificarExistenciaUsuario, verificarExistenciaEstabelecimento };

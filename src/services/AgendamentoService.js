require('dotenv').config();
const Agendamento = require('../models/Agendamento');
const { validateId, validateDetalhes, validateDate } = require('../utils/validators');
const { verificarExistenciaUsuario, verificarExistenciaEstabelecimento } = require('../utils/entityVerifiers');

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

class AgendamentoService {
  static async create(agendamento_data) {
    try {
      const agendamento = new Agendamento(agendamento_data.estabelecimento_id, agendamento_data.usuario_id, agendamento_data.horario, agendamento_data.detalhes);
      await verificarExistenciaUsuario(agendamento.usuario_id);
      await verificarExistenciaEstabelecimento(agendamento.estabelecimento_id);
      const { data, error } = await supabase
        .from('agendamentos')
        .insert({
          estabelecimento_id: agendamento.estabelecimento_id,
          usuario_id: agendamento.usuario_id,
          horario: agendamento.horario,
          detalhes: agendamento.detalhes,
        })
        .single()
        .select();
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async get_by_id(id) {
    const agendamentoId = validateId(id);
    const { data, error } = await supabase.from('agendamentos').select('*').eq('id', agendamentoId).single();
    if (error) return Error(error.message);
    return data;
  }

  static async get_all() {
    const { data, error } = await supabase.from('agendamentos').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id, updates) {
    const agendamentoId = validateId(id);
    if (!updates || typeof updates !== 'object') throw new Error('Atualizações inválidas ou não fornecidas.');
    const validados = {};
    if ('estabelecimento_id' in updates) {
      const idValido = validateId(updates.estabelecimento_id);
      await verificarExistenciaEstabelecimento(idValido);
      validados.estabelecimento_id = validateId(idValido);
    }
    if ('usuario_id' in updates) {
      const idValido = validateId(updates.usuario_id);
      await verificarExistenciaUsuario(idValido);
      validados.usuario_id = validateId(idValido);
    }
    if ('horario' in updates) validados.horario = validateDate(updates.horario, 'horario');
    if ('detalhes' in updates) validados.detalhes = validateDetalhes(updates.detalhes);
    if (Object.keys(validados).length === 0) throw new Error('Nenhuma alteração válida detectada.');
    if ('horario' in updates) {
      const validado = validateDate(updates.horario, 'horario');
      console.log('Horario validado:', validado);
      validados.horario = validado;
    }
    const { data, error } = await supabase.from('agendamentos').update(validados).eq('id', agendamentoId).select();
    if (error) return Error(error.message);
    if (!data || data.length === 0) throw new Error('Usuário não encontrado ou não atualizado.');
    return data;
  }

  static async delete(id) {
    const agendamentoId = validateId(id);
    const { data, error } = await supabase.from('agendamentos').delete().eq('id', agendamentoId);
    if (error) return Error(error.message);
    return data;
  }
}

module.exports = AgendamentoService;

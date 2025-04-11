require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');
const validator = require('validator');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const LocalVisitado = require('../models/LocalVisitado');

class LocalVisitadoService {
  static async create(user_data) {
    try {
      const localVisitado = new Usuario(user_data.estabelecimento_id, user_data.usuario_id, user_data.data_visita);
      const { data, error } = await supabase
        .from('locais_visitados')
        .insert({
          estabelecimento_id: localVisitado.estabelecimento_id,
          usuario_id: localVisitado.usuario_id,
          data_visita: localVisitado.data_visita,
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
    const { data, error } = await supabase.from('locais_visitados').select('*').eq('id', id).single();
    if (error) return Error(error.message);
    return data;
  }

  static async get_all() {
    const { data, error } = await supabase.from('locais_visitados').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  static async update(id, updates) {
    // Hash da senha antes da inserção:
    if (updates.data_visita) {
      const salt = await bcrypt.genSalt(10);
      updates.senha = await bcrypt.hash(updates.senha, salt);
    }

    // Filtrar apenas os campos válidos, removendo valores nulos ou vazios:
    // Caso não seja implementada a verificação no front:
    const validUpdates = Object.fromEntries(Object.entries(updates).filter(([_, value]) => value && value.toString().trim() !== ''));
    if (Object.keys(validUpdates).length === 0) {
      throw new Error('Nenhuma alteração válida detectada.');
    }
    const { data, error } = await supabase.from('usuarios').update(validUpdates).eq('id', id).select();
    if (error) return Error(error.message);
    if (!data || data.length === 0) throw new Error('Usuário não encontrado ou não atualizado.');
    return data;
  }

  static async delete(id) {
    const { data, error } = await supabase.from('usuarios').delete().eq('id', id);
    if (error) return Error(error.message);
    return data;
  }
}

module.exports = UsuarioService;

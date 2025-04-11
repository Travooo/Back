require('dotenv').config();
const Pagamento = require('../../../models/Pagamento');
const validator = require('validator');
const {
  validateId,
  validateValor,
  validateMetodoPagamento,
  validateStatus,
  getIfExists,
} = require('../../../utils/validators');

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

class PagamentoService {
  static async create(pagamento_data) {
    try {
      const pagamento = new Pagamento(
        pagamento_data.valor,
        pagamento_data.metodo_pagamento,
        pagamento_data.status,
        pagamento_data.usuario_id
      );
      await getIfExists({ tabela: 'usuarios', coluna: 'id', valor: pagamento.usuario_id });
      const { data, error } = await supabase
        .from('pagamentos')
        .insert({
          valor: pagamento.valor,
          metodo_pagamento: pagamento.metodo_pagamento,
          status: pagamento.status,
          usuario_id: pagamento.usuario_id,
        })
        .single()
        .select();
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getById(id) {
    return await getIfExists({ tabela: 'pagamentos', valor: id });
  }

  static async getStatus(id) {
    return await getIfExists({ tabela: 'pagamentos', valor: id, select: 'status' });
  }

  static async getAll() {
    const { data, error } = await supabase.from('pagamentos').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  static async update_status(id, novoStatus) {
    const statusPermitidos = ['pendente', 'pago', 'cancelado', 'estornado'];
    if (!statusPermitidos.includes(novoStatus)) {
      throw new Error('Status inválido.');
    }
    const { data, error } = await supabase
      .from('pagamentos')
      .update({ status: novoStatus })
      .eq('id', id)
      .select('status')
      .single();
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) {
      throw new Error('Pagamento não encontrado ou não atualizado.');
    }
    return data;
  }

  static async update(id, updates) {
    const pagamentoId = validateId(id);
    if (!updates || typeof updates !== 'object') throw new Error('Atualizações inválidas ou não fornecidas.');
    const validados = {};
    if ('valor' in updates) validados.valor = validateValor(updates.valor);
    if ('metodo_pagamento' in updates) validados.metodo_pagamento = validateMetodoPagamento(updates.metodo_pagamento);
    if ('status' in updates) validados.status = validateStatus(updates.status);
    if (Object.keys(validados).length === 0) throw new Error('Nenhuma alteração válida detectada.');
    const { data, error } = await supabase.from('pagamentos').update(validados).eq('id', pagamentoId).select();
    if (error) return Error(error.message);
    if (!data || data.length === 0) throw new Error('Pagamento não encontrado ou não atualizado.');
    return data;
  }
}

module.exports = PagamentoService;

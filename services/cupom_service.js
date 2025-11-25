const supabase = require('../config/db');
function gerarCodigoCupom() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

class CupomService {
    
    static async createCupom(data) {
        if (data.created_at === undefined || data.created_at === null) {
            delete data.created_at;
        }
        const { error, data: result } = await supabase.from('cupons').insert([data]).select();
        if (error) throw error;
        return result[0];
    }

    static async getCupomById(id) {
        const { error, data } = await supabase.from('cupons').select("*").eq('id', id).single();
        if (error) throw error;
        return data;
    }

    static async getAllCuponsClient() {
        const { error, data } = await supabase.from('cupom_cliente').select('*');
        if (error) throw error;
        return data;
    }

    static async getAllCupons() {
        const { error, data } = await supabase.from('cupons').select('*');
        if (error) throw error;
        return data;
    }

    static async updateCupom(id, updates) {
        const { error } = await supabase.from('cupons').update(updates).eq('id', id);
        if (error) throw error;
        return { message: 'Cupom atualizado com sucesso' };
    }

    static async deleteCupom(id) {
        const { error } = await supabase.from('cupons').delete().eq('id', id);
        if (error) throw error;
        return { message: 'Cupom removido com sucesso' };
    }
    static async getCuponsByOrganizacao(organizacaoId) {
        const { data: estabelecimentos, error: estError } = await supabase
            .from('servicos')
            .select('id')
            .eq('usuario_organizacao_id', organizacaoId);
        if (estError) throw estError;
        if (!estabelecimentos || estabelecimentos.length === 0) return [];

        const ids = estabelecimentos.map(e => e.id);

        const { data, error } = await supabase
            .from('cupons')
            .select('*')
            .in('estabelecimento_id', ids);

        if (error) throw error;
        return data ?? [];
    }
  static async claimCupomForUser(cupomId, usuarioId) {
    const { data: cupom, error: cupomError } = await supabase
        .from('cupons')
        .select('*')
        .eq('id', cupomId)
        .single();

    if (cupomError || !cupom) {
        throw new Error('Cupom não encontrado.');
    }

    if (cupom.expiration) {
        const exp = new Date(cupom.expiration);
        if (!isNaN(exp) && exp < new Date()) {
            throw new Error('Cupom expirado.');
        }
    }

    const { data: existentes, error: buscaError } = await supabase
        .from('cupom_cliente')
        .select('*')
        .eq('cupom_id', cupomId)
        .eq('usuario_id', usuarioId)
        .limit(1);

    if (buscaError) throw buscaError;

    const existente = existentes && existentes[0];

    if (existente) {
        if (existente.status_ativo) {
            return existente;
        } else {
            throw new Error('Você já utilizou este cupom e não pode usá-lo novamente.');
        }
    }

    const codigo = gerarCodigoCupom();

    const { data, error } = await supabase
        .from('cupom_cliente')
        .insert({
            cupom_id: cupomId,
            usuario_id: usuarioId,
            codigo: codigo,
            status_ativo: true,
            resgatado: null
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}


static async validarCupomPorCodigo(codigo, organizacaoId) {
    const { data: registros, error: buscaError } = await supabase
        .from('cupom_cliente')
        .select('*')
        .eq('codigo', codigo)
        .eq('status_ativo', true)
        .limit(1);

    if (buscaError) throw buscaError;

    const cupomCliente = registros && registros[0];
    if (!cupomCliente) {
        throw new Error('Cupom inválido ou já utilizado.');
    }

    const { data: cupom, error: cupomError } = await supabase
        .from('cupons')
        .select('*')
        .eq('id', cupomCliente.cupom_id)
        .single();

    if (cupomError || !cupom) {
        throw new Error('Cupom não encontrado.');
    }

    const { data: servico, error: servError } = await supabase
        .from('servicos')
        .select('usuario_organizacao_id')
        .eq('id', cupom.estabelecimento_id)
        .single();

    if (servError || !servico) {
        throw new Error('Estabelecimento não encontrado para este cupom.');
    }

    if (servico.usuario_organizacao_id !== organizacaoId) {
        throw new Error('Este cupom não pertence a este estabelecimento.');
    }

    if (cupom.expiration) {
        const exp = new Date(cupom.expiration);
        if (!isNaN(exp) && exp < new Date()) {
            throw new Error('Cupom expirado.');
        }
    }

    const { data: atualizado, error: updateError } = await supabase
        .from('cupom_cliente')
        .update({
            status_ativo: false,
            resgatado_em: new Date().toISOString()
        })
        .eq('id', cupomCliente.id)
        .select()
        .single();

    if (updateError) throw updateError;

    return {
        cupom,
        cupomCliente: atualizado
    };
}



}
module.exports = CupomService;
const supabase = require('../config/db');

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


}
module.exports = CupomService;
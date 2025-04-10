const Cupom = require('../model/Cupom');
const supabase = require('../config/db');

class CupomService {
    static async createCupom(data) {
        if (data.created_at === undefined || data.created_at === null) {
            delete data.created_at;
        }
        const { error, data: result } = await supabase.from('cupons').insert([data]);
        if (error) throw error;
        return result;
    }

    static async getCupomById(id) {
        const { error, data } = await supabase.from('cupons').select("*").eq('id', id).single();
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
}
module.exports = CupomService;
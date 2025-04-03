const Cupom = require('../model/Cupom');
const supabase = require('../config/db');

class CupomService {
    static async criar(cupom) {
        const { data, error } = await supabase
            .from('cupom')
            .insert([{ 
                id_estabelecimento: cupom.id_estabelecimento,
                id_usuario: cupom.id_usuario,
                descricao: cupom.descricao
            }])
            .select();
        if (error) throw error;
        return data;
    }

    static async buscarPorId(id) {
        const { data, error } = await supabase
            .from('cupom')
            .select()
            .eq('id_cupom', id)
            .single();
        if (error) throw error;
        return data;
    }

    static async listarTodos() {
        const { data, error } = await supabase.from('cupom').select();
        if (error) throw error;
        return data;
    }

    static async atualizar(id, cupom) {
        const { data, error } = await supabase
            .from('cupom')
            .update({
                id_estabelecimento: cupom.id_estabelecimento,
                id_usuario: cupom.id_usuario,
                descricao: cupom.descricao
            })
            .eq('id_cupom', id)
            .select();
        if (error) throw error;
        return data;
    }

    static async deletar(id) {
        const { error } = await supabase.from('cupom').delete().eq('id_cupom', id);
        if (error) throw error;
        return { message: 'Cupom removido com sucesso.' };
    }
}

module.exports = CupomService;
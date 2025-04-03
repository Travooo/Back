const Avaliacao = require('../model/Avaliacao');
const supabase = require('../config/db');

class AvaliacaoService {
    static async criar(avaliacao) {
        const { data, error } = await supabase
            .from('avaliacao')
            .insert([{ 
                id_estabelecimento: avaliacao.id_estabelecimento,
                id_usuario: avaliacao.id_usuario,
                comentario: avaliacao.comentario,
                numero_estrelas: avaliacao.numero_estrelas
            }])
            .select();
        if (error) throw error;
        return data;
    }

    static async buscarPorId(id) {
        const { data, error } = await supabase
            .from('avaliacao')
            .select()
            .eq('id_avaliacao', id)
            .single();
        if (error) throw error;
        return data;
    }

    static async listarTodos() {
        const { data, error } = await supabase.from('avaliacao').select();
        if (error) throw error;
        return data;
    }

    static async atualizar(id, avaliacao) {
        const { data, error } = await supabase
            .from('avaliacao')
            .update({
                id_estabelecimento: avaliacao.id_estabelecimento,
                id_usuario: avaliacao.id_usuario,
                comentario: avaliacao.comentario,
                numero_estrelas: avaliacao.numero_estrelas
            })
            .eq('id_avaliacao', id)
            .select();
        if (error) throw error;
        return data;
    }

    static async deletar(id) {
        const { error } = await supabase.from('avaliacao').delete().eq('id_avaliacao', id);
        if (error) throw error;
        return { message: 'Avaliação removida com sucesso.' };
    }
}

module.exports = AvaliacaoService;
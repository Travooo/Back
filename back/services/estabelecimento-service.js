const supabase = require('../config/supabaseClient');

class EstabelecimentoService {
    static async criar(estabelecimento) {
        const { data, error } = await supabase
            .from('estabelecimento')
            .insert([{ 
                nome: estabelecimento.nome,
                sobre: estabelecimento.sobre,
                endereco: estabelecimento.endereco,
                foto_local: estabelecimento.foto_local,
                horarios: estabelecimento.horarios
            }])
            .select();
        if (error) throw error;
        return data;
    }

    static async buscarPorId(id) {
        const { data, error } = await supabase
            .from('estabelecimento')
            .select()
            .eq('id_estabelecimento', id)
            .single();
        if (error) throw error;
        return data;
    }

    static async listarTodos() {
        const { data, error } = await supabase.from('estabelecimento').select();
        if (error) throw error;
        return data;
    }

    static async atualizar(id, estabelecimento) {
        const { data, error } = await supabase
            .from('estabelecimento')
            .update({
                nome: estabelecimento.nome,
                sobre: estabelecimento.sobre,
                endereco: estabelecimento.endereco,
                foto_local: estabelecimento.foto_local,
                horarios: estabelecimento.horarios
            })
            .eq('id_estabelecimento', id)
            .select();
        if (error) throw error;
        return data;
    }

    static async deletar(id) {
        const { error } = await supabase.from('estabelecimento').delete().eq('id_estabelecimento', id);
        if (error) throw error;
        return { message: 'Estabelecimento removido com sucesso.' };
    }
}

module.exports = EstabelecimentoService;
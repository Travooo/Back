const supabase = require('../config/supabaseClient');

class ConexaoService {
    static async criar(conexao) {
        const { data, error } = await supabase
            .from('conexao')
            .insert([{ 
                id_usuario1: conexao.id_usuario1,
                id_usuario2: conexao.id_usuario2,
                data_conexao: conexao.data_conexao
            }])
            .select();
        if (error) throw error;
        return data;
    }

    static async buscarPorId(id) {
        const { data, error } = await supabase
            .from('conexao')
            .select()
            .eq('id_conexao', id)
            .single();
        if (error) throw error;
        return data;
    }

    static async listarTodos() {
        const { data, error } = await supabase.from('conexao').select();
        if (error) throw error;
        return data;
    }

    static async atualizar(id, conexao) {
        const { data, error } = await supabase
            .from('conexao')
            .update({
                id_usuario1: conexao.id_usuario1,
                id_usuario2: conexao.id_usuario2,
                data_conexao: conexao.data_conexao
            })
            .eq('id_conexao', id)
            .select();
        if (error) throw error;
        return data;
    }

    static async deletar(id) {
        const { error } = await supabase.from('conexao').delete().eq('id_conexao', id);
        if (error) throw error;
        return { message: 'Conexão removida com sucesso.' };
    }
}

module.exports = ConexaoService;
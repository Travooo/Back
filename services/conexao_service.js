const Conexao = require('../model/Conexao');
const supabase = require('../config/db');

class ConexaoService {
    static async createConexao(data) {
        if (data.data_conexao === undefined || data.data_conexao === null) {
            delete data.data_conexao;
        }
        const { error, data: result } = await supabase.from('conexoes').insert([data]);
        if (error) throw error;
        return result;
    }

    static async getConexaoById(id) {
        const { error, data } = await supabase.from('conexoes').select("*").eq('id', id).single();
        if (error) throw error;
        return data;
    }

    static async getAllConexao() {
        const { error, data } = await supabase.from('conexoes').select('*');
        if (error) throw error;
        return data;
    }

    static async updateConexao(id, updates) {
        const { error } = await supabase.from('conexoes').update(updates).eq('id', id);
        if (error) throw error;
        return { message: 'Conexão atualizada com sucesso' };
    }

    static async deleteConexao(id) {
        const { error } = await supabase.from('conexoes').delete().eq('id', id);
        if (error) throw error;
        return { message: 'Conexão removida com sucesso' };
    }
}

module.exports = ConexaoService;

const supabase = require('../config/supabaseClient');

class AnexoService {
    static async criarAnexo(estabelecimento, arquivo, nome_arquivo, tipo_arquivo) {
        const { data, error } = await supabase
            .from('anexo')
            .insert([{ estabelecimento, arquivo, nome_arquivo, tipo_arquivo }])
            .select();
        return { data, error };
    }

    static async buscarAnexoPorId(id_anexo) {
        const { data, error } = await supabase
            .from('anexo')
            .select('*')
            .eq('id_anexo', id_anexo)
            .single();
        return { data, error };
    }

    static async listarAnexos() {
        const { data, error } = await supabase
            .from('anexo')
            .select('*');
        return { data, error };
    }
}

module.exports = AnexoService;
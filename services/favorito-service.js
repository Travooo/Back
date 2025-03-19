const Favorito = require('../model/Favorito');
const supabase = require('../config/db');

class FavoritoService {
    static async criar(favorito) {
        const { data, error } = await supabase
            .from('favorito')
            .insert([{ 
                id_usuario: favorito.id_usuario,
                id_estabelecimento: favorito.id_estabelecimento
            }])
            .select();
        if (error) throw error;
        return data;
    }

    static async buscarPorId(id) {
        const { data, error } = await supabase
            .from('favorito')
            .select()
            .eq('id_favorito', id)
            .single();
        if (error) throw error;
        return data;
    }

    static async listarTodos() {
        const { data, error } = await supabase.from('favorito').select();
        if (error) throw error;
        return data;
    }

    static async deletar(id) {
        const { error } = await supabase.from('favorito').delete().eq('id_favorito', id);
        if (error) throw error;
        return { message: 'Favorito removido com sucesso.' };
    }
}

module.exports = FavoritoService;
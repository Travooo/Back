const Favorito = require('../model/Favorito');
const supabase = require('../config/db');

class FavoritoService {
    static async createFavorito(data) {
        const { error, data: result } = await supabase.from('favoritos').insert([data]);
        if (error) throw error;
        return result;
    }

    static async getFavoritoById(id) {
        const { error, data } = await supabase.from('favoritos').select("*").eq('id', id).single();
        if (error) throw error;
        return data;
    }

    static async getAllFavoritos() {
        const { error, data } = await supabase.from('favoritos').select('*');
        if (error) throw error;
        return data;
    }

    static async updateFavorito(id, updates) {
        const { error } = await supabase.from('favoritos').update(updates).eq('id', id);
        if (error) throw error;
        return { message: 'Favorito atualizado com sucesso' };
    }

    static async deleteFavorito(id) {
        const { error } = await supabase.from('favoritos').delete().eq('id', id);
        if (error) throw error;
        return { message: 'Favorito removido com sucesso' };
    }
}

module.exports = FavoritoService;

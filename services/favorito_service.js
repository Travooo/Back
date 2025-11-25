const Favorito = require('../model/Favorito');
const supabase = require('../config/db');

class FavoritoService {
    static async createFavorito(data) {
        if (data.created_at === undefined || data.created_at === null) {
            delete data.created_at;
        }
        const { error, data: result } = await supabase.from('favoritos').insert([data]);
        if (error) throw error;
        return result;
    }

    static async getFavoritoById(id) {
        const { error, data } = await supabase.from('favoritos').select("*").eq('id', id).single();
        if (error) throw error;
        return data;
    }

    /**
     * Busca todos os favoritos de um usuário específico e retorna os serviços relacionados
     * Faz join com a tabela servicos para retornar os dados completos
     */
    static async getFavoritosByUsuarioId(usuarioId) {
        // Primeiro busca os favoritos do usuário
        const { error: favoritosError, data: favoritos } = await supabase
            .from('favoritos')
            .select('estabelecimento_id')
            .eq('usuario_id', usuarioId);
        
        if (favoritosError) throw favoritosError;
        
        if (!favoritos || favoritos.length === 0) {
            return [];
        }

        // Extrai os IDs dos serviços
        const servicoIds = favoritos.map(f => f.estabelecimento_id);
        
        // Busca os serviços correspondentes
        const { error: servicosError, data: servicos } = await supabase
            .from('servicos')
            .select('id, nome, endereco')
            .in('id', servicoIds);
        
        if (servicosError) throw servicosError;
        
        // Adiciona imagem_capa_url como null por enquanto (pode vir de anexos depois)
        return servicos.map(servico => ({
            ...servico,
            imagem_capa_url: null
        }));
    }

    /**
     * Verifica se um favorito já existe para o usuário e serviço
     */
    static async favoritoExiste(usuarioId, estabelecimentoId) {
        const { error, data } = await supabase
            .from('favoritos')
            .select('id')
            .eq('usuario_id', usuarioId)
            .eq('estabelecimento_id', estabelecimentoId)
            .maybeSingle();
        
        if (error) throw error;
        return data !== null;
    }

    /**
     * Cria um favorito para o usuário e serviço especificados
     */
    static async criarFavorito(usuarioId, estabelecimentoId) {
        const data = {
            usuario_id: usuarioId,
            estabelecimento_id: estabelecimentoId
        };
        
        const { error, data: result } = await supabase
            .from('favoritos')
            .insert([data])
            .select()
            .single();
        
        if (error) throw error;
        return result;
    }

    /**
     * Remove um favorito pelo usuario_id e estabelecimento_id
     */
    static async removerFavorito(usuarioId, estabelecimentoId) {
        const { error, data } = await supabase
            .from('favoritos')
            .delete()
            .eq('usuario_id', usuarioId)
            .eq('estabelecimento_id', estabelecimentoId)
            .select();
        
        if (error) throw error;
        return data && data.length > 0;
    }

    // Métodos antigos mantidos para compatibilidade (se necessário)
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

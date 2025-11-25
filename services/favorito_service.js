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
     * Baseado no schema: favoritos (usuario_id, estabelecimento_id) -> servicos (id)
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
        
        // Busca os serviços correspondentes com todos os campos do schema
        // Schema servicos: id, usuario_organizacao_id, nome, sobre, cep, horarios, created_at, tipo, lat, lng, endereco
        const { error: servicosError, data: servicos } = await supabase
            .from('servicos')
            .select('id, nome, endereco, tipo, lat, lng')
            .in('id', servicoIds);
        
        if (servicosError) throw servicosError;
        
        // Para cada serviço, busca avaliações e imagem de capa
        const servicosCompletos = await Promise.all(
            servicos.map(async (servico) => {
                // Busca avaliações do serviço (tabela: avaliacoes, campo: numero_estrelas)
                const { data: avaliacoes } = await supabase
                    .from('avaliacoes')
                    .select('numero_estrelas')
                    .eq('servico_id', servico.id);
                
                const totalAvaliacoes = avaliacoes?.length || 0;
                const mediaAvaliacao = totalAvaliacoes > 0
                    ? avaliacoes.reduce((sum, a) => sum + (a.numero_estrelas || 0), 0) / totalAvaliacoes
                    : null;
                
                // Busca imagem de capa da galeria de anexos
                // entidade_tipo = 'servicos', entidade_id = servico.id, path contém 'servicos/galeria'
                const { data: anexos } = await supabase
                    .from('anexos')
                    .select('url_publica')
                    .eq('entidade_id', servico.id)
                    .eq('entidade_tipo', 'servicos')
                    .like('path', 'servicos/galeria%')
                    .limit(1)
                    .single();
                
                const imagemCapaUrl = anexos?.url_publica || null;
                
                return {
                    ...servico,
                    imagem_capa_url: imagemCapaUrl,
                    media_avaliacao: mediaAvaliacao ? Number(mediaAvaliacao.toFixed(2)) : null,
                    total_avaliacoes: totalAvaliacoes
                };
            })
        );
        
        return servicosCompletos;
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

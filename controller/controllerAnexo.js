  const path = require('path');

  const Anexo = require("../model/Anexo");
  const AnexoService = require("../services/anexo_service");
  const UsuarioService = require("../services/usuario_service");
  const ServicoService = require("../services/servico_service");
  const UsuarioOrganizacaoService = require("../services/usuarioOrganizacao_service");
  

  class controllerAnexo {
    static async validarEntidade(entidade_id, entidade_tipo) {
      if (entidade_tipo.includes('usuarios')) return await UsuarioService.getUsuarioById(Number(entidade_id));
      if (entidade_tipo.includes('servicos')) return await ServicoService.getById(Number(entidade_id));
      if (entidade_tipo.includes('organizacoes')) return await UsuarioOrganizacaoService.getUsuarioOrgById(Number(entidade_id));
      throw new Error(`Tipo de entidade não reconhecido no path: ${entidade_tipo}`);
    }

    static async upload(req, res) {
      try {
        const file = req.file
        const { entidade_tipo, folder, entidade_id } = req.body
        
        if (!file || !file.buffer) return res.status(400).json({ error: 'Nenhum arquivo enviado ou arquivo inválido.' });
        if ( !entidade_tipo || !folder || !entidade_id) return res.status(400).json({ error: 'Parâmetros obrigatórios não recebidos.' });
        
        await controllerAnexo.validarEntidade(entidade_id, entidade_tipo);

        const ext = path.extname(file.originalname);
        const nome_arquivo = path.basename(file.originalname, ext);
        const path = `${entidade_tipo}/${folder}/${nome_arquivo}`;
        
        const anexo = Anexo.validateBySchema({ entidade_id: Number(entidade_id), entidade_tipo, nome_arquivo, path, mimetype: file.mimetype, tamanho: file.size })

        const upload = await AnexoService.upload(file, anexo)
        return res.status(200).json(upload)
      } catch (error) {
        console.error('Erro no upload do anexo:', error.message)
        return res.status(500).json({ error: error.message })
      }
    }

    static async getById(req, res) {
      try {
        const { anexo_id } = req.params;
        if (!anexo_id) return res.status(400).json({ error: 'Parâmetros obrigatórios não recebidos.' });
        
        const anexo = await AnexoService.getById(Number(anexo_id));
        return res.status(200).json(anexo);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }

    static async getGaleria(req, res) {
      try {
        const { entidade_tipo, entidade_id } = req.params;
        if ( !entidade_tipo || !entidade_id) return res.status(400).json({ error: 'Parâmetros obrigatórios não recebidos.' });

        const entidadeValida = await this.validarEntidade(entidade_id, entidade_tipo);
        if (!entidadeValida) return res.status(404).json({ error: `Entidade ${entidade_tipo} não encontrada.` });
        
        const galeria = await AnexoService.getGaleria(Number(entidade_id), `${entidade_tipo}/galeria`);
        return res.status(200).json(galeria);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }

    static async getProfilePic(req, res) {
      try {
        const { entidade_tipo, entidade_id } = req.params;
        if ( !entidade_id || !entidade_tipo) return res.status(400).json({ error: 'Parâmetros obrigatórios não recebidos.' });
      
        const entidadeValida = await this.validarEntidade(entidade_id, entidade_tipo);
        if (!entidadeValida) return res.status(404).json({ error: `Entidade ${entidade_tipo} não encontrada.` });
  
        const profilePic = await AnexoService.getProfilePic(Number(entidade_id), `${entidade_tipo}/perfil`);
        return res.status(200).json(profilePic);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }

    static async setProfilePic(req, res) {
      try {
        const file = req.file;
        const { entidade_tipo, entidade_id } = req.params;

        if (!file || !file.buffer) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
        if ( !entidade_id || !entidade_tipo) return res.status(400).json({ error: 'Parâmetros obrigatórios não recebidos.' });

        const profilePic = await AnexoService.getProfilePic(Number(entidade_id), `${entidade_tipo}/perfil`);
        if (profilePic) await AnexoService.deleteByPath(profilePic.path);

        const ext = path.extname(file.originalname);
        const nome_arquivo = path.basename(file.originalname, ext);
        const path = `${entidade_tipo}/perfil/${nome_arquivo}`;

        const anexo = Anexo.validateBySchema({ entidade_id: Number(entidade_id), entidade_tipo, nome_arquivo, path, mimetype: file.mimetype, tamanho: file.size });

        const uploaded = await AnexoService.upload(file, anexo);
        return res.status(200).json(uploaded);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }

    static async deleteById(req, res) {
      try {
        const { anexo_id } = req.params;

        const anexo = await AnexoService.getById(Number(anexo_id));
        if (!anexo) return res.status(404).json({ error: 'Anexo não encontrado.' });

        const deleted = await AnexoService.deleteById(Number(anexo_id));
        return res.status(200).json(deleted);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  }


  module.exports = controllerAnexo;


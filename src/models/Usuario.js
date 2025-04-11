const { validateNomeUsuario, validateNomeCompleto, validateFotoPerfilBase64, validateEmail, validateSenha, validateSobre, validateAdmin, validatePlano, validateDate } = require('../utils/validators');

class Usuario {
  constructor(email, senha, nome_usuario, nome_completo, foto_perfil = null, sobre = null, data_nascimento, admin, tipo_plano) {
    this.email = validateEmail(email);
    this.senha = validateSenha(senha);
    this.nome_usuario = validateNomeUsuario(nome_usuario);
    this.nome_completo = validateNomeCompleto(nome_completo);
    if (foto_perfil !== null && foto_perfil !== undefined) {
      this.foto_perfil = validateFotoPerfilBase64(foto_perfil);
    }
    if (sobre !== null && sobre !== undefined) {
      this.sobre = validateSobre(sobre);
    }
    this.data_nascimento = validateDate(data_nascimento);
    this.admin = validateAdmin(admin);
    this.tipo_plano = validatePlano(tipo_plano);
  }
}

module.exports = Usuario;

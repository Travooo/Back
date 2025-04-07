const { validateNomeUsuario, validateNomeCompleto, validateFotoPerfilBase64, validateEmail, validateSenha, validateSobre, tryParseBoolean, tryParseInt, tryParseDate } = require('../utilities/parseSafe');

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
    this.data_nascimento = tryParseDate(data_nascimento);
    this.admin = tryParseBoolean(admin);
    this.tipo_plano = tryParseInt(tipo_plano);
  }
}

module.exports = Usuario;

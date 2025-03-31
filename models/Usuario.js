class Usuario {
  constructor(
    email,
    senha,
    // Necessário implementar hashing da senha antes do armazenamento.
    nome_usuario,
    nome_completo,
    foto_perfil = null,
    sobre = null,
    data_nascimento,
    // Validar se por padrão "admin" será false.
    admin = false,
    tipo_plano = 1
    // Atribui o valor "1" (plano gratuito/usuário comum) a "tipo_plano".
  ) {
    if (
      !email ||
      !senha ||
      !nome_usuario ||
      !nome_completo ||
      !data_nascimento
    ) {
      throw new Error("Campos obrigatorios ausentes.");
    }
    if (!this.validarEmail(email)) {
      throw new Error("Email invalido.");
    }
    if (senha.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }
    this.email = email;
    this.senha = senha;
    this.nome_usuario = nome_usuario;
    this.nome_completo = nome_completo;
    this.foto_perfil = foto_perfil;
    this.sobre = sobre;
    this.data_nascimento = data_nascimento;
    this.admin = admin;
    this.tipo_plano = tipo_plano;
  }
  validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
    // A regex está boa mas não cobre casos mais específicos.
    // Para um sistema mais robusto, há bibliotecas como Validator.
  }
}

module.exports = Usuario;

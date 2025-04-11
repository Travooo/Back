const { validateString, validateFoto, validateDate, validateOption } = require('../utils/validators')

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const regexSenha = /^[a-zA-Z0-9!@#\$%\^&\*\)\(+=._-]+$/
const regexNomeUsuario = /^[a-zA-Z0-9_]+$/
const regexNomeCompleto = /^[A-Za-zÀ-ÿ\s]+$/

class Usuario {
  static #schema = {
    // #: Privado
    email: {
      tipo: 'string',
      required: true,
      atributo: 'email',
      formato: regexEmail,
      erro: 'Formato de email inválido.',
    },
    senha: {
      tipo: 'string',
      required: true,
      atributo: 'senha',
      min: 6,
      max: 20,
      formato: regexSenha,
      erro: 'A senha deve conter apenas letras, números ou caracteres especiais permitidos.',
    },
    nome_usuario: {
      tipo: 'string',
      required: true,
      atributo: 'nome_usuario',
      min: 4,
      max: 30,
      formato: regexNomeUsuario,
      erro: 'O nome de usuário pode conter apenas letras, números ou underline.',
    },
    nome_completo: {
      tipo: 'string',
      required: true,
      atributo: 'nome_completo',
      min: 3,
      max: 60,
      formato: regexNomeCompleto,
      erro: 'O nome completo deve conter apenas letras e espaços.',
    },
    sobre: {
      tipo: 'string',
      atributo: 'sobre',
      min: 10,
      max: 300,
    },
    admin: {
      tipo: 'option',
      atributo: 'admin',
    },
    tipo_plano: {
      tipo: 'option',
      atributo: 'tipo_plano',
    },
    data_nascimento: {
      tipo: 'date',
      atributo: 'data_nascimento',
    },
    foto_perfil: {
      tipo: 'foto',
      atributo: 'foto_perfil',
    },
  }
  constructor(data = {}) {
    for (const key in Usuario.#schema) {
      const rule = Usuario.#schema[key]
      const valor = data[key]
      if (valor === undefined || valor === null || valor === '') {
        if (rule.required) {
          throw new Error(`Atributo obrigatório '${key}' ausente.`)
        }
        this[key] = null
      } else {
        this[key] = Usuario.#validate(valor, key)
      }
    }
  }

  static #validate(value, key) {
    const rule = this.#schema[key]
    if (!rule) return null

    const { tipo, atributo = key, erro, ...rest } = rule

    switch (tipo) {
      case 'string':
        return validateString(value, { atributo, erro_formato: erro, ...rest })
      case 'option':
        return validateOption(value, atributo)
      case 'date':
        return validateDate(value, atributo)
      case 'foto':
        return validateFoto(value)
      default:
        throw new Error(`Tipo de validação '${tipo}' não reconhecido para '${key}'`)
    }
  }
  // Método auxiliar (pode ser exportado para update/create)
  static validateBySchema(data = {}) {
    const validados = {}
    for (const key in data) {
      if (key in this.#schema) {
        validados[key] = this.#validate(data[key], key)
      }
    }
    return validados
  }
  static getValidKeys() {
    return Object.keys(this.#schema)
  }
  toJSON() {
    const json = {}
    for (const key of Usuario.getValidKeys()) {
      json[key] = this[key]
    }
    return json
  }
}

module.exports = Usuario

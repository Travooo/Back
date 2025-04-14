const { validateString, validateFoto, validateNumber } = require('../utils/validators')

const regexNome = /^[\p{L}0-9 _\-.',&()@]+$/u

class Estabelecimento {
  static #schema = {
    // #: Privado
    usuario_organizacao_id: {
      tipo: 'number',
      required: true,
      atributo: 'usuario_organizacao_id',
    },
    nome: {
      tipo: 'string',
      required: true,
      atributo: 'nome',
      min: 4,
      max: 30,
      formato: regexNome,
      erro: 'O nome do estabelecimento pode conter apenas letras, números e underline.',
    },
    sobre: {
      tipo: 'string',
      required: true,
      atributo: 'sobre',
      min: 10,
      max: 300,
    },
    endereco: {
      tipo: 'string',
      required: true,
      atributo: 'sobre',
      min: 10,
      max: 150,
    },
    horarios: {
      tipo: 'string',
      required: true,
      atributo: 'horarios',
      min: 10,
      max: 100,
    },
    foto: {
      tipo: 'foto',
      required: true,
      atributo: 'foto_perfil',
    },
    tipo: {
      tipo: 'string',
      required: true,
      atributo: 'tipo',
      min: 1,
      max: 20,
    },
  }
  constructor(data = {}) {
    for (const key in Estabelecimento.#schema) {
      const rule = Estabelecimento.#schema[key]
      const valor = data[key]
      if (valor === undefined || valor === null || valor === '') {
        if (rule.required) {
          throw new Error(`Atributo obrigatório '${key}' ausente.`)
        }
        this[key] = null
      } else {
        this[key] = Estabelecimento.#validate(valor, key)
      }
    }
  }

  static #validate(value, key) {
    const rule = this.#schema[key]
    if (!rule) return null
    const { tipo, atributo = key, erro, ...rest } = rule
    switch (tipo) {
      case 'number':
        return validateNumber(value, atributo)
      case 'string':
        return validateString(value, { atributo, erro_formato: erro, ...rest })
      case 'foto':
        return validateFoto(value, atributo)
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
    for (const key of Estabelecimento.getValidKeys()) {
      json[key] = this[key]
    }
    return json
  }
}

module.exports = Estabelecimento

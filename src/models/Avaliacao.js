const { validateNumber, validateString, validateDate } = require('../utils/validators')

class Avaliacao {
  static #schema = {
    // #: Privado
    estabelecimento_id: {
      tipo: 'number',
      required: true,
      atributo: 'estabelecimento_id',
    },
    usuario_id: {
      tipo: 'number',
      required: true,
      atributo: 'usuario_id',
    },
    comentario: {
      tipo: 'string',
      required: true,
      atributo: 'comentario',
      min: 4,
      max: 100,
    },
    numero_estrelas: {
      tipo: 'number',
      required: true,
      atributo: 'numero_estrelas',
    },
    data_comentario: {
      tipo: 'date',
      atributo: 'data_comentario',
    },
  }
  constructor(data = {}) {
    for (const key in Avaliacao.#schema) {
      const rule = Avaliacao.#schema[key]
      const valor = data[key]
      if (valor === undefined || valor === null || valor === '') {
        if (rule.required) {
          throw new Error(`Atributo obrigatório '${key}' ausente.`)
        }
        this[key] = null
      } else {
        this[key] = Avaliacao.#validate(valor, key)
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
      case 'number':
        return validateNumber(value, atributo)
      case 'date':
        return validateDate(value, atributo)
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
    for (const key of Avaliacao.getValidKeys()) {
      json[key] = this[key]
    }
    return json
  }
}

module.exports = Avaliacao

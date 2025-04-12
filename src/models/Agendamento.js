const { validateNumber, validateString, validateDate } = require('../utils/validators')

class Agendamento {
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
    horario: {
      tipo: 'date',
      required: true,
      atributo: 'horario',
    },
    detalhes: {
      tipo: 'string',
      atributo: 'detalhes',
      min: 10,
      max: 300,
    },
  }
  constructor(data = {}) {
    for (const key in Agendamento.#schema) {
      const rule = Agendamento.#schema[key]
      const valor = data[key]
      if (valor === undefined || valor === null || valor === '') {
        if (rule.required) {
          throw new Error(`Atributo obrigatório '${key}' ausente.`)
        }
        this[key] = null
      } else {
        this[key] = Agendamento.#validate(valor, key)
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
    for (const key of Agendamento.getValidKeys()) {
      json[key] = this[key]
    }
    return json
  }
}

module.exports = Agendamento

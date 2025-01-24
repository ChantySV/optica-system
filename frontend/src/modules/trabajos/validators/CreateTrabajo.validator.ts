// src/validators/customValidators.ts
import { helpers } from '@vuelidate/validators'

// Valida que sea un número positivo
export const positive = helpers.withMessage(
  'Debe ser un número positivo',
  (value) => {
    if (value === null || value === undefined || value === '') return true
    return Number(value) > 0
  }
)

// Valida que sea un número negativo
export const negative = helpers.withMessage(
  'Debe ser un número negativo',
  (value) => {
    if (value === null || value === undefined || value === '') return true
    return Number(value) < 0
  }
)

// Valida que sea un UUID (regex básico, puedes ajustarlo)
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
export const uuid = helpers.withMessage(
  'Debe ser un UUID válido',
  (value) => {
    if (!value) return false // Si es requerido, false si está vacío
    return uuidRegex.test(value)
  }
)

// Valida que tenga máximo 2 decimales
export const maxTwoDecimals = helpers.withMessage(
  'Máximo 2 decimales',
  (value) => {
    if (value === null || value === undefined || value === '') return true
    // Convertir a string y verificar decimales
    const stringVal = String(value)
    if (!stringVal.includes('.')) return true
    const decimals = stringVal.split('.')[1]
    return decimals.length <= 2
  }
)

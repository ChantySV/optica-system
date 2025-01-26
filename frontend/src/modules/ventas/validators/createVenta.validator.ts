// src/validators/CreateVenta.validator.ts
import { helpers } from '@vuelidate/validators';

export const uuid = helpers.withMessage(
  'Debe ser un UUID válido',
  (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value),
);

export const maxTwoDecimals = helpers.withMessage(
  'Debe ser mayor a 0 y tener máximo 2 decimales',
  (value) => {
    if (value === null || value === undefined || value === '') return false; // Requiere un valor
    if (Number(value) <= 0) return false; // Debe ser mayor a 0
    const decimals = value.toString().split('.')[1];
    return decimals?.length <= 2; // Máximo 2 decimales
  },
);

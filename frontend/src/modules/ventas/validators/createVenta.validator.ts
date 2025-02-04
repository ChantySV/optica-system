import { required, minValue, helpers } from "@vuelidate/validators";

// Validación para UUID
const uuid = helpers.withMessage(
  "Debe ser un UUID válido.",
  (value: string) =>
    !value || /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value)
);

const decimalNumber = helpers.withMessage(
  "Debe ser un número válido con hasta 2 decimales.",
  (value: number | null) => value === null || /^\d+(\.\d{1,2})?$/.test(String(value))
);

export const getValidationRules = (form: any) => ({
  id_persona: {
    required: helpers.withMessage("Debe Seleecionador al Comprador", required)
  },

  detalleVentas: {
    required: helpers.withMessage("Debe haber al menos un trabajo asigando a venta.", required),
    $each: {
      id_trabajo: {
        required: helpers.withMessage("El ID del trabajo es obligatorio.", required),
        uuid,
      },
    },
  },

  monto_total: {
    required: helpers.withMessage("El monto total es obligatorio.", required),
    decimalNumber,
    minValue: helpers.withMessage("El monto total no puede ser negativo.", minValue(0)),
  },
});

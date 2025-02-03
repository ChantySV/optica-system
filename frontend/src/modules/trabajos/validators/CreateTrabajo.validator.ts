import { required, numeric, minValue, maxValue, helpers } from "@vuelidate/validators";

const optionalPositiveNumber = helpers.withMessage(
  "Debe ser un número positivo con hasta 2 decimales.",
  (value: number | null) => value === null || value > 0
);

const optionalNegativeNumber = helpers.withMessage(
  "Debe ser un número negativo con hasta 2 decimales.",
  (value: number | null) => value === null || value < 0
);

const optionalInt = helpers.withMessage(
  "Debe ser un número entero.",
  (value: number | null) => value === null  || Number.isInteger(value)
);

const uuid = helpers.withMessage(
  "Debe ser un UUID válido.",
  (value: string) => !value || /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value)
);

export const getValidationRules = () => ({
  numero_trabajo: {
    required: helpers.withMessage("El número de trabajo es obligatorio.", required),
    numeric: helpers.withMessage("Debe ser un número entero.", numeric),
  },

  id_personal: {
    required: helpers.withMessage("El personal es obligatorio.", required),
    uuid,
  },

  detalleTrabajo: {
    adicion: {
      optionalInt,
    },

    base: {
      optionalInt,
    },

    esferico_derecho: {
      optionalPositiveNumber,
    },

    esferico_izquierdo: {
      optionalPositiveNumber,
    },

    cilindro_derecho: {
      optionalNegativeNumber,
    },

    cilindro_izquierdo: {
      optionalNegativeNumber,
    },

    eje_derecho: {
      optionalInt,
      minValue: helpers.withMessage("El eje debe estar entre 0 y 180.", minValue(0)),
      maxValue: helpers.withMessage("El eje debe estar entre 0 y 180.", maxValue(180)),
    },

    eje_izquierdo: {
      optionalInt,
      minValue: helpers.withMessage("El eje debe estar entre 0 y 180.", minValue(0)),
      maxValue: helpers.withMessage("El eje debe estar entre 0 y 180.", maxValue(180)),
    },

    id_tratamiento: {
      uuid,
    },

    id_producto: {
      required: helpers.withMessage("El producto es obligatorio.", required),
      uuid,
    },

    id_color: {
      uuid,
    },
  },
});

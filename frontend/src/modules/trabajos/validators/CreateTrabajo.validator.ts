// src/modules/trabajos/validators/CreateTrabajo.validator.ts
import { required, integer, minValue, maxValue, helpers, requiredIf, numeric } from '@vuelidate/validators';

export const createTrabajoValidator = {
  fecha_salida: {
    // Es opcional, pero si se proporciona, debe ser una fecha válida
    required: helpers.withMessage('La fecha de salida debe ser una fecha válida.', (value: any) => {
      if (!value) return true; // Es opcional
      return !isNaN(Date.parse(value));
    }),
  },
  numero_trabajo: {
    required: helpers.withMessage('El número de trabajo es obligatorio.', required),
    integer: helpers.withMessage('El número de trabajo debe ser un número entero.', integer),
    minValue: helpers.withMessage('El número de trabajo debe ser mayor que 0.', minValue(1)),
  },
  id_personal: {
    required: helpers.withMessage('El personal es obligatorio.', required),
    // Puedes agregar una validación de patrón UUID si lo deseas
  },
  detalleTrabajo: {
    distancia: {
      // Es un booleano, no requiere validación específica
    },
    esferico_derecho: {
      requiredIf: requiredIf((vm: any) => vm.detalleTrabajo.distancia),
      numeric: helpers.withMessage('Debe ser un número.', numeric),
      minValue: helpers.withMessage('Debe ser positivo.', minValue(0)),
    },
    esferico_izquierdo: {
      requiredIf: requiredIf((vm: any) => vm.detalleTrabajo.distancia),
      numeric: helpers.withMessage('Debe ser un número.', numeric),
      minValue: helpers.withMessage('Debe ser positivo.', minValue(0)),
    },
    cilindro_derecho: {
      numeric: helpers.withMessage('Debe ser un número.', numeric),
      maxValue: helpers.withMessage('Debe ser negativo.', maxValue(0)),
    },
    cilindro_izquierdo: {
      numeric: helpers.withMessage('Debe ser un número.', numeric),
      maxValue: helpers.withMessage('Debe ser negativo.', maxValue(0)),
    },
    eje_derecho: {
      integer: helpers.withMessage('Debe ser un número entero.', integer),
    },
    eje_izquierdo: {
      integer: helpers.withMessage('Debe ser un número entero.', integer),
    },
    prisma_izquierdo: {
      numeric: helpers.withMessage('Debe ser un número.', numeric),
      minValue: helpers.withMessage('Debe ser positivo.', minValue(0)),
    },
    prisma_derecho: {
      numeric: helpers.withMessage('Debe ser un número.', numeric),
      minValue: helpers.withMessage('Debe ser positivo.', minValue(0)),
    },
    base_izquierdo: {
      integer: helpers.withMessage('Debe ser un número entero.', integer),
    },
    base_derecho: {
      integer: helpers.withMessage('Debe ser un número entero.', integer),
    },
    adicion_izquierdo: {
      integer: helpers.withMessage('Debe ser un número entero.', integer),
      minValue: helpers.withMessage('Debe ser positivo.', minValue(1)),
    },
    adicion_derecho: {
      integer: helpers.withMessage('Debe ser un número entero.', integer),
      minValue: helpers.withMessage('Debe ser positivo.', minValue(1)),
    },
    altura_izquierdo: {
      integer: helpers.withMessage('Debe ser un número entero.', integer),
      minValue: helpers.withMessage('Debe ser positivo.', minValue(1)),
    },
    altura_derecho: {
      integer: helpers.withMessage('Debe ser un número entero.', integer),
      minValue: helpers.withMessage('Debe ser positivo.', minValue(1)),
    },
    dip_izquierdo: {
      numeric: helpers.withMessage('Debe ser un número.', numeric),
      minValue: helpers.withMessage('Debe ser positivo.', minValue(0)),
    },
    dip_derecho: {
      numeric: helpers.withMessage('Debe ser un número.', numeric),
      minValue: helpers.withMessage('Debe ser positivo.', minValue(0)),
    },
    id_tratamiento: {
      // Opcional, pero si se proporciona, puede agregar una validación de patrón UUID
    },
    id_producto: {
      required: helpers.withMessage('El producto es obligatorio.', required),
      // Puedes agregar una validación de patrón UUID si lo deseas
    },
    id_color: {
      // Opcional, pero si se proporciona, puede agregar una validación de patrón UUID
    },
  },
};

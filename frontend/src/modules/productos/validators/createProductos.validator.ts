
import { required, minValue, numeric, helpers, maxLength } from "@vuelidate/validators";

const maxURLLength = helpers.withMessage(
  "El campo no puede superar los 30 caracteres.",
  maxLength(30)
);
const decimalOrInteger = helpers.withMessage(
  "Debe ser un número válido con hasta 2 decimales.",
  (value: string | number) => /^\d+(\.\d{1,2})?$/.test(String(value))
);

const mayorCompra = (form: any) =>
  helpers.withMessage(
    "El precio de venta debe ser mayor o igual al precio de compra.",
    () => Number(form.precio_venta) >= Number(form.precio_compra)
  );

export const getValidationRules = (form: any) => ({
  nombre: {
    required: helpers.withMessage("El nombre es obligatorio.", required),
    maxURLLength
  },
  stock: {
    required: helpers.withMessage("El stock es obligatorio.", required),
    numeric: helpers.withMessage("El stock debe ser un número entero.", numeric),
    minValue: helpers.withMessage("El stock no puede ser negativo.", minValue(0)),
  },
  precio_compra: {
    required: helpers.withMessage("El precio de compra es obligatorio.", required),
    decimalOrInteger,
    minValue: helpers.withMessage("El precio de compra no puede ser negativo.", minValue(0)),
  },
  precio_venta: {
    required: helpers.withMessage("El precio de venta es obligatorio.", required),
    decimalOrInteger,
    minValue: helpers.withMessage("El precio de venta no puede ser negativo.", minValue(0)),
    mayorCompra: mayorCompra(form),
  },
});

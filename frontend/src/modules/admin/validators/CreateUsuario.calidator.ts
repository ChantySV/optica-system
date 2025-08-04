import { required, minLength, maxLength, helpers } from "@vuelidate/validators";

const passwordStrength = helpers.withMessage(
  "La contraseña debe contener al menos una mayúscula, una minúscula y un número o carácter especial.",
  (value: string) =>
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value)
);

const uuid = helpers.withMessage(
  "Debe ser un UUID válido.",
  (value: string) =>
    !value || /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value)
);

export const getValidationRules = () => ({
  nombre_usuario: {
    required: helpers.withMessage("El nombre de usuario es obligatorio.", required),
  },

  contrasenha: {
    required: helpers.withMessage("La contraseña es obligatoria.", required),
    minLength: helpers.withMessage("La contraseña debe tener al menos 6 caracteres.", minLength(6)),
    maxLength: helpers.withMessage("La contraseña no debe superar los 12 caracteres.", maxLength(12)),
    passwordStrength,
  },

  id_rol: {
    required: helpers.withMessage("El rol es obligatorio.", required),
    uuid,
  },

  id_personal: {
    required: helpers.withMessage("El personal es obligatorio.", required),
    uuid,
  },
});

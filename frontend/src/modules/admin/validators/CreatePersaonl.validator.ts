import { required, email, helpers } from "@vuelidate/validators";

const onlyLetters = helpers.withMessage(
  "Solo se permiten letras.",
  (value: string) => !value || /^[A-Za-zÁáÉéÍíÓóÚúÑñ ]+$/.test(value)
);

const phoneNumber = helpers.withMessage(
  "Debe ser un número de teléfono válido.",
  (value: number | null) => !value || /^\d{7,15}$/.test(String(value))
);

export const getValidationRules = (form: any) => ({
  nombres: {
    required: helpers.withMessage("El nombre es obligatorio.", required),
    onlyLetters,
  },

  apellido_paterno: {
    required: helpers.withMessage("El apellido paterno es obligatorio.", required),
    onlyLetters,
  },

  apellido_materno: {
    onlyLetters,
  },

  email: {
    email: helpers.withMessage("Debe ser un correo electrónico válido.", email),
  },

  telefono: {
    phoneNumber,
  },

  tipo_persona: {
    required: helpers.withMessage("El tipo de persona es obligatorio.", required),
    onlyLetters,
  },

});

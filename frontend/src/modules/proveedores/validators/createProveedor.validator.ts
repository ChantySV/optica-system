import { required, helpers, maxLength } from "@vuelidate/validators";

const phoneNumber = helpers.withMessage(
  "El número de teléfono no es válido",
  (value: string) => !value || /^\d{7,15}$/.test(value)
);

const onlyAlphabet = helpers.withMessage(
  "El nombre solo puede contener letras del abecedario anglosajón (A-Z, a-z).",
  (value: string) => /^[A-Za-z]+$/.test(value)
);

const maxURLLength = helpers.withMessage(
  "El campo no puede superar los 30 caracteres.",
  maxLength(30)
);

const validDomainOrURL = helpers.withMessage(
  "Debe ser una URL válida (ejemplo: example.com o https://example.com).",
  (value: string) =>
    !value ||
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(value)
);

export const validationRules = {
  nombre: {
    required: helpers.withMessage("El nombre es obligatorio.", required),
    onlyAlphabet,
    maxURLLength
  },
  numero: { phoneNumber },
  direccion_web: {
    required: helpers.withMessage("La dirección web es obligatoria.", required),
    validDomainOrURL,
    maxURLLength
  },
};

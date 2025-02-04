import { required, helpers, maxLength, url } from "@vuelidate/validators";

const phoneNumber = helpers.withMessage(
  "El número de teléfono no es válido",
  (value: string) => !value || /^\d{7,15}$/.test(value)
);

const onlyAlphabet = helpers.withMessage(
  "El nombre solo puede contener letras del abecedario anglosajón (A-Z, a-z).",
  (value: string) => /^[A-Za-z]+$/.test(value)
);

const maxURLLength = helpers.withMessage(
  "El campo no puede superar los 60 caracteres.",
  maxLength(70)
);

const validDomainOrURL = helpers.withMessage(
  "Debe ser una URL válida (ejemplo: example.com o https://example.com).",
    url
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

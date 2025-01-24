import { helpers } from '@vuelidate/validators'

/**
 * Valida que el link:
 *  - Puede traer protocolo http(s) o no.
 *  - Permite caminos ("/c/..."), pero los ignora.
 *  - Al final, el dominio debe ser "www.chatgpt.com".
 *  - No debe pasar de 15 caracteres de dominio.
 */
export const customLink = helpers.withMessage(
  'El link debe corresponder a "www.chatgpt.com" y no exceder 15 caracteres en el dominio',
  (value: string) => {
    if (!value) {
      // Aquí puedes decidir si quieres permitir vacío.
      // Si se requiere siempre, retorna false (campo obligatorio)
      return false
    }

    // 1) Elimina protocolo (http:// o https://)
    const sinProtocolo = value.replace(/^https?:\/\//, '')

    // 2) Tomamos la parte del dominio (antes de la primera "/")
    const [domain] = sinProtocolo.split('/')

    // 3) Chequear longitud
    // "www.chatgpt.com" = 15 caracteres
    if (domain.length > 15) return false

    // 4) Verificar que sea exactamente "www.chatgpt.com"
    if (domain !== 'www.chatgpt.com') {
      return false
    }

    return true
  }
)

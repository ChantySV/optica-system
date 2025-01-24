<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-8 w-full max-w-5xl rounded-lg shadow-xl overflow-auto">
      <!-- Botón para cerrar -->
      <button @click="closeModal"
        class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold focus:outline-none">
        &times;
      </button>

      <!-- Título -->
      <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">Crear Trabajo</h2>

      <!-- Formulario -->
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div class="grid grid-cols-3 gap-4">
          <!-- NÚMERO DE TRABAJO -->
          <div>
            <label for="numero_trabajo" class="block text-sm font-medium text-gray-700 mb-1">Número de Trabajo</label>
            <input id="numero_trabajo" type="number" v-model.number="formData.numero_trabajo"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.numero_trabajo.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.numero_trabajo) }}
            </p>
          </div>

          <!-- FECHA DE SALIDA -->
          <div>
            <label for="fecha_salida" class="block text-sm font-medium text-gray-700 mb-1">Fecha de Salida
              (opcional)</label>
            <input id="fecha_salida" type="date" v-model="formData.fecha_salida"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.fecha_salida.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.fecha_salida) }}
            </p>
          </div>

          <!-- DISTANCIA -->
          <div class="flex items-center mt-6 space-x-3">
            <label for="distancia" class="text-sm font-medium text-gray-700">¿ Es a distancia?</label>
            <input id="distancia" type="checkbox" v-model="formData.detalleTrabajo.distancia"
              class="h-5 w-5 text-orange-500 border-gray-300 rounded focus:ring-2 focus:ring-orange-500" />
            <p v-if="v$.detalleTrabajo.distancia.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.distancia) }}
            </p>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4">
          <!-- ESFÉRICO DERECHO -->
          <div>
            <label for="esferico_derecho" class="block text-sm font-medium text-gray-700 mb-1">Esférico Derecho</label>
            <input id="esferico_derecho" type="number" step="0.01"
              v-model.number="formData.detalleTrabajo.esferico_derecho"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.esferico_derecho.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.esferico_derecho) }}
            </p>
          </div>

          <!-- ESFÉRICO IZQUIERDO -->
          <div>
            <label for="esferico_izquierdo" class="block text-sm font-medium text-gray-700 mb-1">Esférico
              Izquierdo</label>
            <input id="esferico_izquierdo" type="number" step="0.01"
              v-model.number="formData.detalleTrabajo.esferico_izquierdo"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.esferico_izquierdo.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.esferico_izquierdo) }}
            </p>
          </div>
          <!-- CILINDRO DERECHO -->
          <div>
            <label for="cilindro_derecho" class="block text-sm font-medium text-gray-700 mb-1">Cilindro Derecho</label>
            <input id="cilindro_derecho" type="number" step="0.01"
              v-model.number="formData.detalleTrabajo.cilindro_derecho"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.cilindro_derecho.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.cilindro_derecho) }}
            </p>
          </div>

          <!-- CILINDRO IZQUIERDO -->
          <div>
            <label for="cilindro_izquierdo" class="block text-sm font-medium text-gray-700 mb-1">Cilindro
              Izquierdo</label>
            <input id="cilindro_izquierdo" type="number" step="0.01"
              v-model.number="formData.detalleTrabajo.cilindro_izquierdo"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.cilindro_izquierdo.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.cilindro_izquierdo) }}
            </p>
          </div>

          <!-- EJE DERECHO -->
          <div>
            <label for="eje_derecho" class="block text-sm font-medium text-gray-700 mb-1">Eje Derecho</label>
            <input id="eje_derecho" type="number" v-model.number="formData.detalleTrabajo.eje_derecho"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.eje_derecho.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.eje_derecho) }}
            </p>
          </div>

          <!-- EJE IZQUIERDO -->
          <div>
            <label for="eje_izquierdo" class="block text-sm font-medium text-gray-700 mb-1">Eje Izquierdo</label>
            <input id="eje_izquierdo" type="number" v-model.number="formData.detalleTrabajo.eje_izquierdo"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.eje_izquierdo.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.eje_izquierdo) }}
            </p>
          </div>


          <!-- PRISMA DERECHO -->
          <div>
            <label for="prisma_derecho" class="block text-sm font-medium text-gray-700 mb-1">Prisma Derecho</label>
            <input id="prisma_derecho" type="number" step="0.01" v-model.number="formData.detalleTrabajo.prisma_derecho"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.prisma_derecho.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.prisma_derecho) }}
            </p>
          </div>

          <!-- PRISMA IZQUIERDO -->
          <div>
            <label for="prisma_izquierdo" class="block text-sm font-medium text-gray-700 mb-1">Prisma Izquierdo</label>
            <input id="prisma_izquierdo" type="number" step="0.01"
              v-model.number="formData.detalleTrabajo.prisma_izquierdo"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.prisma_izquierdo.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.prisma_izquierdo) }}
            </p>
          </div>

          <!-- BASE DERECHO -->
          <div>
            <label for="base_derecho" class="block text-sm font-medium text-gray-700 mb-1">Base Derecho</label>
            <input id="base_derecho" type="number" v-model.number="formData.detalleTrabajo.base_derecho"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.base_derecho.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.base_derecho) }}
            </p>
          </div>

          <!-- BASE IZQUIERDO -->
          <div>
            <label for="base_izquierdo" class="block text-sm font-medium text-gray-700 mb-1">Base Izquierdo</label>
            <input id="base_izquierdo" type="number" v-model.number="formData.detalleTrabajo.base_izquierdo"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.base_izquierdo.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.base_izquierdo) }}
            </p>
          </div>

          <!-- ADICIÓN DERECHO -->
          <div>
            <label for="adicion_derecho" class="block text-sm font-medium text-gray-700 mb-1">Adición Derecho</label>
            <input id="adicion_derecho" type="number" v-model.number="formData.detalleTrabajo.adicion_derecho"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.adicion_derecho.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.adicion_derecho) }}
            </p>
          </div>

          <!-- ADICIÓN IZQUIERDO -->
          <div>
            <label for="adicion_izquierdo" class="block text-sm font-medium text-gray-700 mb-1">Adición
              Izquierdo</label>
            <input id="adicion_izquierdo" type="number" v-model.number="formData.detalleTrabajo.adicion_izquierdo"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.adicion_izquierdo.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.adicion_izquierdo) }}
            </p>
          </div>

          <!-- ALTURA DERECHO -->
          <div>
            <label for="altura_derecho" class="block text-sm font-medium text-gray-700 mb-1">Altura Derecho</label>
            <input id="altura_derecho" type="number" v-model.number="formData.detalleTrabajo.altura_derecho"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.altura_derecho.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.altura_derecho) }}
            </p>
          </div>

          <!-- ALTURA IZQUIERDO -->
          <div>
            <label for="altura_izquierdo" class="block text-sm font-medium text-gray-700 mb-1">Altura Izquierdo</label>
            <input id="altura_izquierdo" type="number" v-model.number="formData.detalleTrabajo.altura_izquierdo"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.altura_izquierdo.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.altura_izquierdo) }}
            </p>
          </div>

          <!-- DIP DERECHO -->
          <div>
            <label for="dip_derecho" class="block text-sm font-medium text-gray-700 mb-1">DIP Derecho</label>
            <input id="dip_derecho" type="number" step="0.01" v-model.number="formData.detalleTrabajo.dip_derecho"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.dip_derecho.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.dip_derecho) }}
            </p>
          </div>

          <!-- DIP IZQUIERDO -->
          <div>
            <label for="dip_izquierdo" class="block text-sm font-medium text-gray-700 mb-1">DIP Izquierdo</label>
            <input id="dip_izquierdo" type="number" step="0.01" v-model.number="formData.detalleTrabajo.dip_izquierdo"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none" />
            <p v-if="v$.detalleTrabajo.dip_izquierdo.$error" class="text-red-500 text-sm mt-1">
              {{ firstError(v$.detalleTrabajo.dip_izquierdo) }}
            </p>
          </div>

          <!-- Tratamiento -->
          <div>
            <label for="id_tratamiento" class="block text-sm font-medium text-gray-700 mb-1">Tratamiento</label>
            <select id="id_tratamiento" v-model="formData.detalleTrabajo.id_tratamiento"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none">
              <option value="">-- Ninguno --</option>
              <option v-for="t in tratamientos" :key="t.id_tratamiento" :value="t.id_tratamiento">
                {{ t.nombre }}
              </option>
            </select>
          </div>

          <!-- Producto -->
          <div>
            <label for="id_producto" class="block text-sm font-medium text-gray-700 mb-1">Producto</label>
            <select id="id_producto" v-model="formData.detalleTrabajo.id_producto"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none">
              <option value="">-- Ninguno --</option>
              <option v-for="prod in productos" :key="prod.id_producto" :value="prod.id_producto">
                {{ prod.nombre }}
              </option>
            </select>
          </div>

          <!-- Personal -->
          <div>
            <label for="id_personal" class="block text-sm font-medium text-gray-700 mb-1">Personal</label>
            <select id="id_personal" v-model="formData.id_personal"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none">
              <option value="">-- Ninguno --</option>
              <option v-for="p in personal" :key="p.id_personal" :value="p.id_personal">
                {{ p.nombres }}
              </option>
            </select>
          </div>

          <!-- Color -->
          <div>
            <label for="id_color" class="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <select id="id_color" v-model="formData.detalleTrabajo.id_color"
              class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none">
              <option value="">-- Ninguno --</option>
              <option v-for="c in colores" :key="c.id_color" :value="c.id_color">
                {{ c.nombre }}
              </option>
            </select>
          </div>


            </div>
            <!-- Botón Enviar -->
          <div class="col-span-2 flex justify-end mt-4">
            <div class="flex justify-end space-x-4">
              <!-- Botón Cancelar -->
              <button type="button" @click="closeModal"
                class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none transition-colors">
                Cancelar
              </button>
              <!-- Botón Crear -->
              <button type="submit"
                class="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-colors">
                Crear
              </button>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, numeric, integer } from '@vuelidate/validators'
import { positive, negative, uuid, maxTwoDecimals } from '../validators/CreateTrabajo.validator'
import { findProducto, findTramiento, findColor, findPersonal, createTrabajo } from '../actions/trabajos.action'
import { useToast } from 'vue-toastification'



const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(["close"]);

// Manejamos el modal
const closeModal = () => {
  emit("close");
};

// Inicializamos toast
const toast = useToast()

// Arrays para selects
const productos = ref()
const tratamientos = ref()
const colores = ref()
const personal = ref()

// Cargar datos al montar
onMounted(async () => {
  const resProd = await findProducto()
  if (resProd.ok && resProd.data) productos.value = resProd.data

  const resTrat = await findTramiento()
  if (resTrat.ok && resTrat.data) tratamientos.value = resTrat.data

  const resColor = await findColor()
  if (resColor.ok && resColor.data) colores.value = resColor.data

  const resPers = await findPersonal()
  if (resPers.ok && resPers.data) personal.value = resPers.data
})

// Datos del formulario, replicando la estructura `CreateTrabajoDto`
const formData = ref({
  fecha_salida: null as string | null, // Date optional
  numero_trabajo: null as number | null, // int required
  id_personal: '', // uuid required
  detalleTrabajo: {
    distancia: false, // boolean required
    esferico_derecho: null as number | null,
    esferico_izquierdo: null as number | null,
    cilindro_derecho: null as number | null,
    cilindro_izquierdo: null as number | null,
    eje_derecho: null as number | null,
    eje_izquierdo: null as number | null,
    prisma_izquierdo: null as number | null,
    prisma_derecho: null as number | null,
    base_izquierdo: null as number | null,
    base_derecho: null as number | null,
    adicion_izquierdo: null as number | null,
    adicion_derecho: null as number | null,
    altura_izquierdo: null as number | null,
    altura_derecho: null as number | null,
    dip_izquierdo: null as number | null,
    dip_derecho: null as number | null,
    id_tratamiento: null as string | null,
    id_producto: '', // uuid required
    id_color: null as string | null,
  },
})

// Reglas de validación (Vuelidate)
const rules = computed(() => ({
  fecha_salida: {
    // Ejemplo: no la marcamos como required, solo podríamos chequear si es date
  },
  numero_trabajo: {
    required,
    integer,
  },
  id_personal: {
    required,
    uuid,
  },
  detalleTrabajo: {
    distancia: { required },

    // maxDecimalPlaces: 2 => con la validación 'maxTwoDecimals'
    esferico_derecho: { numeric, positive, maxTwoDecimals },
    esferico_izquierdo: { numeric, positive, maxTwoDecimals },

    cilindro_derecho: { numeric, negative, maxTwoDecimals },
    cilindro_izquierdo: { numeric, negative, maxTwoDecimals },

    eje_derecho: { integer },
    eje_izquierdo: { integer },

    prisma_izquierdo: { numeric, maxTwoDecimals },
    prisma_derecho: { numeric, maxTwoDecimals },

    base_izquierdo: { integer },
    base_derecho: { integer },

    adicion_izquierdo: { integer, positive },
    adicion_derecho: { integer, positive },

    altura_izquierdo: { integer, positive },
    altura_derecho: { integer, positive },

    dip_izquierdo: { numeric, positive, maxTwoDecimals },
    dip_derecho: { numeric, positive, maxTwoDecimals },

    id_tratamiento: { uuid },
    id_producto: { required, uuid },
    id_color: { uuid },
  },
}))

// useVuelidate
const v$ = useVuelidate(rules, formData)

// Función para retornar el primer mensaje de error
function firstError(state: any) {
  if (!state.$errors?.length) return ''
  return state.$errors[0].$message || 'Campo inválido'
}

// Manejar el envío
async function onSubmit() {
  const isValid = await v$.value.$validate()
  if (!isValid) {
    toast.error('Revisa los campos en rojo')
    return
  }

  try {
    const response = await createTrabajo(formData.value)
    if (response.ok) {
      toast.success('Trabajo creado con éxito')
      // Limpiar formulario (opcional)
      v$.value.$reset()
    } else {
      toast.error(response.message || 'Error al crear trabajo')
    }
  } catch (error) {
    console.error(error)
    toast.error('Error al enviar el formulario')
  }
}
</script>

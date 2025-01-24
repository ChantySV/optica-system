export interface SeedTratamiento {
  id_tratamiento: string
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export const seedTratamientos: SeedTratamiento[] = [
  {
    id_tratamiento: "afa8b4b6-0259-4e05-9712-05e3c6dc1176",
    nombre: "Antirreflejo",
    descripcion: "Reduce los reflejos en los lentes, mejorando la claridad visual y reduciendo el deslumbramiento.",
    activo: true
  },
  {
    id_tratamiento: "a8d8f6f6-2e68-4c3b-b34b-9505112a3ea4",
    nombre: "Protección UV",
    descripcion: "Bloquea los rayos ultravioleta del sol, protegiendo los ojos de daños como cataratas y degeneración macular.",
    activo: true
  },
  {
    id_tratamiento: "c1d9e8d6-5137-4f25-9c25-1f0c0e82c7cf",
    nombre: "Espejado",
    descripcion: "Reduce el resplandor y mejora la visibilidad en condiciones de luz intensa, como en deportes al aire libre.",
    activo: true
  },
  {
    id_tratamiento: "e4c9b474-9ea1-4e30-bf7d-7a51ad385f80",
    nombre: "Antirayas",
    descripcion: "Hace que los lentes sean más resistentes a los arañazos, aumentando su durabilidad.",
    activo: true
  },
  {
    id_tratamiento: "d1b56d64-b2f2-4f6e-8835-d6e1f3545d76",
    nombre: "Hidrofóbico",
    descripcion: "Repele el agua, evitando manchas y acumulación de humedad, útil en condiciones de lluvia o sudor.",
    activo: true
  },
  {
    id_tratamiento: "87e0d3fd-0bb0-44ca-808d-df9ac6d98862",
    nombre: "Oleofóbico",
    descripcion: "Repele los aceites y huellas dactilares, facilitando la limpieza de los lentes.",
    activo: true
  },
  {
    id_tratamiento: "e7fd1325-8d3a-4415-a52d-7acfcf0e94a2",
    nombre: "Fotocromático",
    descripcion: "Oscurece los lentes al estar expuestos a la luz solar y se aclara en ambientes con poca luz.",
    activo: true
  },
  {
    id_tratamiento: "18baf116-3f2a-4c68-9d4e-0fc7b23f6179",
    nombre: "Tinte de color",
    descripcion: "Cambia el color de los lentes para mejorar el contraste y la visibilidad, especialmente útil al conducir o hacer deportes.",
    activo: true
  },
  {
    id_tratamiento: "ee6ab7c0-1a07-432b-91ef-3a64370f5709",
    nombre: "Lentes polarizados",
    descripcion: "Eliminan el deslumbramiento reflejado en superficies como agua, nieve o asfalto, mejorando la visibilidad y reduciendo la fatiga ocular.",
    activo: true
  },
  {
    id_tratamiento: "d509df5a-7f89-4e90-bd39-278634b34f0c",
    nombre: "Filtro de luz azul",
    descripcion: "Ayuda a bloquear la luz azul de pantallas electrónicas, reduciendo la fatiga ocular y mejorando la calidad del sueño.",
    activo: true
  }
]

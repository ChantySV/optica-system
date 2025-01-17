import type { TrabajosInterface } from "@/modules/trabajos/interfaces/trabajo.interface";
import type { UsuarioInterface } from "../../auth/interfaces/user.interface";

export interface PersonalInterface {
  id_personal:      string;
  nombres:          string;
  apellido_paterno: string;
  apellido_materno: null;
  email:            string;
  telefono:         number;
  tipo_persona:     string;
  activo:           boolean;
  usuario:          UsuarioInterface;
  trabajos:         TrabajosInterface[];
}

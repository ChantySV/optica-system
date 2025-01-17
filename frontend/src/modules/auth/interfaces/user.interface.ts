import type { Role } from "./AuthResponse";

export interface UserInterface {
  id_usuario: string;
  nombre_usuario: string;
  role: Role;
}

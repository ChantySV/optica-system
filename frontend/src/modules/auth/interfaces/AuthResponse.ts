import type { UserInterface } from "./user.interface";

export interface AuthResponse {
  user:  UserInterface;
  token: string;
}

export interface Role {
  id_rol:     string;
  nombre_rol: string;
  activo:     boolean;
}

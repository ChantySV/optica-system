import type { UserInterface } from "./user.interface";

export interface AuthResponse {
  user:  UserInterface;
  token: string;
}

export interface Role {
  nombre_rol: string;
}

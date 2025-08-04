export interface UsuariosResponse {
  ok:    boolean;
  data:  Datum[];
  total: number;
}

export interface Datum {
  id_usuario:     string;
  nombre_usuario: string;
  contrasenha: string;
  activo:         boolean;
  role:           Role;
  personal:       Personal;
}

export interface Personal {
  id_personal: string;
  nombres:     string;
}

export interface Role {
  id_rol:     string;
  nombre_rol: string;
}

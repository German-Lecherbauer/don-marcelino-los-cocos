export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: number;
    activo: boolean;
    fechaAlta: string;
}

export interface LoginResponse {
    token: string;
    usuario: Usuario;
}
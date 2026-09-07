export interface DashboardAuditoriaItem {
    usuarioNombre: string;
    accion: string;
    entidad: string;
    detalle: string;
    fecha: string;
}

export interface DashboardResumen {
    totalPacientes: number;
    pacientesActivos: number;
    membresiasActivas: number;
    membresiasVencidas: number;
    usuariosActivos: number;
    ultimasAcciones: DashboardAuditoriaItem[];
}
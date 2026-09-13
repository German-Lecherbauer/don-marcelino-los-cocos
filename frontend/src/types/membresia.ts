export interface Membresia {
    id: string;
    pacienteId: string;
    pacienteNombre?: string;
    fechaInicio: string;
    fechaVencimiento: string;
    estado: number;
}
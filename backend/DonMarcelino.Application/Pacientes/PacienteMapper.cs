using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Pacientes;

public static class PacienteMapper
{
    public static PacienteResponse ToResponse(Paciente paciente)
    {
        return new PacienteResponse
        {
            Id = paciente.Id,
            Nombre = paciente.Nombre,
            Apellido = paciente.Apellido,
            Email = paciente.Email,
            Documento = paciente.Documento,
            FechaAlta = paciente.FechaAlta,
            Activo = paciente.Activo
        };
    }
}
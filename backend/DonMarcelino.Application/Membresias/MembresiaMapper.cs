using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Membresias;

public static class MembresiaMapper
{
    public static MembresiaResponse ToResponse(Membresia membresia)
    {
        return new MembresiaResponse
        {
            Id = membresia.Id,
            PacienteId = membresia.PacienteId,
            FechaInicio = membresia.FechaInicio,
            FechaVencimiento = membresia.FechaVencimiento,
            Estado = membresia.Estado
        };
    }
}
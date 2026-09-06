using DonMarcelino.Domain.Enums;

namespace DonMarcelino.Application.Membresias;

public class MembresiaResponse
{
    public Guid Id { get; set; }

    public Guid PacienteId { get; set; }

    public DateTime FechaInicio { get; set; }

    public DateTime FechaVencimiento { get; set; }

    public EstadoMembresia Estado { get; set; }
}
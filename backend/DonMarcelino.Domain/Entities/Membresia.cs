using DonMarcelino.Domain.Enums;

namespace DonMarcelino.Domain.Entities;

public class Membresia
{
    public Guid Id { get; set; }

    public Guid PacienteId { get; set; }

    public DateTime FechaInicio { get; set; }

    public DateTime FechaVencimiento { get; set; }

    public EstadoMembresia Estado { get; set; }

    public Paciente Paciente { get; set; } = null!;
}
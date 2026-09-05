using DonMarcelino.Domain.Enums;

namespace DonMarcelino.Application.Membresias;

public class CrearMembresiaRequest
{
    public DateTime FechaInicio { get; set; }
    public DateTime FechaVencimiento { get; set; }
    public EstadoMembresia Estado { get; set; } = EstadoMembresia.Activa;
}
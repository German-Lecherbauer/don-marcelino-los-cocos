using System;
using System.Collections.Generic;
using System.Text;
using DonMarcelino.Domain.Enums;

namespace DonMarcelino.Domain.Entities;

public class Membresia
{
    public Guid Id { get; set; }

    public Guid SocioId { get; set; }

    public DateTime FechaInicio { get; set; }

    public DateTime FechaVencimiento { get; set; }

    public EstadoMembresia Estado { get; set; }

    public Socio Socio { get; set; } = null!;
}
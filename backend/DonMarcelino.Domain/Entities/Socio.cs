using System;
using System.Collections.Generic;

namespace DonMarcelino.Domain.Entities;

public class Socio
{
    public Guid Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string Apellido { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Documento { get; set; } = string.Empty;

    public DateTime FechaAlta { get; set; }

    public bool Activo { get; set; }

    public ICollection<Membresia> Membresias { get; set; } = new List<Membresia>();
}

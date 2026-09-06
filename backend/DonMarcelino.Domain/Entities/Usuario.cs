using DonMarcelino.Domain.Enums;

namespace DonMarcelino.Domain.Entities;

public class Usuario
{
    public Guid Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public RolUsuario Rol { get; set; }

    public bool Activo { get; set; }

    public DateTime FechaAlta { get; set; }
}
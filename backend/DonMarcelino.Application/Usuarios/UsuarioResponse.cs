using DonMarcelino.Domain.Enums;

namespace DonMarcelino.Application.Usuarios;

public class UsuarioResponse
{
    public Guid Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public RolUsuario Rol { get; set; }

    public bool Activo { get; set; }

    public DateTime FechaAlta { get; set; }
}
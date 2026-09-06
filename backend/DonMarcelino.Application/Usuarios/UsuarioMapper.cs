using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Usuarios;

public static class UsuarioMapper
{
    public static UsuarioResponse ToResponse(Usuario usuario)
    {
        return new UsuarioResponse
        {
            Id = usuario.Id,
            Nombre = usuario.Nombre,
            Email = usuario.Email,
            Rol = usuario.Rol,
            Activo = usuario.Activo,
            FechaAlta = usuario.FechaAlta
        };
    }
}
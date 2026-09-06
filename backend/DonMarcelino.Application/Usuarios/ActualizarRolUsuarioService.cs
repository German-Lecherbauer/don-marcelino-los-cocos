using DonMarcelino.Application.Common.Exceptions;
using DonMarcelino.Domain.Entities;
using DonMarcelino.Domain.Enums;

namespace DonMarcelino.Application.Usuarios;

public class ActualizarRolUsuarioService
{
    private readonly IUsuarioRepository _repository;

    public ActualizarRolUsuarioService(
        IUsuarioRepository repository)
    {
        _repository = repository;
    }

    public async Task<Usuario?> ActualizarAsync(
        Guid id,
        ActualizarRolUsuarioRequest request,
        CancellationToken cancellationToken = default)
    {
        var usuario = await _repository.ObtenerPorIdAsync(
            id,
            cancellationToken);

        if (usuario is null)
        {
            return null;
        }

        if (!Enum.IsDefined(typeof(RolUsuario), request.Rol))
        {
            throw new BusinessRuleException(
                "El rol del usuario no es válido.");
        }

        if (usuario.Rol == request.Rol)
        {
            throw new BusinessRuleException(
                "El usuario ya posee ese rol.");
        }

        usuario.Rol = request.Rol;

        await _repository.GuardarCambiosAsync(
            cancellationToken);

        return usuario;
    }
}
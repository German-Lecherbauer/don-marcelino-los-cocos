using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Usuarios;

public class ActualizarRolUsuarioService
{
    private readonly IUsuarioRepository _repository;

    public ActualizarRolUsuarioService(IUsuarioRepository repository)
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

        usuario.Rol = request.Rol;

        await _repository.GuardarCambiosAsync(cancellationToken);

        return usuario;
    }
}
using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Usuarios;

public class CambiarEstadoUsuarioService
{
    private readonly IUsuarioRepository _repository;

    public CambiarEstadoUsuarioService(IUsuarioRepository repository)
    {
        _repository = repository;
    }

    public async Task<Usuario?> CambiarAsync(
        Guid id,
        bool activo,
        CancellationToken cancellationToken = default)
    {
        var usuario = await _repository.ObtenerPorIdAsync(
            id,
            cancellationToken);

        if (usuario is null)
        {
            return null;
        }

        usuario.Activo = activo;

        await _repository.GuardarCambiosAsync(cancellationToken);

        return usuario;
    }
}
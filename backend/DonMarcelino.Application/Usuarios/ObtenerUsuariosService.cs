using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Usuarios;

public class ObtenerUsuariosService
{
    private readonly IUsuarioRepository _repository;

    public ObtenerUsuariosService(IUsuarioRepository repository)
    {
        _repository = repository;
    }

    public Task<List<Usuario>> ObtenerAsync(
        CancellationToken cancellationToken = default)
    {
        return _repository.ObtenerTodosAsync(cancellationToken);
    }
}
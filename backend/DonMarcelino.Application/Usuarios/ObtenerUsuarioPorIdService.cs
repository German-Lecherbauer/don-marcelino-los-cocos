using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Usuarios;

public class ObtenerUsuarioPorIdService
{
    private readonly IUsuarioRepository _repository;

    public ObtenerUsuarioPorIdService(IUsuarioRepository repository)
    {
        _repository = repository;
    }

    public Task<Usuario?> ObtenerAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return _repository.ObtenerPorIdAsync(
            id,
            cancellationToken);
    }
}
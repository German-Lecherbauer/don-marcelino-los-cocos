using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Socios;

public class ObtenerSocioPorIdService
{
    private readonly ISocioRepository _socioRepository;

    public ObtenerSocioPorIdService(ISocioRepository socioRepository)
    {
        _socioRepository = socioRepository;
    }

    public Task<Socio?> ObtenerAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return _socioRepository.ObtenerPorIdAsync(id, cancellationToken);
    }
}
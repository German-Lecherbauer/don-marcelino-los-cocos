using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Socios;

public class ObtenerSociosService
{
    private readonly ISocioRepository _socioRepository;

    public ObtenerSociosService(ISocioRepository socioRepository)
    {
        _socioRepository = socioRepository;
    }

    public Task<List<Socio>> ObtenerAsync(
        CancellationToken cancellationToken = default)
    {
        return _socioRepository.ObtenerTodosAsync(cancellationToken);
    }
}
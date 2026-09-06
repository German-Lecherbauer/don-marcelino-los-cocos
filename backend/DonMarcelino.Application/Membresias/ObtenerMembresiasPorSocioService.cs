using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Membresias;

public class ObtenerMembresiasPorSocioService
{
    private readonly IMembresiaRepository _membresiaRepository;

    public ObtenerMembresiasPorSocioService(
        IMembresiaRepository membresiaRepository)
    {
        _membresiaRepository = membresiaRepository;
    }

    public Task<List<Membresia>> ObtenerAsync(
        Guid socioId,
        CancellationToken cancellationToken = default)
    {
        return _membresiaRepository.ObtenerPorSocioIdAsync(
            socioId,
            cancellationToken);
    }
}
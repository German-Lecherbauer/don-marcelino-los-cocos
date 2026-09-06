using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Membresias;

public class ObtenerMembresiaPorIdService
{
    private readonly IMembresiaRepository _membresiaRepository;

    public ObtenerMembresiaPorIdService(
        IMembresiaRepository membresiaRepository)
    {
        _membresiaRepository = membresiaRepository;
    }

    public Task<Membresia?> ObtenerAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return _membresiaRepository.ObtenerPorIdAsync(
            id,
            cancellationToken);
    }
}
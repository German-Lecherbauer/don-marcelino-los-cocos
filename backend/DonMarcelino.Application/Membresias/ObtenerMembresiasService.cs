using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Membresias;

public class ObtenerMembresiasService
{
    private readonly IMembresiaRepository _membresiaRepository;

    public ObtenerMembresiasService(
        IMembresiaRepository membresiaRepository)
    {
        _membresiaRepository = membresiaRepository;
    }

    public Task<List<Membresia>> ObtenerAsync(
        CancellationToken cancellationToken = default)
    {
        return _membresiaRepository.ObtenerTodasAsync(
            cancellationToken);
    }
}
using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Membresias;

public class ObtenerMembresiasPorPacienteService
{
    private readonly IMembresiaRepository _membresiaRepository;

    public ObtenerMembresiasPorPacienteService(
        IMembresiaRepository membresiaRepository)
    {
        _membresiaRepository = membresiaRepository;
    }

    public Task<List<Membresia>> ObtenerAsync(
        Guid pacienteId,
        CancellationToken cancellationToken = default)
    {
        return _membresiaRepository.ObtenerPorPacienteIdAsync(
            pacienteId,
            cancellationToken);
    }
}
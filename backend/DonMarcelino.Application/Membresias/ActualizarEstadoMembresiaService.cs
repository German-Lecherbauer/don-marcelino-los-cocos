using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Membresias;

public class ActualizarEstadoMembresiaService
{
    private readonly IMembresiaRepository _membresiaRepository;

    public ActualizarEstadoMembresiaService(
        IMembresiaRepository membresiaRepository)
    {
        _membresiaRepository = membresiaRepository;
    }

    public async Task<Membresia?> ActualizarAsync(
        Guid id,
        ActualizarEstadoMembresiaRequest request,
        CancellationToken cancellationToken = default)
    {
        var membresia = await _membresiaRepository.ObtenerPorIdAsync(
            id,
            cancellationToken);

        if (membresia is null)
        {
            return null;
        }

        membresia.Estado = request.Estado;

        await _membresiaRepository.ActualizarAsync(
            membresia,
            cancellationToken);

        return membresia;
    }
}
using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Membresias;

public class ActualizarMembresiaService
{
    private readonly IMembresiaRepository _membresiaRepository;

    public ActualizarMembresiaService(
        IMembresiaRepository membresiaRepository)
    {
        _membresiaRepository = membresiaRepository;
    }

    public async Task<Membresia?> ActualizarAsync(
        Guid id,
        ActualizarMembresiaRequest request,
        CancellationToken cancellationToken = default)
    {
        var membresia = await _membresiaRepository.ObtenerPorIdAsync(
            id,
            cancellationToken);

        if (membresia is null)
        {
            return null;
        }

        if (request.FechaVencimiento <= request.FechaInicio)
        {
            throw new InvalidOperationException(
                "La fecha de vencimiento debe ser posterior a la fecha de inicio.");
        }

        membresia.FechaInicio = request.FechaInicio;
        membresia.FechaVencimiento = request.FechaVencimiento;

        await _membresiaRepository.ActualizarAsync(
            membresia,
            cancellationToken);

        return membresia;
    }
}
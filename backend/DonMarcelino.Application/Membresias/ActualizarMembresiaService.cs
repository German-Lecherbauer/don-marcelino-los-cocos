using DonMarcelino.Application.Common.Exceptions;
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

        if (request.FechaInicio == default)
        {
            throw new BusinessRuleException(
                "La fecha de inicio es obligatoria.");
        }

        if (request.FechaVencimiento == default)
        {
            throw new BusinessRuleException(
                "La fecha de vencimiento es obligatoria.");
        }

        if (request.FechaVencimiento <= request.FechaInicio)
        {
            throw new BusinessRuleException(
                "La fecha de vencimiento debe ser posterior a la fecha de inicio.");
        }

        var fechaInicioUtc = DateTime.SpecifyKind(
            request.FechaInicio,
            DateTimeKind.Utc);

        var fechaVencimientoUtc = DateTime.SpecifyKind(
            request.FechaVencimiento,
            DateTimeKind.Utc);

        membresia.FechaInicio = fechaInicioUtc;
        membresia.FechaVencimiento = fechaVencimientoUtc;

        await _membresiaRepository.ActualizarAsync(
            membresia,
            cancellationToken);

        return membresia;
    }
}
using DonMarcelino.Application.Common.Exceptions;
using DonMarcelino.Domain.Entities;
using DonMarcelino.Domain.Enums;

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

        if (!Enum.IsDefined(typeof(EstadoMembresia), request.Estado))
        {
            throw new BusinessRuleException(
                "El estado de la membresía no es válido.");
        }

        if (membresia.Estado == request.Estado)
        {
            throw new BusinessRuleException(
                "La membresía ya se encuentra en ese estado.");
        }

        membresia.Estado = request.Estado;

        await _membresiaRepository.ActualizarAsync(
            membresia,
            cancellationToken);

        return membresia;
    }
}
using DonMarcelino.Application.Socios;
using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Membresias;

public class CrearMembresiaService
{
    private readonly IMembresiaRepository _membresiaRepository;
    private readonly ISocioRepository _socioRepository;

    public CrearMembresiaService(
        IMembresiaRepository membresiaRepository,
        ISocioRepository socioRepository)
    {
        _membresiaRepository = membresiaRepository;
        _socioRepository = socioRepository;
    }

    public async Task<Membresia> CrearAsync(
        Guid socioId,
        CrearMembresiaRequest request,
        CancellationToken cancellationToken = default)
    {
        var socio = await _socioRepository.ObtenerPorIdAsync(
            socioId,
            cancellationToken);

        if (socio is null)
        {
            throw new KeyNotFoundException("Socio no encontrado.");
        }

        if (!socio.Activo)
        {
            throw new InvalidOperationException(
                "No se puede crear una membresía para un socio inactivo.");
        }

        if (request.FechaVencimiento <= request.FechaInicio)
        {
            throw new InvalidOperationException(
                "La fecha de vencimiento debe ser posterior a la fecha de inicio.");
        }

        var tieneMembresiaActiva =
            await _membresiaRepository.ExisteMembresiaActivaAsync(
                socioId,
                cancellationToken);

        if (tieneMembresiaActiva)
        {
            throw new InvalidOperationException(
                "El socio ya posee una membresía activa.");
        }

        var membresia = new Membresia
        {
            Id = Guid.NewGuid(),
            SocioId = socioId,
            FechaInicio = request.FechaInicio,
            FechaVencimiento = request.FechaVencimiento,
            Estado = request.Estado
        };

        await _membresiaRepository.AgregarAsync(
            membresia,
            cancellationToken);

        return membresia;
    }
}
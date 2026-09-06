using DonMarcelino.Application.Common.Exceptions;
using DonMarcelino.Application.Pacientes;
using DonMarcelino.Domain.Entities;
using DonMarcelino.Domain.Enums;

namespace DonMarcelino.Application.Membresias;

public class CrearMembresiaService
{
    private readonly IMembresiaRepository _membresiaRepository;
    private readonly IPacienteRepository _pacienteRepository;

    public CrearMembresiaService(
        IMembresiaRepository membresiaRepository,
        IPacienteRepository pacienteRepository)
    {
        _membresiaRepository = membresiaRepository;
        _pacienteRepository = pacienteRepository;
    }

    public async Task<Membresia> CrearAsync(
        Guid pacienteId,
        CrearMembresiaRequest request,
        CancellationToken cancellationToken = default)
    {
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

        var paciente = await _pacienteRepository.ObtenerPorIdAsync(
            pacienteId,
            cancellationToken);

        if (paciente is null)
        {
            throw new KeyNotFoundException(
                "Paciente no encontrado.");
        }

        if (!paciente.Activo)
        {
            throw new BusinessRuleException(
                "No se puede crear una membresía para un paciente inactivo.");
        }

        var tieneMembresiaActiva =
            await _membresiaRepository.ExisteMembresiaActivaAsync(
                pacienteId,
                cancellationToken);

        if (tieneMembresiaActiva)
        {
            throw new BusinessRuleException(
                "El paciente ya posee una membresía activa.");
        }

        var membresia = new Membresia
        {
            Id = Guid.NewGuid(),
            PacienteId = pacienteId,
            FechaInicio = request.FechaInicio,
            FechaVencimiento = request.FechaVencimiento,
            Estado = EstadoMembresia.Activa
        };

        await _membresiaRepository.AgregarAsync(
            membresia,
            cancellationToken);

        return membresia;
    }
}
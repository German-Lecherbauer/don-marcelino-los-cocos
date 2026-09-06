using DonMarcelino.Application.Common.Exceptions;
using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Pacientes;

public class CrearPacienteService
{
    private readonly IPacienteRepository _pacienteRepository;

    public CrearPacienteService(IPacienteRepository pacienteRepository)
    {
        _pacienteRepository = pacienteRepository;
    }

    public async Task<Paciente> CrearAsync(
        CrearPacienteRequest request,
        CancellationToken cancellationToken = default)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var documento = request.Documento.Trim();

        if (await _pacienteRepository.ExistePorEmailAsync(
            email,
            cancellationToken))
        {
            throw new BusinessRuleException(
                "Ya existe un paciente con ese email.");
        }

        if (await _pacienteRepository.ExistePorDocumentoAsync(
            documento,
            cancellationToken))
        {
            throw new BusinessRuleException(
                "Ya existe un paciente con ese documento.");
        }

        var paciente = new Paciente
        {
            Id = Guid.NewGuid(),
            Nombre = request.Nombre.Trim(),
            Apellido = request.Apellido.Trim(),
            Email = email,
            Documento = documento,
            FechaAlta = DateTime.UtcNow,
            Activo = true
        };

        await _pacienteRepository.AgregarAsync(
            paciente,
            cancellationToken);

        return paciente;
    }
}
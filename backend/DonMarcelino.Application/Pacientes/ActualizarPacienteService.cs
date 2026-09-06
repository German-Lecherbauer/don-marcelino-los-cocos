using DonMarcelino.Application.Common.Exceptions;
using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Pacientes;

public class ActualizarPacienteService
{
    private readonly IPacienteRepository _pacienteRepository;

    public ActualizarPacienteService(
        IPacienteRepository pacienteRepository)
    {
        _pacienteRepository = pacienteRepository;
    }

    public async Task<Paciente?> ActualizarAsync(
        Guid id,
        ActualizarPacienteRequest request,
        CancellationToken cancellationToken = default)
    {
        var paciente = await _pacienteRepository.ObtenerPorIdAsync(
            id,
            cancellationToken);

        if (paciente is null)
            return null;

        var email = request.Email.Trim().ToLowerInvariant();
        var documento = request.Documento.Trim();

        if (email != paciente.Email &&
            await _pacienteRepository.ExistePorEmailAsync(
                email,
                cancellationToken))
        {
            throw new BusinessRuleException(
                "Ya existe un paciente con ese email.");
        }

        if (documento != paciente.Documento &&
            await _pacienteRepository.ExistePorDocumentoAsync(
                documento,
                cancellationToken))
        {
            throw new BusinessRuleException(
                "Ya existe un paciente con ese documento.");
        }

        paciente.Nombre = request.Nombre.Trim();
        paciente.Apellido = request.Apellido.Trim();
        paciente.Email = email;
        paciente.Documento = documento;

        await _pacienteRepository.ActualizarAsync(
            paciente,
            cancellationToken);

        return paciente;
    }
}
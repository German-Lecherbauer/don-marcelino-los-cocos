using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Pacientes;

public class ActivarPacienteService
{
    private readonly IPacienteRepository _pacienteRepository;

    public ActivarPacienteService(
        IPacienteRepository pacienteRepository)
    {
        _pacienteRepository = pacienteRepository;
    }

    public async Task<Paciente?> ActivarAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var paciente =
            await _pacienteRepository.ObtenerPorIdAsync(
                id,
                cancellationToken
            );

        if (paciente is null)
        {
            return null;
        }

        if (!paciente.Activo)
        {
            await _pacienteRepository.ActivarAsync(
                paciente,
                cancellationToken
            );
        }

        return paciente;
    }
}
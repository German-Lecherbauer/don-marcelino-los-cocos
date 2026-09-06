namespace DonMarcelino.Application.Pacientes;

public class DesactivarPacienteService
{
    private readonly IPacienteRepository _pacienteRepository;

    public DesactivarPacienteService(
        IPacienteRepository pacienteRepository)
    {
        _pacienteRepository = pacienteRepository;
    }

    public async Task<bool> DesactivarAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var paciente = await _pacienteRepository.ObtenerPorIdAsync(
            id,
            cancellationToken);

        if (paciente is null)
        {
            return false;
        }

        if (!paciente.Activo)
        {
            return true;
        }

        await _pacienteRepository.DesactivarAsync(
            paciente,
            cancellationToken);

        return true;
    }
}
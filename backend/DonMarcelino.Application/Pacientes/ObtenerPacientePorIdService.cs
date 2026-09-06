using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Pacientes;

public class ObtenerPacientePorIdService
{
    private readonly IPacienteRepository _pacienteRepository;

    public ObtenerPacientePorIdService(
        IPacienteRepository pacienteRepository)
    {
        _pacienteRepository = pacienteRepository;
    }

    public Task<Paciente?> ObtenerAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return _pacienteRepository.ObtenerPorIdAsync(
            id,
            cancellationToken);
    }
}
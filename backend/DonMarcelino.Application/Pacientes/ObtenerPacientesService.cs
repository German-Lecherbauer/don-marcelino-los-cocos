using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Pacientes;

public class ObtenerPacientesService
{
    private readonly IPacienteRepository _pacienteRepository;

    public ObtenerPacientesService(IPacienteRepository pacienteRepository)
    {
        _pacienteRepository = pacienteRepository;
    }

    public Task<List<Paciente>> ObtenerAsync(
        CancellationToken cancellationToken = default)
    {
        return _pacienteRepository.ObtenerTodosAsync(
            cancellationToken);
    }
}
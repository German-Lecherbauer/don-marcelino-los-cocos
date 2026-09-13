using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Pacientes;

public interface IPacienteRepository
{
    Task<bool> ExistePorEmailAsync(
        string email,
        CancellationToken cancellationToken = default);

    Task<bool> ExistePorDocumentoAsync(
        string documento,
        CancellationToken cancellationToken = default);

    Task AgregarAsync(
        Paciente paciente,
        CancellationToken cancellationToken = default);

    Task<List<Paciente>> ObtenerTodosAsync(
        CancellationToken cancellationToken = default);

    Task<Paciente?> ObtenerPorIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task ActualizarAsync(
        Paciente paciente,
        CancellationToken cancellationToken = default);

    Task DesactivarAsync(
        Paciente paciente,
        CancellationToken cancellationToken = default);

    Task ActivarAsync(
        Paciente paciente,
        CancellationToken cancellationToken = default);
}
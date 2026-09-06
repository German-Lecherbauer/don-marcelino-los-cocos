using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Membresias;

public interface IMembresiaRepository
{
    Task<bool> ExisteMembresiaActivaAsync(
        Guid socioId,
        CancellationToken cancellationToken = default);

    Task AgregarAsync(
        Membresia membresia,
        CancellationToken cancellationToken = default);

    Task<List<Membresia>> ObtenerPorSocioIdAsync(
    Guid socioId,
    CancellationToken cancellationToken = default);
    Task<Membresia?> ObtenerPorIdAsync(
    Guid id,
    CancellationToken cancellationToken = default);
    Task ActualizarAsync(
    Membresia membresia,
    CancellationToken cancellationToken = default);
}
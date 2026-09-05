using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Socios;

public interface ISocioRepository
{
    Task<bool> ExistePorEmailAsync(
        string email,
        CancellationToken cancellationToken = default);

    Task<bool> ExistePorDocumentoAsync(
        string documento,
        CancellationToken cancellationToken = default);

    Task AgregarAsync(
        Socio socio,
        CancellationToken cancellationToken = default);

    Task<List<Socio>> ObtenerTodosAsync(
    CancellationToken cancellationToken = default);
    Task<Socio?> ObtenerPorIdAsync(
    Guid id,
    CancellationToken cancellationToken = default);

    Task ActualizarAsync(
    Socio socio,
    CancellationToken cancellationToken = default);
}
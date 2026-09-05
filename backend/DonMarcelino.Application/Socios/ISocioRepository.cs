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
}
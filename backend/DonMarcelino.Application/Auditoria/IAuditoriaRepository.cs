using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Auditoria;

public interface IAuditoriaRepository
{
    Task AgregarAsync(
        DonMarcelino.Domain.Entities.Auditoria auditoria,
        CancellationToken cancellationToken = default);

    Task<List<DonMarcelino.Domain.Entities.Auditoria>> ObtenerTodasAsync(
        CancellationToken cancellationToken = default);
}
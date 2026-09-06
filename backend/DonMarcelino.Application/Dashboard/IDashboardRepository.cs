using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Dashboard;

public interface IDashboardRepository
{
    Task<int> ObtenerTotalSociosAsync(
        CancellationToken cancellationToken = default);

    Task<int> ObtenerSociosActivosAsync(
        CancellationToken cancellationToken = default);

    Task<int> ObtenerMembresiasActivasAsync(
        CancellationToken cancellationToken = default);

    Task<int> ObtenerMembresiasVencidasAsync(
        CancellationToken cancellationToken = default);

    Task<int> ObtenerUsuariosActivosAsync(
        CancellationToken cancellationToken = default);

    Task<List<DonMarcelino.Domain.Entities.Auditoria>> ObtenerUltimasAuditoriasAsync(
        int cantidad,
        CancellationToken cancellationToken = default);
}
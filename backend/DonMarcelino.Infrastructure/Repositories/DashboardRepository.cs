using DonMarcelino.Application.Dashboard;
using DonMarcelino.Domain.Entities;
using DonMarcelino.Domain.Enums;
using DonMarcelino.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace DonMarcelino.Infrastructure.Repositories;

public class DashboardRepository : IDashboardRepository
{
    private readonly DonMarcelinoDbContext _context;

    public DashboardRepository(DonMarcelinoDbContext context)
    {
        _context = context;
    }

    public Task<int> ObtenerTotalSociosAsync(
        CancellationToken cancellationToken = default)
    {
        return _context.Socios
            .CountAsync(cancellationToken);
    }

    public Task<int> ObtenerSociosActivosAsync(
        CancellationToken cancellationToken = default)
    {
        return _context.Socios
            .CountAsync(
                x => x.Activo,
                cancellationToken);
    }

    public Task<int> ObtenerMembresiasActivasAsync(
        CancellationToken cancellationToken = default)
    {
        return _context.Membresias
            .CountAsync(
                x => x.Estado == EstadoMembresia.Activa,
                cancellationToken);
    }

    public Task<int> ObtenerMembresiasVencidasAsync(
        CancellationToken cancellationToken = default)
    {
        return _context.Membresias
            .CountAsync(
                x => x.Estado == EstadoMembresia.Vencida,
                cancellationToken);
    }

    public Task<int> ObtenerUsuariosActivosAsync(
        CancellationToken cancellationToken = default)
    {
        return _context.Usuarios
            .CountAsync(
                x => x.Activo,
                cancellationToken);
    }

    public Task<List<Auditoria>> ObtenerUltimasAuditoriasAsync(
        int cantidad,
        CancellationToken cancellationToken = default)
    {
        return _context.Auditorias
            .AsNoTracking()
            .OrderByDescending(x => x.Fecha)
            .Take(cantidad)
            .ToListAsync(cancellationToken);
    }
}
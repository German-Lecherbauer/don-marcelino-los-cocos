using DonMarcelino.Application.Auditoria;
using DonMarcelino.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace DonMarcelino.Infrastructure.Repositories;

public class AuditoriaRepository : IAuditoriaRepository
{
    private readonly DonMarcelinoDbContext _context;

    public AuditoriaRepository(DonMarcelinoDbContext context)
    {
        _context = context;
    }

    public async Task AgregarAsync(
        DonMarcelino.Domain.Entities.Auditoria auditoria,
        CancellationToken cancellationToken = default)
    {
        _context.Auditorias.Add(auditoria);

        await _context.SaveChangesAsync(cancellationToken);
    }

    public Task<List<DonMarcelino.Domain.Entities.Auditoria>> ObtenerTodasAsync(
        CancellationToken cancellationToken = default)
    {
        return _context.Auditorias
            .AsNoTracking()
            .OrderByDescending(x => x.Fecha)
            .ToListAsync(cancellationToken);
    }
}
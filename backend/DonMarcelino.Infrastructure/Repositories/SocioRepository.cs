using DonMarcelino.Application.Socios;
using DonMarcelino.Domain.Entities;
using DonMarcelino.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace DonMarcelino.Infrastructure.Repositories;

public class SocioRepository : ISocioRepository
{
    private readonly DonMarcelinoDbContext _context;

    public SocioRepository(DonMarcelinoDbContext context)
    {
        _context = context;
    }

    public Task<bool> ExistePorEmailAsync(
        string email,
        CancellationToken cancellationToken = default)
    {
        return _context.Socios
            .AnyAsync(x => x.Email == email, cancellationToken);
    }

    public Task<bool> ExistePorDocumentoAsync(
        string documento,
        CancellationToken cancellationToken = default)
    {
        return _context.Socios
            .AnyAsync(x => x.Documento == documento, cancellationToken);
    }

    public async Task AgregarAsync(
        Socio socio,
        CancellationToken cancellationToken = default)
    {
        _context.Socios.Add(socio);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public Task<List<Socio>> ObtenerTodosAsync(
    CancellationToken cancellationToken = default)
    {
        return _context.Socios
            .AsNoTracking()
            .OrderBy(x => x.Apellido)
            .ThenBy(x => x.Nombre)
            .ToListAsync(cancellationToken);
    }

    public Task<Socio?> ObtenerPorIdAsync(
    Guid id,
    CancellationToken cancellationToken = default)
    {
        return _context.Socios
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }
}
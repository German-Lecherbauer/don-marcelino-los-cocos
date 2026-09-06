using DonMarcelino.Application.Membresias;
using DonMarcelino.Domain.Entities;
using DonMarcelino.Domain.Enums;
using DonMarcelino.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace DonMarcelino.Infrastructure.Repositories;

public class MembresiaRepository : IMembresiaRepository
{
    private readonly DonMarcelinoDbContext _context;

    public MembresiaRepository(DonMarcelinoDbContext context)
    {
        _context = context;
    }

    public Task<bool> ExisteMembresiaActivaAsync(
        Guid pacienteId,
        CancellationToken cancellationToken = default)
    {
        return _context.Membresias
            .AnyAsync(
                x => x.PacienteId == pacienteId &&
                     x.Estado == EstadoMembresia.Activa,
                cancellationToken);
    }

    public async Task AgregarAsync(
        Membresia membresia,
        CancellationToken cancellationToken = default)
    {
        _context.Membresias.Add(membresia);

        await _context.SaveChangesAsync(cancellationToken);
    }

    public Task<List<Membresia>> ObtenerPorPacienteIdAsync(
        Guid pacienteId,
        CancellationToken cancellationToken = default)
    {
        return _context.Membresias
            .AsNoTracking()
            .Where(x => x.PacienteId == pacienteId)
            .OrderByDescending(x => x.FechaInicio)
            .ToListAsync(cancellationToken);
    }

    public Task<Membresia?> ObtenerPorIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return _context.Membresias
            .AsNoTracking()
            .FirstOrDefaultAsync(
                x => x.Id == id,
                cancellationToken);
    }

    public async Task ActualizarAsync(
        Membresia membresia,
        CancellationToken cancellationToken = default)
    {
        _context.Membresias.Update(membresia);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
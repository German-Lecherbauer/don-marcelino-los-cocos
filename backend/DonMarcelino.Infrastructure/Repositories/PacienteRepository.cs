using DonMarcelino.Application.Pacientes;
using DonMarcelino.Domain.Entities;
using DonMarcelino.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace DonMarcelino.Infrastructure.Repositories;

public class PacienteRepository : IPacienteRepository
{
    private readonly DonMarcelinoDbContext _context;

    public PacienteRepository(
        DonMarcelinoDbContext context)
    {
        _context = context;
    }

    public Task<bool> ExistePorEmailAsync(
        string email,
        CancellationToken cancellationToken = default)
    {
        return _context.Pacientes
            .AnyAsync(
                x => x.Email == email,
                cancellationToken);
    }

    public Task<bool> ExistePorDocumentoAsync(
        string documento,
        CancellationToken cancellationToken = default)
    {
        return _context.Pacientes
            .AnyAsync(
                x => x.Documento == documento,
                cancellationToken);
    }

    public async Task AgregarAsync(
        Paciente paciente,
        CancellationToken cancellationToken = default)
    {
        _context.Pacientes.Add(
            paciente
        );

        await _context.SaveChangesAsync(
            cancellationToken
        );
    }

    public Task<List<Paciente>> ObtenerTodosAsync(
        CancellationToken cancellationToken = default)
    {
        return _context.Pacientes
            .AsNoTracking()
            .OrderBy(x => x.Apellido)
            .ThenBy(x => x.Nombre)
            .ToListAsync(
                cancellationToken
            );
    }

    public Task<Paciente?> ObtenerPorIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return _context.Pacientes
            .AsNoTracking()
            .FirstOrDefaultAsync(
                x => x.Id == id,
                cancellationToken
            );
    }

    public async Task ActualizarAsync(
        Paciente paciente,
        CancellationToken cancellationToken = default)
    {
        _context.Pacientes.Update(
            paciente
        );

        await _context.SaveChangesAsync(
            cancellationToken
        );
    }

    public async Task DesactivarAsync(
        Paciente paciente,
        CancellationToken cancellationToken = default)
    {
        paciente.Activo = false;

        _context.Pacientes.Update(
            paciente
        );

        await _context.SaveChangesAsync(
            cancellationToken
        );
    }

    public async Task ActivarAsync(
        Paciente paciente,
        CancellationToken cancellationToken = default)
    {
        paciente.Activo = true;

        _context.Pacientes.Update(
            paciente
        );

        await _context.SaveChangesAsync(
            cancellationToken
        );
    }
}
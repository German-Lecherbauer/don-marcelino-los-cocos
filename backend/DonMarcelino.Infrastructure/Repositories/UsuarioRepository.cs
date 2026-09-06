using DonMarcelino.Application.Usuarios;
using DonMarcelino.Domain.Entities;
using DonMarcelino.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace DonMarcelino.Infrastructure.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly DonMarcelinoDbContext _context;

    public UsuarioRepository(DonMarcelinoDbContext context)
    {
        _context = context;
    }

    public Task<bool> ExistePorEmailAsync(
        string email,
        CancellationToken cancellationToken = default)
    {
        return _context.Usuarios
            .AnyAsync(x => x.Email == email, cancellationToken);
    }

    public async Task AgregarAsync(
        Usuario usuario,
        CancellationToken cancellationToken = default)
    {
        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public Task<Usuario?> ObtenerPorEmailAsync(
    string email,
    CancellationToken cancellationToken = default)
    {
        return _context.Usuarios
            .AsNoTracking()
            .FirstOrDefaultAsync(
                x => x.Email == email,
                cancellationToken);
    }
}
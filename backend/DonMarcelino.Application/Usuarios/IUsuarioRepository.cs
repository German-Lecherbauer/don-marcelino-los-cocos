using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Usuarios;

public interface IUsuarioRepository
{
    Task<bool> ExistePorEmailAsync(
        string email,
        CancellationToken cancellationToken = default);

    Task<Usuario?> ObtenerPorEmailAsync(
        string email,
        CancellationToken cancellationToken = default);

    Task<Usuario?> ObtenerPorIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task<List<Usuario>> ObtenerTodosAsync(
        CancellationToken cancellationToken = default);

    Task AgregarAsync(
        Usuario usuario,
        CancellationToken cancellationToken = default);

    Task GuardarCambiosAsync(
        CancellationToken cancellationToken = default);
}
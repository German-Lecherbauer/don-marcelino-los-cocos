using DonMarcelino.Application.Common.Exceptions;
using DonMarcelino.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace DonMarcelino.Application.Usuarios;

public class CrearUsuarioService
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly PasswordHasher<Usuario> _passwordHasher;

    public CrearUsuarioService(
        IUsuarioRepository usuarioRepository,
        PasswordHasher<Usuario> passwordHasher)
    {
        _usuarioRepository = usuarioRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<Usuario> CrearAsync(
        CrearUsuarioRequest request,
        CancellationToken cancellationToken = default)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        if (await _usuarioRepository.ExistePorEmailAsync(
            email,
            cancellationToken))
        {
            throw new BusinessRuleException(
                "Ya existe un usuario con ese email.");
        }

        if (string.IsNullOrWhiteSpace(request.Password) ||
            request.Password.Length < 8)
        {
            throw new BusinessRuleException(
                "La contraseña debe tener al menos 8 caracteres.");
        }

        var usuario = new Usuario
        {
            Id = Guid.NewGuid(),
            Nombre = request.Nombre.Trim(),
            Email = email,
            Rol = request.Rol,
            Activo = true,
            FechaAlta = DateTime.UtcNow
        };

        usuario.PasswordHash = _passwordHasher.HashPassword(
            usuario,
            request.Password);

        await _usuarioRepository.AgregarAsync(
            usuario,
            cancellationToken);

        return usuario;
    }
}
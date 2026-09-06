using System.Net.Mail;
using DonMarcelino.Application.Common.Exceptions;
using DonMarcelino.Domain.Entities;
using DonMarcelino.Domain.Enums;
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
        if (string.IsNullOrWhiteSpace(request.Nombre))
        {
            throw new BusinessRuleException(
                "El nombre es obligatorio.");
        }

        if (string.IsNullOrWhiteSpace(request.Email))
        {
            throw new BusinessRuleException(
                "El email es obligatorio.");
        }

        if (string.IsNullOrWhiteSpace(request.Password))
        {
            throw new BusinessRuleException(
                "La contraseña es obligatoria.");
        }

        if (request.Password.Length < 8)
        {
            throw new BusinessRuleException(
                "La contraseña debe tener al menos 8 caracteres.");
        }

        if (!Enum.IsDefined(typeof(RolUsuario), request.Rol))
        {
            throw new BusinessRuleException(
                "El rol del usuario no es válido.");
        }

        var nombre = request.Nombre.Trim();
        var email = request.Email.Trim().ToLowerInvariant();

        if (!EsEmailValido(email))
        {
            throw new BusinessRuleException(
                "El email no tiene un formato válido.");
        }

        if (await _usuarioRepository.ExistePorEmailAsync(
            email,
            cancellationToken))
        {
            throw new BusinessRuleException(
                "Ya existe un usuario con ese email.");
        }

        var usuario = new Usuario
        {
            Id = Guid.NewGuid(),
            Nombre = nombre,
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

    private static bool EsEmailValido(string email)
    {
        try
        {
            var address = new MailAddress(email);
            return address.Address == email;
        }
        catch
        {
            return false;
        }
    }
}
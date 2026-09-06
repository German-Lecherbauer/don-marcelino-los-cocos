using DonMarcelino.Application.Common.Exceptions;
using DonMarcelino.Application.Usuarios;
using DonMarcelino.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace DonMarcelino.Application.Auth;

public class LoginService
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly PasswordHasher<Usuario> _passwordHasher;

    public LoginService(
        IUsuarioRepository usuarioRepository,
        PasswordHasher<Usuario> passwordHasher)
    {
        _usuarioRepository = usuarioRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<Usuario> LoginAsync(
        LoginRequest request,
        CancellationToken cancellationToken = default)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        var usuario = await _usuarioRepository.ObtenerPorEmailAsync(
            email,
            cancellationToken);

        if (usuario is null)
        {
            throw new BusinessRuleException(
                "Email o contraseña incorrectos.");
        }

        if (!usuario.Activo)
        {
            throw new BusinessRuleException(
                "El usuario está inactivo.");
        }

        var resultado = _passwordHasher.VerifyHashedPassword(
            usuario,
            usuario.PasswordHash,
            request.Password);

        if (resultado == PasswordVerificationResult.Failed)
        {
            throw new BusinessRuleException(
                "Email o contraseña incorrectos.");
        }

        return usuario;
    }
}
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DonMarcelino.Domain.Entities;
using Microsoft.IdentityModel.Tokens;

namespace DonMarcelino.Api.Auth;

public class JwtTokenGenerator
{
    private readonly IConfiguration _configuration;

    public JwtTokenGenerator(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string Generate(Usuario usuario)
    {
        var key = _configuration["Jwt:Key"]
            ?? throw new InvalidOperationException("JWT Key no configurada.");

        var issuer = _configuration["Jwt:Issuer"];
        var audience = _configuration["Jwt:Audience"];

        var expirationMinutes =
            int.Parse(_configuration["Jwt:ExpirationMinutes"] ?? "120");

        var claims = new[]
        {
            new Claim(
                JwtRegisteredClaimNames.Sub,
                usuario.Id.ToString()),

            new Claim(
                JwtRegisteredClaimNames.Email,
                usuario.Email),

            new Claim(
                ClaimTypes.Name,
                usuario.Nombre),

            new Claim(
                ClaimTypes.Role,
                usuario.Rol.ToString())
        };

        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(key));

        var credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}
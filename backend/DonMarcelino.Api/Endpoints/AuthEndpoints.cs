using DonMarcelino.Api.Auth;
using DonMarcelino.Application.Auth;
using DonMarcelino.Application.Usuarios;

namespace DonMarcelino.Api.Endpoints;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(
        this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/login", async (
            LoginRequest request,
            LoginService loginService,
            JwtTokenGenerator tokenGenerator,
            CancellationToken cancellationToken) =>
        {
            var usuario = await loginService.LoginAsync(
                request,
                cancellationToken);

            var token = tokenGenerator.Generate(usuario);

            return Results.Ok(new
            {
                token,
                usuario = UsuarioMapper.ToResponse(usuario)
            });
        });

        return app;
    }
}
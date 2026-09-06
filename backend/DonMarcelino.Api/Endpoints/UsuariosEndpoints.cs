using DonMarcelino.Application.Auditoria;
using DonMarcelino.Application.Usuarios;

namespace DonMarcelino.Api.Endpoints;

public static class UsuariosEndpoints
{
    public static IEndpointRouteBuilder MapUsuariosEndpoints(
        this IEndpointRouteBuilder app)
    {
        // Crear usuario
        app.MapPost("/api/usuarios", async (
            CrearUsuarioRequest request,
            CrearUsuarioService service,
            AuditoriaService auditoriaService,
            HttpContext httpContext,
            CancellationToken cancellationToken) =>
        {
            var usuario = await service.CrearAsync(
                request,
                cancellationToken);

            var (usuarioId, usuarioNombre) =
                EndpointHelpers.ObtenerUsuarioAuditoria(httpContext);

            await auditoriaService.RegistrarAsync(
                usuarioId,
                usuarioNombre,
                "Crear",
                "Usuario",
                usuario.Id.ToString(),
                $"Se creó el usuario {usuario.Email} con rol {usuario.Rol}.",
                cancellationToken);

            return Results.Created(
                $"/api/usuarios/{usuario.Id}",
                UsuarioMapper.ToResponse(usuario));
        })
        .RequireAuthorization("AdminOnly");

        // Listar usuarios
        app.MapGet("/api/usuarios", async (
            ObtenerUsuariosService service,
            CancellationToken cancellationToken) =>
        {
            var usuarios = await service.ObtenerAsync(
                cancellationToken);

            var response = usuarios
                .Select(UsuarioMapper.ToResponse)
                .ToList();

            return Results.Ok(response);
        })
        .RequireAuthorization("AdminOnly");

        // Obtener usuario por ID
        app.MapGet("/api/usuarios/{id:guid}", async (
            Guid id,
            ObtenerUsuarioPorIdService service,
            CancellationToken cancellationToken) =>
        {
            var usuario = await service.ObtenerAsync(
                id,
                cancellationToken);

            if (usuario is null)
            {
                return Results.NotFound(new
                {
                    error = "Usuario no encontrado."
                });
            }

            return Results.Ok(
                UsuarioMapper.ToResponse(usuario));
        })
        .RequireAuthorization("AdminOnly");

        // Actualizar rol de usuario
        app.MapPatch("/api/usuarios/{id:guid}/rol", async (
            Guid id,
            ActualizarRolUsuarioRequest request,
            ActualizarRolUsuarioService service,
            AuditoriaService auditoriaService,
            HttpContext httpContext,
            CancellationToken cancellationToken) =>
        {
            var usuario = await service.ActualizarAsync(
                id,
                request,
                cancellationToken);

            if (usuario is null)
            {
                return Results.NotFound(new
                {
                    error = "Usuario no encontrado."
                });
            }

            var (usuarioId, usuarioNombre) =
                EndpointHelpers.ObtenerUsuarioAuditoria(httpContext);

            await auditoriaService.RegistrarAsync(
                usuarioId,
                usuarioNombre,
                "CambiarRol",
                "Usuario",
                usuario.Id.ToString(),
                $"Se cambió el rol de {usuario.Email} a {usuario.Rol}.",
                cancellationToken);

            return Results.Ok(
                UsuarioMapper.ToResponse(usuario));
        })
        .RequireAuthorization("AdminOnly");

        // Activar o desactivar usuario
        app.MapPatch("/api/usuarios/{id:guid}/estado", async (
            Guid id,
            bool activo,
            CambiarEstadoUsuarioService service,
            AuditoriaService auditoriaService,
            HttpContext httpContext,
            CancellationToken cancellationToken) =>
        {
            var usuario = await service.CambiarAsync(
                id,
                activo,
                cancellationToken);

            if (usuario is null)
            {
                return Results.NotFound(new
                {
                    error = "Usuario no encontrado."
                });
            }

            var (usuarioId, usuarioNombre) =
                EndpointHelpers.ObtenerUsuarioAuditoria(httpContext);

            await auditoriaService.RegistrarAsync(
                usuarioId,
                usuarioNombre,
                activo ? "Activar" : "Desactivar",
                "Usuario",
                usuario.Id.ToString(),
                activo
                    ? $"Se activó el usuario {usuario.Email}."
                    : $"Se desactivó el usuario {usuario.Email}.",
                cancellationToken);

            return Results.Ok(
                UsuarioMapper.ToResponse(usuario));
        })
        .RequireAuthorization("AdminOnly");

        return app;
    }
}
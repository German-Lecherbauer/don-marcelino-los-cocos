using DonMarcelino.Application.Auditoria;
using DonMarcelino.Application.Pacientes;

namespace DonMarcelino.Api.Endpoints;

public static class PacientesEndpoints
{
    public static IEndpointRouteBuilder MapPacientesEndpoints(
        this IEndpointRouteBuilder app)
    {
        // Crear paciente
        app.MapPost("/api/pacientes", async (
            CrearPacienteRequest request,
            CrearPacienteService service,
            AuditoriaService auditoriaService,
            HttpContext httpContext,
            CancellationToken cancellationToken) =>
        {
            var paciente = await service.CrearAsync(
                request,
                cancellationToken);

            var (usuarioId, usuarioNombre) =
                EndpointHelpers.ObtenerUsuarioAuditoria(httpContext);

            await auditoriaService.RegistrarAsync(
                usuarioId,
                usuarioNombre,
                "Crear",
                "Paciente",
                paciente.Id.ToString(),
                $"Se creó el paciente {paciente.Nombre} {paciente.Apellido}.",
                cancellationToken);

            return Results.Created(
                $"/api/pacientes/{paciente.Id}",
                PacienteMapper.ToResponse(paciente));
        })
        .RequireAuthorization("AdminOrOperador");

        // Listar pacientes
        app.MapGet("/api/pacientes", async (
            ObtenerPacientesService service,
            CancellationToken cancellationToken) =>
        {
            var pacientes = await service.ObtenerAsync(
                cancellationToken);

            var response = pacientes
                .Select(PacienteMapper.ToResponse)
                .ToList();

            return Results.Ok(response);
        })
        .RequireAuthorization();

        // Obtener paciente por ID
        app.MapGet("/api/pacientes/{id:guid}", async (
            Guid id,
            ObtenerPacientePorIdService service,
            CancellationToken cancellationToken) =>
        {
            var paciente = await service.ObtenerAsync(
                id,
                cancellationToken);

            if (paciente is null)
            {
                return Results.NotFound(new
                {
                    error = "Paciente no encontrado."
                });
            }

            return Results.Ok(
                PacienteMapper.ToResponse(paciente));
        })
        .RequireAuthorization();

        // Actualizar paciente
        app.MapPut("/api/pacientes/{id:guid}", async (
            Guid id,
            ActualizarPacienteRequest request,
            ActualizarPacienteService service,
            AuditoriaService auditoriaService,
            HttpContext httpContext,
            CancellationToken cancellationToken) =>
        {
            var paciente = await service.ActualizarAsync(
                id,
                request,
                cancellationToken);

            if (paciente is null)
            {
                return Results.NotFound(new
                {
                    error = "Paciente no encontrado."
                });
            }

            var (usuarioId, usuarioNombre) =
                EndpointHelpers.ObtenerUsuarioAuditoria(httpContext);

            await auditoriaService.RegistrarAsync(
                usuarioId,
                usuarioNombre,
                "Actualizar",
                "Paciente",
                paciente.Id.ToString(),
                $"Se actualizó el paciente {paciente.Nombre} {paciente.Apellido}.",
                cancellationToken);

            return Results.Ok(
                PacienteMapper.ToResponse(paciente));
        })
        .RequireAuthorization("AdminOrOperador");

        // Baja lógica de paciente
        app.MapDelete("/api/pacientes/{id:guid}", async (
            Guid id,
            DesactivarPacienteService service,
            AuditoriaService auditoriaService,
            HttpContext httpContext,
            CancellationToken cancellationToken) =>
        {
            var desactivado = await service.DesactivarAsync(
                id,
                cancellationToken);

            if (!desactivado)
            {
                return Results.NotFound(new
                {
                    error = "Paciente no encontrado."
                });
            }

            var (usuarioId, usuarioNombre) =
                EndpointHelpers.ObtenerUsuarioAuditoria(httpContext);

            await auditoriaService.RegistrarAsync(
                usuarioId,
                usuarioNombre,
                "Desactivar",
                "Paciente",
                id.ToString(),
                "Se desactivó un paciente.",
                cancellationToken);

            return Results.NoContent();
        })
        .RequireAuthorization("AdminOrOperador");

        return app;
    }
}
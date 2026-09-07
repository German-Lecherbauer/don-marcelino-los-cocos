using DonMarcelino.Application.Auditoria;
using DonMarcelino.Application.Membresias;
using DonMarcelino.Application.Pacientes;

namespace DonMarcelino.Api.Endpoints;

public static class MembresiasEndpoints
{
    public static IEndpointRouteBuilder MapMembresiasEndpoints(
        this IEndpointRouteBuilder app)
    {
        // Crear membresía
        app.MapPost("/api/pacientes/{pacienteId:guid}/membresias", async (
            Guid pacienteId,
            CrearMembresiaRequest request,
            CrearMembresiaService service,
            ObtenerPacientePorIdService pacienteService,
            AuditoriaService auditoriaService,
            HttpContext httpContext,
            CancellationToken cancellationToken) =>
        {
            var membresia = await service.CrearAsync(
                pacienteId,
                request,
                cancellationToken);

            var paciente = await pacienteService.ObtenerAsync(
                pacienteId,
                cancellationToken);

            var (usuarioId, usuarioNombre) =
                EndpointHelpers.ObtenerUsuarioAuditoria(httpContext);

            var detalleAuditoria = paciente is not null
                ? $"Se creó una membresía para el paciente {paciente.Nombre} {paciente.Apellido}."
                : $"Se creó una membresía para el paciente {pacienteId}.";

            await auditoriaService.RegistrarAsync(
                usuarioId,
                usuarioNombre,
                "Crear",
                "Membresia",
                membresia.Id.ToString(),
                detalleAuditoria,
                cancellationToken);

            return Results.Created(
                $"/api/membresias/{membresia.Id}",
                MembresiaMapper.ToResponse(membresia));
        })
        .RequireAuthorization("AdminOrOperador");

        // Listar todas las membresías
        app.MapGet("/api/membresias", async (
            ObtenerMembresiasService service,
            CancellationToken cancellationToken) =>
        {
            var membresias = await service.ObtenerAsync(
                cancellationToken);

            var response = membresias
                .Select(membresia => new
                {
                    id = membresia.Id,
                    pacienteId = membresia.PacienteId,
                    pacienteNombre = membresia.Paciente is null
                        ? ""
                        : $"{membresia.Paciente.Nombre} {membresia.Paciente.Apellido}",
                    fechaInicio = membresia.FechaInicio,
                    fechaVencimiento = membresia.FechaVencimiento,
                    estado = (int)membresia.Estado
                })
                .ToList();

            return Results.Ok(response);
        })
        .RequireAuthorization();

        // Listar membresías de un paciente
        app.MapGet("/api/pacientes/{pacienteId:guid}/membresias", async (
            Guid pacienteId,
            ObtenerMembresiasPorPacienteService service,
            CancellationToken cancellationToken) =>
        {
            var membresias = await service.ObtenerAsync(
                pacienteId,
                cancellationToken);

            var response = membresias
                .Select(MembresiaMapper.ToResponse)
                .ToList();

            return Results.Ok(response);
        })
        .RequireAuthorization();

        // Obtener membresía por ID
        app.MapGet("/api/membresias/{id:guid}", async (
            Guid id,
            ObtenerMembresiaPorIdService service,
            CancellationToken cancellationToken) =>
        {
            var membresia = await service.ObtenerAsync(
                id,
                cancellationToken);

            if (membresia is null)
            {
                return Results.NotFound(new
                {
                    error = "Membresía no encontrada."
                });
            }

            return Results.Ok(
                MembresiaMapper.ToResponse(membresia));
        })
        .RequireAuthorization();

        // Actualizar fechas de membresía
        app.MapPut("/api/membresias/{id:guid}", async (
            Guid id,
            ActualizarMembresiaRequest request,
            ActualizarMembresiaService service,
            AuditoriaService auditoriaService,
            HttpContext httpContext,
            CancellationToken cancellationToken) =>
        {
            var membresia = await service.ActualizarAsync(
                id,
                request,
                cancellationToken);

            if (membresia is null)
            {
                return Results.NotFound(new
                {
                    error = "Membresía no encontrada."
                });
            }

            var (usuarioId, usuarioNombre) =
                EndpointHelpers.ObtenerUsuarioAuditoria(httpContext);

            await auditoriaService.RegistrarAsync(
                usuarioId,
                usuarioNombre,
                "Actualizar",
                "Membresia",
                membresia.Id.ToString(),
                "Se actualizaron las fechas de una membresía.",
                cancellationToken);

            return Results.Ok(
                MembresiaMapper.ToResponse(membresia));
        })
        .RequireAuthorization("AdminOrOperador");

        // Actualizar estado de membresía
        app.MapPatch("/api/membresias/{id:guid}/estado", async (
            Guid id,
            ActualizarEstadoMembresiaRequest request,
            ActualizarEstadoMembresiaService service,
            AuditoriaService auditoriaService,
            HttpContext httpContext,
            CancellationToken cancellationToken) =>
        {
            var membresia = await service.ActualizarAsync(
                id,
                request,
                cancellationToken);

            if (membresia is null)
            {
                return Results.NotFound(new
                {
                    error = "Membresía no encontrada."
                });
            }

            var (usuarioId, usuarioNombre) =
                EndpointHelpers.ObtenerUsuarioAuditoria(httpContext);

            await auditoriaService.RegistrarAsync(
                usuarioId,
                usuarioNombre,
                "CambiarEstado",
                "Membresia",
                membresia.Id.ToString(),
                $"Se cambió el estado de la membresía a {membresia.Estado}.",
                cancellationToken);

            return Results.Ok(
                MembresiaMapper.ToResponse(membresia));
        })
        .RequireAuthorization("AdminOrOperador");

        return app;
    }
}
using DonMarcelino.Application.Auditoria;

namespace DonMarcelino.Api.Endpoints;

public static class AuditoriaEndpoints
{
    public static IEndpointRouteBuilder MapAuditoriaEndpoints(
        this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/auditorias", async (
            AuditoriaService service,
            CancellationToken cancellationToken) =>
        {
            var auditorias = await service.ObtenerTodasAsync(
                cancellationToken);

            var response = auditorias
                .Select(AuditoriaMapper.ToResponse)
                .ToList();

            return Results.Ok(response);
        })
        .RequireAuthorization("AdminOnly");

        return app;
    }
}
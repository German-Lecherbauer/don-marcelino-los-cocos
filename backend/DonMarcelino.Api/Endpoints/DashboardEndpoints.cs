using DonMarcelino.Application.Dashboard;

namespace DonMarcelino.Api.Endpoints;

public static class DashboardEndpoints
{
    public static IEndpointRouteBuilder MapDashboardEndpoints(
        this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/dashboard/resumen", async (
            ObtenerDashboardService service,
            CancellationToken cancellationToken) =>
        {
            var resumen = await service.ObtenerAsync(
                cancellationToken);

            return Results.Ok(resumen);
        })
        .RequireAuthorization();

        return app;
    }
}
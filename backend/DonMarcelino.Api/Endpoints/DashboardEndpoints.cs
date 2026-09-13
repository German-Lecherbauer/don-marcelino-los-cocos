using System.Security.Claims;
using DonMarcelino.Application.Dashboard;

namespace DonMarcelino.Api.Endpoints;

public static class DashboardEndpoints
{
    public static IEndpointRouteBuilder MapDashboardEndpoints(
        this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/dashboard/resumen", async (
            ClaimsPrincipal user,
            ObtenerDashboardService service,
            CancellationToken cancellationToken) =>
        {
            var rol = user.FindFirst(ClaimTypes.Role)?.Value;

            var esAdmin =
                rol == "1" ||
                string.Equals(
                    rol,
                    "Admin",
                    StringComparison.OrdinalIgnoreCase);

            var resumen = await service.ObtenerAsync(
                esAdmin,
                cancellationToken);

            return Results.Ok(resumen);
        })
        .RequireAuthorization();

        return app;
    }
}
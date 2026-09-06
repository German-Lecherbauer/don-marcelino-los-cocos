using System.Security.Claims;

namespace DonMarcelino.Api.Endpoints;

public static class EndpointHelpers
{
    public static (Guid UsuarioId, string UsuarioNombre)
        ObtenerUsuarioAuditoria(HttpContext context)
    {
        var idClaim =
            context.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? context.User.FindFirstValue("sub");

        if (!Guid.TryParse(idClaim, out var usuarioId))
        {
            throw new InvalidOperationException(
                "No se pudo identificar al usuario autenticado.");
        }

        var usuarioNombre =
            context.User.FindFirstValue(ClaimTypes.Name)
            ?? "Usuario desconocido";

        return (usuarioId, usuarioNombre);
    }
}
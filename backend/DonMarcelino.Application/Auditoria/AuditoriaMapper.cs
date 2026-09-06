using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Auditoria;

public static class AuditoriaMapper
{
    public static AuditoriaResponse ToResponse(
        DonMarcelino.Domain.Entities.Auditoria auditoria)
    {
        return new AuditoriaResponse
        {
            Id = auditoria.Id,
            UsuarioId = auditoria.UsuarioId,
            UsuarioNombre = auditoria.UsuarioNombre,
            Accion = auditoria.Accion,
            Entidad = auditoria.Entidad,
            EntidadId = auditoria.EntidadId,
            Detalle = auditoria.Detalle,
            Fecha = auditoria.Fecha
        };
    }
}
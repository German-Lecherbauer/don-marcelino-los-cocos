namespace DonMarcelino.Application.Auditoria;

public class AuditoriaResponse
{
    public Guid Id { get; set; }

    public Guid UsuarioId { get; set; }

    public string UsuarioNombre { get; set; } = string.Empty;

    public string Accion { get; set; } = string.Empty;

    public string Entidad { get; set; } = string.Empty;

    public string EntidadId { get; set; } = string.Empty;

    public string Detalle { get; set; } = string.Empty;

    public DateTime Fecha { get; set; }
}
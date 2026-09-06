namespace DonMarcelino.Application.Auditoria;

public class AuditoriaService
{
    private readonly IAuditoriaRepository _repository;

    public AuditoriaService(IAuditoriaRepository repository)
    {
        _repository = repository;
    }

    public Task RegistrarAsync(
        Guid usuarioId,
        string usuarioNombre,
        string accion,
        string entidad,
        string entidadId,
        string detalle,
        CancellationToken cancellationToken = default)
    {
        var auditoria = new DonMarcelino.Domain.Entities.Auditoria
        {
            Id = Guid.NewGuid(),
            UsuarioId = usuarioId,
            UsuarioNombre = usuarioNombre,
            Accion = accion,
            Entidad = entidad,
            EntidadId = entidadId,
            Detalle = detalle,
            Fecha = DateTime.UtcNow
        };

        return _repository.AgregarAsync(
            auditoria,
            cancellationToken);
    }

    public Task<List<DonMarcelino.Domain.Entities.Auditoria>> ObtenerTodasAsync(
        CancellationToken cancellationToken = default)
    {
        return _repository.ObtenerTodasAsync(cancellationToken);
    }
}
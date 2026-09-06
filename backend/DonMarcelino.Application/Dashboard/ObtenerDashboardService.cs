namespace DonMarcelino.Application.Dashboard;

public class ObtenerDashboardService
{
    private readonly IDashboardRepository _repository;

    public ObtenerDashboardService(IDashboardRepository repository)
    {
        _repository = repository;
    }

    public async Task<DashboardResumen> ObtenerAsync(
        CancellationToken cancellationToken = default)
    {
        var totalSocios =
            await _repository.ObtenerTotalSociosAsync(cancellationToken);

        var sociosActivos =
            await _repository.ObtenerSociosActivosAsync(cancellationToken);

        var membresiasActivas =
            await _repository.ObtenerMembresiasActivasAsync(cancellationToken);

        var membresiasVencidas =
            await _repository.ObtenerMembresiasVencidasAsync(cancellationToken);

        var usuariosActivos =
            await _repository.ObtenerUsuariosActivosAsync(cancellationToken);

        var auditorias =
            await _repository.ObtenerUltimasAuditoriasAsync(
                5,
                cancellationToken);

        return new DashboardResumen
        {
            TotalSocios = totalSocios,
            SociosActivos = sociosActivos,
            MembresiasActivas = membresiasActivas,
            MembresiasVencidas = membresiasVencidas,
            UsuariosActivos = usuariosActivos,

            UltimasAcciones = auditorias
                .Select(x => new DashboardAuditoriaItem
                {
                    UsuarioNombre = x.UsuarioNombre,
                    Accion = x.Accion,
                    Entidad = x.Entidad,
                    Detalle = x.Detalle,
                    Fecha = x.Fecha
                })
                .ToList()
        };
    }
}
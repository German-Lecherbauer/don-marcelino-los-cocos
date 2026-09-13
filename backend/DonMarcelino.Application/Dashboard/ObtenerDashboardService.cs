namespace DonMarcelino.Application.Dashboard;

public class ObtenerDashboardService
{
    private readonly IDashboardRepository _repository;

    public ObtenerDashboardService(IDashboardRepository repository)
    {
        _repository = repository;
    }

    public async Task<DashboardResumen> ObtenerAsync(
        bool incluirDatosAdministrativos,
        CancellationToken cancellationToken = default)
    {
        var totalPacientes =
            await _repository.ObtenerTotalPacientesAsync(cancellationToken);

        var pacientesActivos =
            await _repository.ObtenerPacientesActivosAsync(cancellationToken);

        var membresiasActivas =
            await _repository.ObtenerMembresiasActivasAsync(cancellationToken);

        var membresiasVencidas =
            await _repository.ObtenerMembresiasVencidasAsync(cancellationToken);

        var resumen = new DashboardResumen
        {
            TotalPacientes = totalPacientes,
            PacientesActivos = pacientesActivos,
            MembresiasActivas = membresiasActivas,
            MembresiasVencidas = membresiasVencidas
        };

        if (!incluirDatosAdministrativos)
        {
            return resumen;
        }

        resumen.UsuariosActivos =
            await _repository.ObtenerUsuariosActivosAsync(cancellationToken);

        var auditorias =
            await _repository.ObtenerUltimasAuditoriasAsync(
                5,
                cancellationToken);

        resumen.UltimasAcciones = auditorias
            .Select(x => new DashboardAuditoriaItem
            {
                UsuarioNombre = x.UsuarioNombre,
                Accion = x.Accion,
                Entidad = x.Entidad,
                Detalle = x.Detalle,
                Fecha = x.Fecha
            })
            .ToList();

        return resumen;
    }
}
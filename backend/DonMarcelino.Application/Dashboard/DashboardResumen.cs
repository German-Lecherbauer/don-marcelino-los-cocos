namespace DonMarcelino.Application.Dashboard;

public class DashboardResumen
{
    public int TotalSocios { get; set; }

    public int SociosActivos { get; set; }

    public int MembresiasActivas { get; set; }

    public int MembresiasVencidas { get; set; }

    public int UsuariosActivos { get; set; }

    public List<DashboardAuditoriaItem> UltimasAcciones { get; set; } = [];
}

public class DashboardAuditoriaItem
{
    public string UsuarioNombre { get; set; } = string.Empty;

    public string Accion { get; set; } = string.Empty;

    public string Entidad { get; set; } = string.Empty;

    public string Detalle { get; set; } = string.Empty;

    public DateTime Fecha { get; set; }
}
namespace DonMarcelino.Application.Socios;

public class DesactivarSocioService
{
    private readonly ISocioRepository _socioRepository;

    public DesactivarSocioService(ISocioRepository socioRepository)
    {
        _socioRepository = socioRepository;
    }

    public async Task<bool> DesactivarAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var socio = await _socioRepository.ObtenerPorIdAsync(id, cancellationToken);

        if (socio is null)
        {
            return false;
        }

        if (!socio.Activo)
        {
            return true;
        }

        await _socioRepository.DesactivarAsync(socio, cancellationToken);

        return true;
    }
}
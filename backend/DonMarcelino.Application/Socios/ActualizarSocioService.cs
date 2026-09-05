using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Socios;

public class ActualizarSocioService
{
    private readonly ISocioRepository _socioRepository;

    public ActualizarSocioService(ISocioRepository socioRepository)
    {
        _socioRepository = socioRepository;
    }

    public async Task<Socio?> ActualizarAsync(
        Guid id,
        ActualizarSocioRequest request,
        CancellationToken cancellationToken = default)
    {
        var socio = await _socioRepository.ObtenerPorIdAsync(id, cancellationToken);

        if (socio is null)
            return null;

        var email = request.Email.Trim().ToLowerInvariant();
        var documento = request.Documento.Trim();

        if (email != socio.Email &&
            await _socioRepository.ExistePorEmailAsync(email, cancellationToken))
        {
            throw new InvalidOperationException("Ya existe un socio con ese email.");
        }

        if (documento != socio.Documento &&
            await _socioRepository.ExistePorDocumentoAsync(documento, cancellationToken))
        {
            throw new InvalidOperationException("Ya existe un socio con ese documento.");
        }

        socio.Nombre = request.Nombre.Trim();
        socio.Apellido = request.Apellido.Trim();
        socio.Email = email;
        socio.Documento = documento;

        await _socioRepository.ActualizarAsync(socio, cancellationToken);

        return socio;
    }
}
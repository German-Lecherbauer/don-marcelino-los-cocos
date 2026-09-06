using DonMarcelino.Application.Common.Exceptions;
using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Socios;

public class CrearSocioService
{
    private readonly ISocioRepository _socioRepository;

    public CrearSocioService(ISocioRepository socioRepository)
    {
        _socioRepository = socioRepository;
    }

    public async Task<Socio> CrearAsync(
        CrearSocioRequest request,
        CancellationToken cancellationToken = default)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var documento = request.Documento.Trim();

        if (await _socioRepository.ExistePorEmailAsync(email, cancellationToken))
        {
            throw new BusinessRuleException(
                "Ya existe un socio con ese email.");
        }

        if (await _socioRepository.ExistePorDocumentoAsync(documento, cancellationToken))
        {
            throw new BusinessRuleException(
                "Ya existe un socio con ese documento.");
        }

        var socio = new Socio
        {
            Id = Guid.NewGuid(),
            Nombre = request.Nombre.Trim(),
            Apellido = request.Apellido.Trim(),
            Email = email,
            Documento = documento,
            FechaAlta = DateTime.UtcNow,
            Activo = true
        };

        await _socioRepository.AgregarAsync(
            socio,
            cancellationToken);

        return socio;
    }
}
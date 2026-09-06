using System.Net.Mail;
using DonMarcelino.Application.Common.Exceptions;
using DonMarcelino.Domain.Entities;

namespace DonMarcelino.Application.Pacientes;

public class ActualizarPacienteService
{
    private readonly IPacienteRepository _pacienteRepository;

    public ActualizarPacienteService(
        IPacienteRepository pacienteRepository)
    {
        _pacienteRepository = pacienteRepository;
    }

    public async Task<Paciente?> ActualizarAsync(
        Guid id,
        ActualizarPacienteRequest request,
        CancellationToken cancellationToken = default)
    {
        var paciente = await _pacienteRepository.ObtenerPorIdAsync(
            id,
            cancellationToken);

        if (paciente is null)
        {
            return null;
        }

        if (string.IsNullOrWhiteSpace(request.Nombre))
        {
            throw new BusinessRuleException(
                "El nombre es obligatorio.");
        }

        if (string.IsNullOrWhiteSpace(request.Apellido))
        {
            throw new BusinessRuleException(
                "El apellido es obligatorio.");
        }

        if (string.IsNullOrWhiteSpace(request.Email))
        {
            throw new BusinessRuleException(
                "El email es obligatorio.");
        }

        if (string.IsNullOrWhiteSpace(request.Documento))
        {
            throw new BusinessRuleException(
                "El documento es obligatorio.");
        }

        var nombre = request.Nombre.Trim();
        var apellido = request.Apellido.Trim();
        var email = request.Email.Trim().ToLowerInvariant();
        var documento = request.Documento.Trim();

        if (!EsEmailValido(email))
        {
            throw new BusinessRuleException(
                "El email no tiene un formato válido.");
        }

        if (email != paciente.Email &&
            await _pacienteRepository.ExistePorEmailAsync(
                email,
                cancellationToken))
        {
            throw new BusinessRuleException(
                "Ya existe un paciente con ese email.");
        }

        if (documento != paciente.Documento &&
            await _pacienteRepository.ExistePorDocumentoAsync(
                documento,
                cancellationToken))
        {
            throw new BusinessRuleException(
                "Ya existe un paciente con ese documento.");
        }

        paciente.Nombre = nombre;
        paciente.Apellido = apellido;
        paciente.Email = email;
        paciente.Documento = documento;

        await _pacienteRepository.ActualizarAsync(
            paciente,
            cancellationToken);

        return paciente;
    }

    private static bool EsEmailValido(string email)
    {
        try
        {
            var address = new MailAddress(email);
            return address.Address == email;
        }
        catch
        {
            return false;
        }
    }
}
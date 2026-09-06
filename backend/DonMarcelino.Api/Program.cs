using System.Security.Claims;
using System.Text;
using DonMarcelino.Api.Auth;
using DonMarcelino.Api.Middleware;
using DonMarcelino.Application.Auditoria;
using DonMarcelino.Application.Auth;
using DonMarcelino.Application.Dashboard;
using DonMarcelino.Application.Membresias;
using DonMarcelino.Application.Pacientes;
using DonMarcelino.Application.Usuarios;
using DonMarcelino.Domain.Entities;
using DonMarcelino.Infrastructure.Persistence;
using DonMarcelino.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddDbContext<DonMarcelinoDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// Pacientes
builder.Services.AddScoped<IPacienteRepository, PacienteRepository>();
builder.Services.AddScoped<CrearPacienteService>();
builder.Services.AddScoped<ObtenerPacientesService>();
builder.Services.AddScoped<ObtenerPacientePorIdService>();
builder.Services.AddScoped<ActualizarPacienteService>();
builder.Services.AddScoped<DesactivarPacienteService>();

// Membresías
builder.Services.AddScoped<IMembresiaRepository, MembresiaRepository>();
builder.Services.AddScoped<CrearMembresiaService>();
builder.Services.AddScoped<ObtenerMembresiasPorPacienteService>();
builder.Services.AddScoped<ObtenerMembresiaPorIdService>();
builder.Services.AddScoped<ActualizarMembresiaService>();
builder.Services.AddScoped<ActualizarEstadoMembresiaService>();

// Usuarios
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<CrearUsuarioService>();
builder.Services.AddScoped<ObtenerUsuariosService>();
builder.Services.AddScoped<ObtenerUsuarioPorIdService>();
builder.Services.AddScoped<ActualizarRolUsuarioService>();
builder.Services.AddScoped<CambiarEstadoUsuarioService>();
builder.Services.AddScoped<PasswordHasher<Usuario>>();

// Auditoría
builder.Services.AddScoped<IAuditoriaRepository, AuditoriaRepository>();
builder.Services.AddScoped<AuditoriaService>();

// Dashboard
builder.Services.AddScoped<IDashboardRepository, DashboardRepository>();
builder.Services.AddScoped<ObtenerDashboardService>();

// Auth
builder.Services.AddScoped<LoginService>();
builder.Services.AddScoped<JwtTokenGenerator>();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = builder.Configuration["Jwt:Key"]
            ?? throw new InvalidOperationException(
                "JWT Key no configurada.");

        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer =
                    builder.Configuration["Jwt:Issuer"],

                ValidAudience =
                    builder.Configuration["Jwt:Audience"],

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(key)
                    ),

                ClockSkew = TimeSpan.Zero
            };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireRole("Admin"));

    options.AddPolicy("AdminOrOperador", policy =>
        policy.RequireRole("Admin", "Operador"));

    options.AddPolicy("Authenticated", policy =>
        policy.RequireAuthenticatedUser());
});

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

static (Guid UsuarioId, string UsuarioNombre) ObtenerUsuarioAuditoria(
    HttpContext context)
{
    var idClaim =
        context.User.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? context.User.FindFirstValue("sub");

    if (!Guid.TryParse(idClaim, out var usuarioId))
    {
        throw new InvalidOperationException(
            "No se pudo identificar al usuario autenticado.");
    }

    var usuarioNombre =
        context.User.FindFirstValue(ClaimTypes.Name)
        ?? "Usuario desconocido";

    return (usuarioId, usuarioNombre);
}

// Health
app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        status = "ok",
        service = "DonMarcelino.Api",
        timestamp = DateTime.UtcNow
    });
});

// Crear paciente
app.MapPost("/api/pacientes", async (
    CrearPacienteRequest request,
    CrearPacienteService service,
    AuditoriaService auditoriaService,
    HttpContext httpContext,
    CancellationToken cancellationToken) =>
{
    var paciente = await service.CrearAsync(
        request,
        cancellationToken);

    var (usuarioId, usuarioNombre) =
        ObtenerUsuarioAuditoria(httpContext);

    await auditoriaService.RegistrarAsync(
        usuarioId,
        usuarioNombre,
        "Crear",
        "Paciente",
        paciente.Id.ToString(),
        $"Se creó el paciente {paciente.Nombre} {paciente.Apellido}.",
        cancellationToken);

    return Results.Created(
        $"/api/pacientes/{paciente.Id}",
        PacienteMapper.ToResponse(paciente));
})
.RequireAuthorization("AdminOrOperador");

// Listar pacientes
app.MapGet("/api/pacientes", async (
    ObtenerPacientesService service,
    CancellationToken cancellationToken) =>
{
    var pacientes = await service.ObtenerAsync(
        cancellationToken);

    var response = pacientes
        .Select(PacienteMapper.ToResponse)
        .ToList();

    return Results.Ok(response);
})
.RequireAuthorization();

// Obtener paciente por ID
app.MapGet("/api/pacientes/{id:guid}", async (
    Guid id,
    ObtenerPacientePorIdService service,
    CancellationToken cancellationToken) =>
{
    var paciente = await service.ObtenerAsync(
        id,
        cancellationToken);

    if (paciente is null)
    {
        return Results.NotFound(new
        {
            error = "Paciente no encontrado."
        });
    }

    return Results.Ok(
        PacienteMapper.ToResponse(paciente));
})
.RequireAuthorization();

// Actualizar paciente
app.MapPut("/api/pacientes/{id:guid}", async (
    Guid id,
    ActualizarPacienteRequest request,
    ActualizarPacienteService service,
    AuditoriaService auditoriaService,
    HttpContext httpContext,
    CancellationToken cancellationToken) =>
{
    var paciente = await service.ActualizarAsync(
        id,
        request,
        cancellationToken);

    if (paciente is null)
    {
        return Results.NotFound(new
        {
            error = "Paciente no encontrado."
        });
    }

    var (usuarioId, usuarioNombre) =
        ObtenerUsuarioAuditoria(httpContext);

    await auditoriaService.RegistrarAsync(
        usuarioId,
        usuarioNombre,
        "Actualizar",
        "Paciente",
        paciente.Id.ToString(),
        $"Se actualizó el paciente {paciente.Nombre} {paciente.Apellido}.",
        cancellationToken);

    return Results.Ok(
        PacienteMapper.ToResponse(paciente));
})
.RequireAuthorization("AdminOrOperador");

// Baja lógica de paciente
app.MapDelete("/api/pacientes/{id:guid}", async (
    Guid id,
    DesactivarPacienteService service,
    AuditoriaService auditoriaService,
    HttpContext httpContext,
    CancellationToken cancellationToken) =>
{
    var desactivado = await service.DesactivarAsync(
        id,
        cancellationToken);

    if (!desactivado)
    {
        return Results.NotFound(new
        {
            error = "Paciente no encontrado."
        });
    }

    var (usuarioId, usuarioNombre) =
        ObtenerUsuarioAuditoria(httpContext);

    await auditoriaService.RegistrarAsync(
        usuarioId,
        usuarioNombre,
        "Desactivar",
        "Paciente",
        id.ToString(),
        "Se desactivó un paciente.",
        cancellationToken);

    return Results.NoContent();
})
.RequireAuthorization("AdminOrOperador");

// Crear membresía
app.MapPost("/api/pacientes/{pacienteId:guid}/membresias", async (
    Guid pacienteId,
    CrearMembresiaRequest request,
    CrearMembresiaService service,
    AuditoriaService auditoriaService,
    HttpContext httpContext,
    CancellationToken cancellationToken) =>
{
    var membresia = await service.CrearAsync(
        pacienteId,
        request,
        cancellationToken);

    var (usuarioId, usuarioNombre) =
        ObtenerUsuarioAuditoria(httpContext);

    await auditoriaService.RegistrarAsync(
        usuarioId,
        usuarioNombre,
        "Crear",
        "Membresia",
        membresia.Id.ToString(),
        $"Se creó una membresía para el paciente {pacienteId}.",
        cancellationToken);

    return Results.Created(
        $"/api/membresias/{membresia.Id}",
        MembresiaMapper.ToResponse(membresia));
})
.RequireAuthorization("AdminOrOperador");

// Listar membresías de un paciente
app.MapGet("/api/pacientes/{pacienteId:guid}/membresias", async (
    Guid pacienteId,
    ObtenerMembresiasPorPacienteService service,
    CancellationToken cancellationToken) =>
{
    var membresias = await service.ObtenerAsync(
        pacienteId,
        cancellationToken);

    var response = membresias
        .Select(MembresiaMapper.ToResponse)
        .ToList();

    return Results.Ok(response);
})
.RequireAuthorization();

// Obtener membresía por ID
app.MapGet("/api/membresias/{id:guid}", async (
    Guid id,
    ObtenerMembresiaPorIdService service,
    CancellationToken cancellationToken) =>
{
    var membresia = await service.ObtenerAsync(
        id,
        cancellationToken);

    if (membresia is null)
    {
        return Results.NotFound(new
        {
            error = "Membresía no encontrada."
        });
    }

    return Results.Ok(
        MembresiaMapper.ToResponse(membresia));
})
.RequireAuthorization();

// Actualizar fechas de membresía
app.MapPut("/api/membresias/{id:guid}", async (
    Guid id,
    ActualizarMembresiaRequest request,
    ActualizarMembresiaService service,
    AuditoriaService auditoriaService,
    HttpContext httpContext,
    CancellationToken cancellationToken) =>
{
    var membresia = await service.ActualizarAsync(
        id,
        request,
        cancellationToken);

    if (membresia is null)
    {
        return Results.NotFound(new
        {
            error = "Membresía no encontrada."
        });
    }

    var (usuarioId, usuarioNombre) =
        ObtenerUsuarioAuditoria(httpContext);

    await auditoriaService.RegistrarAsync(
        usuarioId,
        usuarioNombre,
        "Actualizar",
        "Membresia",
        membresia.Id.ToString(),
        "Se actualizaron las fechas de una membresía.",
        cancellationToken);

    return Results.Ok(
        MembresiaMapper.ToResponse(membresia));
})
.RequireAuthorization("AdminOrOperador");

// Actualizar estado de membresía
app.MapPatch("/api/membresias/{id:guid}/estado", async (
    Guid id,
    ActualizarEstadoMembresiaRequest request,
    ActualizarEstadoMembresiaService service,
    AuditoriaService auditoriaService,
    HttpContext httpContext,
    CancellationToken cancellationToken) =>
{
    var membresia = await service.ActualizarAsync(
        id,
        request,
        cancellationToken);

    if (membresia is null)
    {
        return Results.NotFound(new
        {
            error = "Membresía no encontrada."
        });
    }

    var (usuarioId, usuarioNombre) =
        ObtenerUsuarioAuditoria(httpContext);

    await auditoriaService.RegistrarAsync(
        usuarioId,
        usuarioNombre,
        "CambiarEstado",
        "Membresia",
        membresia.Id.ToString(),
        $"Se cambió el estado de la membresía a {membresia.Estado}.",
        cancellationToken);

    return Results.Ok(
        MembresiaMapper.ToResponse(membresia));
})
.RequireAuthorization("AdminOrOperador");

// Crear usuario
app.MapPost("/api/usuarios", async (
    CrearUsuarioRequest request,
    CrearUsuarioService service,
    AuditoriaService auditoriaService,
    HttpContext httpContext,
    CancellationToken cancellationToken) =>
{
    var usuario = await service.CrearAsync(
        request,
        cancellationToken);

    var (usuarioId, usuarioNombre) =
        ObtenerUsuarioAuditoria(httpContext);

    await auditoriaService.RegistrarAsync(
        usuarioId,
        usuarioNombre,
        "Crear",
        "Usuario",
        usuario.Id.ToString(),
        $"Se creó el usuario {usuario.Email} con rol {usuario.Rol}.",
        cancellationToken);

    return Results.Created(
        $"/api/usuarios/{usuario.Id}",
        UsuarioMapper.ToResponse(usuario));
})
.RequireAuthorization("AdminOnly");

// Listar usuarios
app.MapGet("/api/usuarios", async (
    ObtenerUsuariosService service,
    CancellationToken cancellationToken) =>
{
    var usuarios = await service.ObtenerAsync(
        cancellationToken);

    var response = usuarios
        .Select(UsuarioMapper.ToResponse)
        .ToList();

    return Results.Ok(response);
})
.RequireAuthorization("AdminOnly");

// Obtener usuario por ID
app.MapGet("/api/usuarios/{id:guid}", async (
    Guid id,
    ObtenerUsuarioPorIdService service,
    CancellationToken cancellationToken) =>
{
    var usuario = await service.ObtenerAsync(
        id,
        cancellationToken);

    if (usuario is null)
    {
        return Results.NotFound(new
        {
            error = "Usuario no encontrado."
        });
    }

    return Results.Ok(
        UsuarioMapper.ToResponse(usuario));
})
.RequireAuthorization("AdminOnly");

// Actualizar rol de usuario
app.MapPatch("/api/usuarios/{id:guid}/rol", async (
    Guid id,
    ActualizarRolUsuarioRequest request,
    ActualizarRolUsuarioService service,
    AuditoriaService auditoriaService,
    HttpContext httpContext,
    CancellationToken cancellationToken) =>
{
    var usuario = await service.ActualizarAsync(
        id,
        request,
        cancellationToken);

    if (usuario is null)
    {
        return Results.NotFound(new
        {
            error = "Usuario no encontrado."
        });
    }

    var (usuarioId, usuarioNombre) =
        ObtenerUsuarioAuditoria(httpContext);

    await auditoriaService.RegistrarAsync(
        usuarioId,
        usuarioNombre,
        "CambiarRol",
        "Usuario",
        usuario.Id.ToString(),
        $"Se cambió el rol de {usuario.Email} a {usuario.Rol}.",
        cancellationToken);

    return Results.Ok(
        UsuarioMapper.ToResponse(usuario));
})
.RequireAuthorization("AdminOnly");

// Activar o desactivar usuario
app.MapPatch("/api/usuarios/{id:guid}/estado", async (
    Guid id,
    bool activo,
    CambiarEstadoUsuarioService service,
    AuditoriaService auditoriaService,
    HttpContext httpContext,
    CancellationToken cancellationToken) =>
{
    var usuario = await service.CambiarAsync(
        id,
        activo,
        cancellationToken);

    if (usuario is null)
    {
        return Results.NotFound(new
        {
            error = "Usuario no encontrado."
        });
    }

    var (usuarioId, usuarioNombre) =
        ObtenerUsuarioAuditoria(httpContext);

    await auditoriaService.RegistrarAsync(
        usuarioId,
        usuarioNombre,
        activo ? "Activar" : "Desactivar",
        "Usuario",
        usuario.Id.ToString(),
        activo
            ? $"Se activó el usuario {usuario.Email}."
            : $"Se desactivó el usuario {usuario.Email}.",
        cancellationToken);

    return Results.Ok(
        UsuarioMapper.ToResponse(usuario));
})
.RequireAuthorization("AdminOnly");

// Listar auditorías
app.MapGet("/api/auditorias", async (
    AuditoriaService service,
    CancellationToken cancellationToken) =>
{
    var auditorias = await service.ObtenerTodasAsync(
        cancellationToken);

    return Results.Ok(auditorias);
})
.RequireAuthorization("AdminOnly");

// Dashboard
app.MapGet("/api/dashboard/resumen", async (
    ObtenerDashboardService service,
    CancellationToken cancellationToken) =>
{
    var resumen = await service.ObtenerAsync(
        cancellationToken);

    return Results.Ok(resumen);
})
.RequireAuthorization();

// Login
app.MapPost("/api/auth/login", async (
    LoginRequest request,
    LoginService loginService,
    JwtTokenGenerator tokenGenerator,
    CancellationToken cancellationToken) =>
{
    var usuario = await loginService.LoginAsync(
        request,
        cancellationToken);

    var token = tokenGenerator.Generate(usuario);

    return Results.Ok(new
    {
        token,
        usuario = UsuarioMapper.ToResponse(usuario)
    });
});

app.Run();
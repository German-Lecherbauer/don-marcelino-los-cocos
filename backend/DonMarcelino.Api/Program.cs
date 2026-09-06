using DonMarcelino.Api.Middleware;
using DonMarcelino.Application.Membresias;
using DonMarcelino.Application.Socios;
using DonMarcelino.Infrastructure.Persistence;
using DonMarcelino.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddDbContext<DonMarcelinoDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// Socios
builder.Services.AddScoped<ISocioRepository, SocioRepository>();
builder.Services.AddScoped<CrearSocioService>();
builder.Services.AddScoped<ObtenerSociosService>();
builder.Services.AddScoped<ObtenerSocioPorIdService>();
builder.Services.AddScoped<ActualizarSocioService>();
builder.Services.AddScoped<DesactivarSocioService>();

// Membresías
builder.Services.AddScoped<IMembresiaRepository, MembresiaRepository>();
builder.Services.AddScoped<CrearMembresiaService>();
builder.Services.AddScoped<ObtenerMembresiasPorSocioService>();
builder.Services.AddScoped<ObtenerMembresiaPorIdService>();
builder.Services.AddScoped<ActualizarMembresiaService>();
builder.Services.AddScoped<ActualizarEstadoMembresiaService>();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

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

// Crear socio
app.MapPost("/api/socios", async (
    CrearSocioRequest request,
    CrearSocioService service,
    CancellationToken cancellationToken) =>
{
    var socio = await service.CrearAsync(
        request,
        cancellationToken);

    return Results.Created(
        $"/api/socios/{socio.Id}",
        socio);
});

// Listar socios
app.MapGet("/api/socios", async (
    ObtenerSociosService service,
    CancellationToken cancellationToken) =>
{
    var socios = await service.ObtenerAsync(
        cancellationToken);

    return Results.Ok(socios);
});

// Obtener socio por ID
app.MapGet("/api/socios/{id:guid}", async (
    Guid id,
    ObtenerSocioPorIdService service,
    CancellationToken cancellationToken) =>
{
    var socio = await service.ObtenerAsync(
        id,
        cancellationToken);

    if (socio is null)
    {
        return Results.NotFound(new
        {
            error = "Socio no encontrado."
        });
    }

    return Results.Ok(socio);
});

// Actualizar socio
app.MapPut("/api/socios/{id:guid}", async (
    Guid id,
    ActualizarSocioRequest request,
    ActualizarSocioService service,
    CancellationToken cancellationToken) =>
{
    var socio = await service.ActualizarAsync(
        id,
        request,
        cancellationToken);

    if (socio is null)
    {
        return Results.NotFound(new
        {
            error = "Socio no encontrado."
        });
    }

    return Results.Ok(socio);
});

// Baja lógica de socio
app.MapDelete("/api/socios/{id:guid}", async (
    Guid id,
    DesactivarSocioService service,
    CancellationToken cancellationToken) =>
{
    var desactivado = await service.DesactivarAsync(
        id,
        cancellationToken);

    if (!desactivado)
    {
        return Results.NotFound(new
        {
            error = "Socio no encontrado."
        });
    }

    return Results.NoContent();
});

// Crear membresía
app.MapPost("/api/socios/{socioId:guid}/membresias", async (
    Guid socioId,
    CrearMembresiaRequest request,
    CrearMembresiaService service,
    CancellationToken cancellationToken) =>
{
    var membresia = await service.CrearAsync(
        socioId,
        request,
        cancellationToken);

    return Results.Created(
        $"/api/socios/{socioId}/membresias/{membresia.Id}",
        membresia);
});

// Listar membresías de un socio
app.MapGet("/api/socios/{socioId:guid}/membresias", async (
    Guid socioId,
    ObtenerMembresiasPorSocioService service,
    CancellationToken cancellationToken) =>
{
    var membresias = await service.ObtenerAsync(
        socioId,
        cancellationToken);

    return Results.Ok(membresias);
});

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

    return Results.Ok(membresia);
});

// Actualizar fechas de membresía
app.MapPut("/api/membresias/{id:guid}", async (
    Guid id,
    ActualizarMembresiaRequest request,
    ActualizarMembresiaService service,
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

    return Results.Ok(membresia);
});

// Actualizar estado de membresía
app.MapPatch("/api/membresias/{id:guid}/estado", async (
    Guid id,
    ActualizarEstadoMembresiaRequest request,
    ActualizarEstadoMembresiaService service,
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

    return Results.Ok(membresia);
});

app.Run();
using DonMarcelino.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using DonMarcelino.Application.Socios;
using DonMarcelino.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddDbContext<DonMarcelinoDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

builder.Services.AddScoped<ISocioRepository, SocioRepository>();
builder.Services.AddScoped<CrearSocioService>();

builder.Services.AddScoped<ObtenerSociosService>();

builder.Services.AddScoped<ObtenerSocioPorIdService>();

builder.Services.AddScoped<ActualizarSocioService>();

builder.Services.AddScoped<DesactivarSocioService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        status = "ok",
        service = "DonMarcelino.Api",
        timestamp = DateTime.UtcNow
    });
});

app.MapPost("/api/socios", async (
    CrearSocioRequest request,
    CrearSocioService service,
    CancellationToken cancellationToken) =>
{
    try
    {
        var socio = await service.CrearAsync(request, cancellationToken);

        return Results.Created($"/api/socios/{socio.Id}", socio);
    }
    catch (InvalidOperationException ex)
    {
        return Results.BadRequest(new
        {
            error = ex.Message
        });
    }
});

app.MapGet("/api/socios", async (
    ObtenerSociosService service,
    CancellationToken cancellationToken) =>
{
    var socios = await service.ObtenerAsync(cancellationToken);

    return Results.Ok(socios);
});

app.MapGet("/api/socios/{id:guid}", async (
    Guid id,
    ObtenerSocioPorIdService service,
    CancellationToken cancellationToken) =>
{
    var socio = await service.ObtenerAsync(id, cancellationToken);

    if (socio is null)
    {
        return Results.NotFound(new
        {
            error = "Socio no encontrado."
        });
    }

    return Results.Ok(socio);
});

app.MapPut("/api/socios/{id:guid}", async (
    Guid id,
    ActualizarSocioRequest request,
    ActualizarSocioService service,
    CancellationToken cancellationToken) =>
{
    try
    {
        var socio = await service.ActualizarAsync(id, request, cancellationToken);

        if (socio is null)
        {
            return Results.NotFound(new
            {
                error = "Socio no encontrado."
            });
        }

        return Results.Ok(socio);
    }
    catch (InvalidOperationException ex)
    {
        return Results.BadRequest(new
        {
            error = ex.Message
        });
    }
});

app.MapDelete("/api/socios/{id:guid}", async (
    Guid id,
    DesactivarSocioService service,
    CancellationToken cancellationToken) =>
{
    var desactivado = await service.DesactivarAsync(id, cancellationToken);

    if (!desactivado)
    {
        return Results.NotFound(new
        {
            error = "Socio no encontrado."
        });
    }

    return Results.NoContent();
});

app.Run();
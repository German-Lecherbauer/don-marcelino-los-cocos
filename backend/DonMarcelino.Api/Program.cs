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

app.Run();
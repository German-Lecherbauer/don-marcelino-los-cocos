using System.Text;
using DonMarcelino.Api.Auth;
using DonMarcelino.Api.Endpoints;
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

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

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
builder.Services.AddScoped<ObtenerMembresiasService>();

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

app.UseCors("Frontend");

app.UseAuthentication();
app.UseAuthorization();

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

// Endpoints
app.MapPacientesEndpoints();
app.MapMembresiasEndpoints();
app.MapUsuariosEndpoints();
app.MapAuditoriaEndpoints();
app.MapDashboardEndpoints();
app.MapAuthEndpoints();

app.Run();
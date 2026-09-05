using DonMarcelino.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace DonMarcelino.Infrastructure.Persistence;

public class DonMarcelinoDbContext : DbContext
{
    public DonMarcelinoDbContext(
        DbContextOptions<DonMarcelinoDbContext> options)
        : base(options)
    {
    }

    public DbSet<Socio> Socios => Set<Socio>();

    public DbSet<Membresia> Membresias => Set<Membresia>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(DonMarcelinoDbContext).Assembly
        );
    }
}
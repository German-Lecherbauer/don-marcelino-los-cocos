using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DonMarcelino.Infrastructure.Persistence;

public class DonMarcelinoDbContextFactory
    : IDesignTimeDbContextFactory<DonMarcelinoDbContext>
{
    public DonMarcelinoDbContext CreateDbContext(string[] args)
    {
        var connectionString =
            Environment.GetEnvironmentVariable(
                "ConnectionStrings__DefaultConnection");

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "No se encontró la variable de entorno " +
                "'ConnectionStrings__DefaultConnection'.");
        }

        var optionsBuilder =
            new DbContextOptionsBuilder<DonMarcelinoDbContext>();

        optionsBuilder.UseNpgsql(connectionString);

        return new DonMarcelinoDbContext(
            optionsBuilder.Options);
    }
}
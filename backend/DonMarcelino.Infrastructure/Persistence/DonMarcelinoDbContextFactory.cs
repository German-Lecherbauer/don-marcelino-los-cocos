using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace DonMarcelino.Infrastructure.Persistence;

public class DonMarcelinoDbContextFactory
    : IDesignTimeDbContextFactory<DonMarcelinoDbContext>
{
    public DonMarcelinoDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<DonMarcelinoDbContext>();

        optionsBuilder.UseNpgsql(
            "Host=localhost;Port=5432;Database=donmarcelino;Username=donmarcelino;Password=donmarcelino_dev"
        );

        return new DonMarcelinoDbContext(optionsBuilder.Options);
    }
}
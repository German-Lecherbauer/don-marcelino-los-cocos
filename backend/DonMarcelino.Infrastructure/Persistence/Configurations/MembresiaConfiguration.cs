using DonMarcelino.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DonMarcelino.Infrastructure.Persistence.Configurations;

public class MembresiaConfiguration : IEntityTypeConfiguration<Membresia>
{
    public void Configure(EntityTypeBuilder<Membresia> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Estado)
            .IsRequired();

        builder.Property(x => x.FechaInicio)
            .IsRequired();

        builder.Property(x => x.FechaVencimiento)
            .IsRequired();
    }
}
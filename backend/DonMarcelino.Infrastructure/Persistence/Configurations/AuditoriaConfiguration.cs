using DonMarcelino.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DonMarcelino.Infrastructure.Persistence.Configurations;

public class AuditoriaConfiguration : IEntityTypeConfiguration<Auditoria>
{
    public void Configure(EntityTypeBuilder<Auditoria> builder)
    {
        builder.ToTable("Auditorias");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.UsuarioNombre)
            .IsRequired()
            .HasMaxLength(150);

        builder.Property(x => x.Accion)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.Entidad)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.EntidadId)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(x => x.Detalle)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(x => x.Fecha)
            .IsRequired();
    }
}
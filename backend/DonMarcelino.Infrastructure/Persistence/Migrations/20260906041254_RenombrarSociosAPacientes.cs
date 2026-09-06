using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DonMarcelino.Infrastructure.Persistence.Migrations
{
    public partial class RenombrarSociosAPacientes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Membresias_Socios_SocioId",
                table: "Membresias");

            migrationBuilder.RenameTable(
                name: "Socios",
                newName: "Pacientes");

            migrationBuilder.RenameColumn(
                name: "SocioId",
                table: "Membresias",
                newName: "PacienteId");

            migrationBuilder.RenameIndex(
                name: "IX_Membresias_SocioId",
                table: "Membresias",
                newName: "IX_Membresias_PacienteId");

            migrationBuilder.RenameIndex(
                name: "IX_Socios_Email",
                table: "Pacientes",
                newName: "IX_Pacientes_Email");

            migrationBuilder.RenameIndex(
                name: "IX_Socios_Documento",
                table: "Pacientes",
                newName: "IX_Pacientes_Documento");

            migrationBuilder.AddForeignKey(
                name: "FK_Membresias_Pacientes_PacienteId",
                table: "Membresias",
                column: "PacienteId",
                principalTable: "Pacientes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Membresias_Pacientes_PacienteId",
                table: "Membresias");

            migrationBuilder.RenameIndex(
                name: "IX_Pacientes_Email",
                table: "Pacientes",
                newName: "IX_Socios_Email");

            migrationBuilder.RenameIndex(
                name: "IX_Pacientes_Documento",
                table: "Pacientes",
                newName: "IX_Socios_Documento");

            migrationBuilder.RenameColumn(
                name: "PacienteId",
                table: "Membresias",
                newName: "SocioId");

            migrationBuilder.RenameIndex(
                name: "IX_Membresias_PacienteId",
                table: "Membresias",
                newName: "IX_Membresias_SocioId");

            migrationBuilder.RenameTable(
                name: "Pacientes",
                newName: "Socios");

            migrationBuilder.AddForeignKey(
                name: "FK_Membresias_Socios_SocioId",
                table: "Membresias",
                column: "SocioId",
                principalTable: "Socios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
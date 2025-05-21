using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MentorWayProject.Migrations
{
    /// <inheritdoc />
    public partial class UpdateCourseEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Comentarii",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "Curs_ID",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "Evaluare",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "Utilizator_ID",
                table: "Feedbacks");

            migrationBuilder.DropColumn(
                name: "Disponibilitate",
                table: "Cursuri");

            migrationBuilder.DropColumn(
                name: "Profesor_ID",
                table: "Cursuri");

            migrationBuilder.RenameColumn(
                name: "Nume",
                table: "Utilizatori",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Feedbacks",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "Nume",
                table: "Cursuri",
                newName: "Titlu");

            migrationBuilder.AddColumn<string>(
                name: "Profesor",
                table: "Cursuri",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Profesor",
                table: "Cursuri");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Utilizatori",
                newName: "Nume");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Feedbacks",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "Titlu",
                table: "Cursuri",
                newName: "Nume");

            migrationBuilder.AddColumn<string>(
                name: "Comentarii",
                table: "Feedbacks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Curs_ID",
                table: "Feedbacks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Evaluare",
                table: "Feedbacks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Utilizator_ID",
                table: "Feedbacks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Disponibilitate",
                table: "Cursuri",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Profesor_ID",
                table: "Cursuri",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}

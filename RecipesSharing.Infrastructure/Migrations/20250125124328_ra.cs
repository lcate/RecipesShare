using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipesSharing.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ra : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeAppliances_Recipes_RecipeFk",
                table: "RecipeAppliances");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeAppliances_Recipes_RecipeFk",
                table: "RecipeAppliances",
                column: "RecipeFk",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeAppliances_Recipes_RecipeFk",
                table: "RecipeAppliances");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeAppliances_Recipes_RecipeFk",
                table: "RecipeAppliances",
                column: "RecipeFk",
                principalTable: "Recipes",
                principalColumn: "Id");
        }
    }
}

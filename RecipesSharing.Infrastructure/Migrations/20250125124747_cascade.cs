using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipesSharing.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class cascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredients_Recipes_RecipeFk",
                table: "RecipeIngredients");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredients_Recipes_RecipeFk",
                table: "RecipeIngredients",
                column: "RecipeFk",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeIngredients_Recipes_RecipeFk",
                table: "RecipeIngredients");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeIngredients_Recipes_RecipeFk",
                table: "RecipeIngredients",
                column: "RecipeFk",
                principalTable: "Recipes",
                principalColumn: "Id");
        }
    }
}

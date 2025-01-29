using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipesSharing.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class cascadeStep : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeSteps_Recipes_RecipeFk",
                table: "RecipeSteps");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeSteps_Recipes_RecipeFk",
                table: "RecipeSteps",
                column: "RecipeFk",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeSteps_Recipes_RecipeFk",
                table: "RecipeSteps");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeSteps_Recipes_RecipeFk",
                table: "RecipeSteps",
                column: "RecipeFk",
                principalTable: "Recipes",
                principalColumn: "Id");
        }
    }
}

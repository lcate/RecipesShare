using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipesSharing.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class initrecipes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "varchar(450)", nullable: false),
                    FirstName = table.Column<string>(type: "varchar(450)", nullable: true),
                    LastName = table.Column<string>(type: "varchar(450)", nullable: true),
                    About = table.Column<string>(type: "varchar(450)", nullable: true),
                    ProfilePicture = table.Column<string>(type: "varchar(450)", nullable: true),
                    Address = table.Column<string>(type: "varchar(450)", nullable: true),
                    JoinDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UserName = table.Column<string>(type: "varchar(450)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "varchar(450)", nullable: true),
                    Email = table.Column<string>(type: "varchar(450)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "varchar(450)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "varchar(450)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "varchar(450)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "varchar(450)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "varchar(450)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Ingredients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(150)", nullable: false),
                    IsAllergen = table.Column<bool>(type: "bit", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "varchar(150)", nullable: false),
                    Image = table.Column<string>(type: "varchar(MAX)", nullable: false),
                    UserFk = table.Column<string>(type: "varchar(450)", nullable: false),
                    PreparationTime = table.Column<int>(type: "int", nullable: false),
                    MealType = table.Column<int>(type: "int", nullable: false),
                    DietaryPreferences = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recipes_AspNetUsers_UserFk",
                        column: x => x.UserFk,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserFk = table.Column<string>(type: "varchar(450)", nullable: false),
                    RecipeFk = table.Column<int>(type: "int", nullable: false),
                    Stars = table.Column<int>(type: "int", nullable: true),
                    Comment = table.Column<string>(type: "varchar(450)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ratings_AspNetUsers_UserFk",
                        column: x => x.UserFk,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Ratings_Recipes_RecipeFk",
                        column: x => x.RecipeFk,
                        principalTable: "Recipes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RecipeAppliances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecipeFk = table.Column<int>(type: "int", nullable: false),
                    ApplianceType = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeAppliances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecipeAppliances_Recipes_RecipeFk",
                        column: x => x.RecipeFk,
                        principalTable: "Recipes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RecipeIngredients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IngredientFk = table.Column<int>(type: "int", nullable: false),
                    RecipeFk = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    MeasurementUnit = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeIngredients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecipeIngredients_Ingredients_IngredientFk",
                        column: x => x.IngredientFk,
                        principalTable: "Ingredients",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_RecipeIngredients_Recipes_RecipeFk",
                        column: x => x.RecipeFk,
                        principalTable: "Recipes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "RecipeSteps",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecipeFk = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "varchar(MAX)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeSteps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecipeSteps_Recipes_RecipeFk",
                        column: x => x.RecipeFk,
                        principalTable: "Recipes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_RecipeFk",
                table: "Ratings",
                column: "RecipeFk");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_UserFk",
                table: "Ratings",
                column: "UserFk");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeAppliances_RecipeFk",
                table: "RecipeAppliances",
                column: "RecipeFk");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeIngredients_IngredientFk",
                table: "RecipeIngredients",
                column: "IngredientFk");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeIngredients_RecipeFk",
                table: "RecipeIngredients",
                column: "RecipeFk");

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_UserFk",
                table: "Recipes",
                column: "UserFk");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeSteps_RecipeFk",
                table: "RecipeSteps",
                column: "RecipeFk");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ratings");

            migrationBuilder.DropTable(
                name: "RecipeAppliances");

            migrationBuilder.DropTable(
                name: "RecipeIngredients");

            migrationBuilder.DropTable(
                name: "RecipeSteps");

            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.DropTable(
                name: "Recipes");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}

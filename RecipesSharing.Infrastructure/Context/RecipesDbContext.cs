namespace RecipesSharing.Infrastructure.Context
{
    using Microsoft.EntityFrameworkCore;
    using RecipesSharing.Domain.Entities;
    using System.Drawing;

    public class RecipesDbContext : DbContext
    {
        public RecipesDbContext(DbContextOptions<RecipesDbContext> options) : base(options) { }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<RecipeAppliance> RecipeAppliances { get; set; }
        public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
        public DbSet<RecipeStep> RecipeSteps { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            // Will create the size of the column in the database as varchar(150) - where not specified
            foreach (var property in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetProperties()
                    .Where(p => p.ClrType == typeof(string))))
                property.SetColumnType("varchar(450)");

            // For each mapping class that we had configured, it will be registered through this command
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(RecipesDbContext).Assembly);

            base.OnModelCreating(modelBuilder);
        }
    }
}

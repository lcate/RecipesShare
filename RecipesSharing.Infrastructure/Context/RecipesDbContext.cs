namespace RecipesSharing.Infrastructure.Context
{
    using Microsoft.EntityFrameworkCore;
    using RecipesSharing.Domain.Entities;
    using System.Linq;

    public class RecipesDbContext : DbContext
    {
        public RecipesDbContext(DbContextOptions<RecipesDbContext> options) : base(options) { }

        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<RecipeAppliance> RecipeAppliances { get; set; }
        public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
        public DbSet<RecipeStep> RecipeSteps { get; set; }

        // You can still add AppUser to DbSet to track related data, but EF Core will use the same AspNetUsers table
        public DbSet<AppUser> AppUsers { get; set; } // Optional, can be removed if you don't want direct access

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

            // Map AppUser to the existing AspNetUsers table from RepositoryContext
            modelBuilder.Entity<AppUser>().ToTable("AspNetUsers");

            // For each mapping class that we had configured, it will be registered through this command
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(RecipesDbContext).Assembly);

            base.OnModelCreating(modelBuilder);
        }
    }
}

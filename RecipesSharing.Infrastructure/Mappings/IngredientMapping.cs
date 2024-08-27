using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Infrastructure.Mappings
{
    public class IngredientMapping : IEntityTypeConfiguration<Ingredient>
    {
        public void Configure(EntityTypeBuilder<Ingredient> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasColumnType("varchar(150)");

            builder.Property(c => c.IsAllergen)
                .IsRequired();

            builder.Property(c => c.DeletedOn)
                .IsRequired(false);

            // relations
            builder.HasMany(c => c.RecipeIngredients)
                .WithOne(b => b.Ingredient)
                .HasForeignKey(b => b.IngredientFk)
                .OnDelete(DeleteBehavior.NoAction);

            builder.ToTable("Ingredients");
        }
    }
}

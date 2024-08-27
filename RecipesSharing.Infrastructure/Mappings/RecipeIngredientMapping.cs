using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Infrastructure.Mappings
{
    internal class RecipeIngredientMapping : IEntityTypeConfiguration<RecipeIngredient>
    {
        public void Configure(EntityTypeBuilder<RecipeIngredient> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.IngredientFk)
                .IsRequired();

            builder.Property(c => c.RecipeFk)
                .IsRequired();

            builder.Property(c => c.Quantity)
                .IsRequired();

            builder.Property(c => c.MeasurementUnit)
                .IsRequired()
                .HasConversion<int>();

            builder.Property(c => c.DeletedOn)
                .IsRequired(false);

            builder.ToTable("RecipeIngredients");
        }
    }
}

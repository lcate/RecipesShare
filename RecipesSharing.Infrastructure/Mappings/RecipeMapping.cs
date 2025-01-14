using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Infrastructure.Mappings
{
    public class RecipeMapping : IEntityTypeConfiguration<Recipe>
    {
        public void Configure(EntityTypeBuilder<Recipe> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasColumnType("varchar(150)");

            builder.Property(c => c.Image)
                .IsRequired()
                .HasColumnType("varchar(MAX)");

            builder.Property(c => c.UserFk)
                .IsRequired()
                .HasColumnType("varchar(450)");

            builder.Property(c => c.PreparationTime)
                .IsRequired();

            builder.Property(c => c.MealType)
                .IsRequired()
                .HasConversion<int>();

            builder.Property(c => c.DietaryPreferences)
                .IsRequired()
                .HasConversion<int>();

            builder.Property(c => c.DeletedOn)
                .IsRequired(false);

            builder.ToTable("Recipes");
        }
    }
}

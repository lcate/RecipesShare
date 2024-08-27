using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Infrastructure.Mappings
{
    public class RecipeApplianceMapping : IEntityTypeConfiguration<RecipeAppliance>
    {
        public void Configure(EntityTypeBuilder<RecipeAppliance> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.RecipeFk)
                .IsRequired();

            builder.Property(c => c.ApplianceType)
                .IsRequired()
                .HasConversion<int>();

            builder.Property(c => c.DeletedOn)
                .IsRequired(false);

            builder.ToTable("RecipeAppliances");
        }
    }
}

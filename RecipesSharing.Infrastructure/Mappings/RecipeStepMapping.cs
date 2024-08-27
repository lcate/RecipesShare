using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Infrastructure.Mappings
{
    internal class RecipeStepMapping : IEntityTypeConfiguration<RecipeStep>
    {
        public void Configure(EntityTypeBuilder<RecipeStep> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Text)
                .IsRequired()
                .HasColumnType("varchar(MAX)");

            builder.Property(c => c.RecipeFk)
                .IsRequired();


            builder.Property(c => c.DeletedOn)
                .IsRequired(false);

            builder.ToTable("RecipeSteps");
        }
    }
}

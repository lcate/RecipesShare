using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Infrastructure.Mappings
{
    public class RatingMapping : IEntityTypeConfiguration<Rating>
    {
        public void Configure(EntityTypeBuilder<Rating> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.UserFk)
                .IsRequired();

            builder.Property(c => c.RecipeFk)
                .IsRequired();

            builder.Property(c => c.Stars)
                .IsRequired();

            builder.Property(c => c.DeletedOn)
                .IsRequired(false);

            builder.ToTable("Ratings");
        }
    }
}

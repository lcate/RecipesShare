using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Infrastructure.Mappings
{
    public class CommentMapping : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.UserFk)
                .IsRequired()
                .HasColumnType("varchar(450)");

            builder.Property(c => c.RecipeFk)
                .IsRequired();

            builder.Property(c => c.Text)
                .IsRequired()
                .HasColumnType("varchar(500)");
            
            builder.Property(c => c.DeletedOn)
                .IsRequired(false);

            builder.ToTable("Comments");
        }
    }
}

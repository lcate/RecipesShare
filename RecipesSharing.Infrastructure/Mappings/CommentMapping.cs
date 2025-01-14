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

            // relations
            builder.HasOne(c => c.Recipe)
                .WithMany(b => b.Comments)
                .HasForeignKey(b => b.RecipeFk)
                .OnDelete(DeleteBehavior.NoAction);

            builder.ToTable("Comments");
        }
    }
}

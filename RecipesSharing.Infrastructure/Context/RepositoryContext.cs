using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Infrastructure.Context
{
    public class RepositoryContext : IdentityDbContext<User>
    {   
        public RepositoryContext(DbContextOptions options)
        : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }

    }
}

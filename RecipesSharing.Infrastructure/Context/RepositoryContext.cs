using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Infrastructure.Context
{
    public class RepositoryContext : IdentityDbContext<AppUser, IdentityRole, string>
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options) : base(options)
        {
        }
    }
}

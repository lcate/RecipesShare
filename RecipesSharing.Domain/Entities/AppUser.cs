using Microsoft.AspNetCore.Identity;

namespace RecipesSharing.Domain.Entities
{
    public class AppUser : IdentityUser
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public IEnumerable<Recipe> Recipes { get; set; }

        public IEnumerable<Comment> Comments { get; set; }

    }
}

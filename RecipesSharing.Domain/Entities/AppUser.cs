using Microsoft.AspNetCore.Identity;

namespace RecipesSharing.Domain.Entities
{
    public class AppUser : IdentityUser
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? About { get; set; }

        public string? ProfilePicture { get; set; }

        public string? Address { get; set; }

        public DateTime? JoinDate { get; set; }

        public IEnumerable<Recipe> Recipes { get; set; }

        public IEnumerable<Comment> Comments { get; set; }

    }
}

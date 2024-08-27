using RecipesSharing.Domain.Entities;

namespace RecipesSharing.API.Model.DTO
{
    public class AuthResponseDto
    {
        public bool IsAuthSuccessful { get; set; }
        public string? ErrorMessage { get; set; }
        public string? Token { get; set; }
        public AppUser User { get; set; }
    }
}

using RecipesSharing.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace RecipesSharing.API.Model.DTO.Rating
{
    public class RatingAddDto
    {
        [Required(ErrorMessage = "The field {0} is required")]
        public AppUser User { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public int RecipeId { get; set; }

        public int? Stars { get; set; }

        public string? Comment { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public DateTime CreatedAt { get; set; }
    }
}

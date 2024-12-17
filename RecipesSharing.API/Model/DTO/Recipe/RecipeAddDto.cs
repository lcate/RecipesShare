using RecipesSharing.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace RecipesSharing.API.Model.DTO.Recipe
{
    public class RecipeAddDto
    {
        [Required(ErrorMessage = "The field {0} is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public string Image { get; set; }
        
        [Required(ErrorMessage = "The field {0} is required")]
        public string UserFk { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public int PreparationTime { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public int MealType { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public int DietaryPreferences { get; set; }
    }
}

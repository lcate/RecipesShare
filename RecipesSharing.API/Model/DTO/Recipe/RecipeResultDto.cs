using RecipesSharing.Domain.Enums;

namespace RecipesSharing.API.Model.DTO.Recipe
{
    public class RecipeResultDto
    {       
        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string UserFk { get; set; }

        public int PreparationTime { get; set; }

        public MealType MealType { get; set; }

        public DietaryPreferences DietaryPreferences { get; set; }
    }
}

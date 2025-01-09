using RecipesSharing.Domain.Entities;
using RecipesSharing.Domain.Enums;

namespace RecipesSharing.API.Model.DTO.Recipe
{
    public class RecipeWithStepsDto
    {
        public RecipeWithStepsDto(
            int id,
            string name,
            string image,
            string userFk,
            int preparationTime,
            MealType mealType,
            DietaryPreferences dietaryPreferences,
            ICollection<string> recipeSteps,
            ICollection<string> recipeAppliances,
            AppUser? user)
        {
            Id = id;
            Name = name;
            Image = image;
            UserFk = userFk;
            PreparationTime = preparationTime;
            MealType = mealType;
            DietaryPreferences = dietaryPreferences;
            RecipeSteps = recipeSteps;
            RecipeAppliances = recipeAppliances;
            User = user;
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public string UserFk { get; set; }

        public int PreparationTime { get; set; }

        public MealType MealType { get; set; }

        public DietaryPreferences DietaryPreferences { get; set; }

        public ICollection<string> RecipeSteps { get; set; } = new List<string>();

        public ICollection<string> RecipeAppliances { get; set; } = new List<string>();

        public AppUser? User { get; set; }
    }
}

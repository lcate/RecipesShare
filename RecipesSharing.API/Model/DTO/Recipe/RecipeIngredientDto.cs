using RecipesSharing.Domain.Enums;

namespace RecipesSharing.API.Model.DTO.Recipe
{
    public class RecipeIngredientDto
    {
        public string IngredientName { get; set; }

        public int Quantity { get; set; }

        public MeasurementUnit MeasurementUnit { get; set; }
    }
}

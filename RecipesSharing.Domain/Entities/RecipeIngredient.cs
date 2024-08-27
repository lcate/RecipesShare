namespace RecipesSharing.Domain.Entities
{
    using RecipesSharing.Domain.Enums;
    using System.ComponentModel.DataAnnotations.Schema;

    public class RecipeIngredient : BaseEntity
    {
        public int IngredientFk { get; set; }

        public int RecipeFk { get; set; }

        public int Quantity { get; set; }

        public MeasurementUnit MeasurementUnit { get; set; }

        [ForeignKey("RecipeFk")]
        public virtual Recipe Recipe { get; set; }

        [ForeignKey("IngredientFk")]
        public virtual Ingredient Ingredient { get; set; }
    }
}

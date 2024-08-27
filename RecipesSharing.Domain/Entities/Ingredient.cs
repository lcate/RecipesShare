namespace RecipesSharing.Domain.Entities
{
    public class Ingredient : BaseEntity
    {
        public string Name { get; set; }

        public bool IsAllergen { get; set; }

        public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();
    }
}

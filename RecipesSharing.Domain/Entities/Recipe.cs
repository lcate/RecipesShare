namespace RecipesSharing.Domain.Entities
{
    using RecipesSharing.Domain.Enums;
    using System.ComponentModel.DataAnnotations.Schema;
    using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

    public class Recipe : BaseEntity
    {
        public string Name { get; set; }

        public string Image { get; set; }

        public string UserFk { get; set; }

        public int PreparationTime {  get; set; }

        public MealType MealType { get; set; }

        public DietaryPreferences DietaryPreferences { get; set; }

        [ForeignKey("UserFk")]
        public virtual AppUser? User { get; set; }

        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

        public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

        public virtual ICollection<RecipeAppliance> RecipeAppliances { get; set; } = new List<RecipeAppliance>();

        public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; } = new List<RecipeIngredient>();

        public virtual ICollection<RecipeStep> RecipeSteps { get; set; } = new List<RecipeStep>();
    }
}

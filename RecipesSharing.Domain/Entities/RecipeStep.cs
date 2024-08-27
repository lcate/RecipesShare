using System.ComponentModel.DataAnnotations.Schema;

namespace RecipesSharing.Domain.Entities
{
    public class RecipeStep : BaseEntity
    {
        public int RecipeFk { get; set; }

        public string Text { get; set; }

        [ForeignKey("RecipeFk")]
        public virtual Recipe Recipe { get; set; }
    }
}

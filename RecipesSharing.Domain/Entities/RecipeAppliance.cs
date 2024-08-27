namespace RecipesSharing.Domain.Entities
{
    using RecipesSharing.Domain.Enums;
    using System.ComponentModel.DataAnnotations.Schema;

    public class RecipeAppliance : BaseEntity
    {
        public int RecipeFk { get; set; }

        public ApplianceType ApplianceType { get; set; }

        [ForeignKey("RecipeFk")]
        public virtual Recipe Recipe { get; set; }
    }
}

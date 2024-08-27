using System.ComponentModel.DataAnnotations.Schema;

namespace RecipesSharing.Domain.Entities
{
    public class Rating : BaseEntity
    {
        public string UserFk { get; set; }

        public int RecipeFk { get; set; }

        public int Stars { get; set; }

        [ForeignKey("RecipeFk")]
        public virtual Recipe Recipe { get; set; }

        [ForeignKey("UserFk")]
        public virtual AppUser User { get; set; }
    }
}

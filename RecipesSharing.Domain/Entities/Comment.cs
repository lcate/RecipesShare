using System.ComponentModel.DataAnnotations.Schema;

namespace RecipesSharing.Domain.Entities
{
    public class Comment : BaseEntity
    {
        public string UserFk { get; set; }

        public int RecipeFk { get; set; }

        public string Text { get; set; }

        [ForeignKey("RecipeFk")]
        public virtual Recipe Recipe { get; set; }

        [ForeignKey("UserFk")]
        public virtual AppUser User { get; set; }
    }
}

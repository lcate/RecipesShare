using System.ComponentModel.DataAnnotations;

namespace RecipesSharing.API.Model.DTO.Comment
{
    public class CommentEditDto
    {
        [Required(ErrorMessage = "The field {0} is required")]
        public int Id { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public string UserId { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public string RecipeId { get; set; }

        public string Text { get; set; }

    }
}

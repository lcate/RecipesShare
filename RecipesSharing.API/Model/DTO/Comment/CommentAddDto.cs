using System.ComponentModel.DataAnnotations;

namespace RecipesSharing.API.Model.DTO.Comment
{
    public class CommentAddDto
    {
        [Required(ErrorMessage = "The field {0} is required")]
        public int RecipeId { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public string UserEmail { get; set; }

        public string Text { get; set; }

    }
}

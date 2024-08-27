namespace RecipesSharing.API.Model.DTO.Comment
{
    public class CommentResultDto
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public string RecipeId { get; set; }

        public string Text { get; set; }
    }
}

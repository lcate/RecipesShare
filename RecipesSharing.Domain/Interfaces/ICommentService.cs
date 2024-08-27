using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Domain.Interfaces
{
    public interface ICommentService : IDisposable
    {
        Task<IEnumerable<Comment>> GetAll();
        Task<Comment> GetById(int id);
        Task<Comment> Add(Comment comment);
        Task<Comment> Update(Comment comment);
        Task<bool> Remove(Comment comment);
        Task<List<Comment>> GetCommentsByRecipeId(int recipeId);
    }
}

using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Domain.Interfaces
{
    public interface ICommentRepository : IRepository<Comment>
    {
        new Task<List<Comment>> GetAll();

        new Task<Comment> GetById(int id);

        Task<List<Comment>> GetCommentsByRecipeId(int jobApplicationId);

    }
}

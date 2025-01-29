using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Domain.Interfaces
{
    public interface IRatingRepository : IRepository<Rating>
    {
        Task<Rating> GetById(int id);

        Task<List<Rating>> GetRatingsForRecipeId(int recipeId);
    }
}

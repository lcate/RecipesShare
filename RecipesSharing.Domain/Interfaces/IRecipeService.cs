using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Domain.Interfaces
{
    public interface IRecipeService : IDisposable
    {
        Task<IEnumerable<Recipe>> GetAll();
        Task<Recipe> GetById(int id);
        Task<Recipe> Add(Recipe recipe);
        Task<Recipe> Update(Recipe recipe);
        Task<bool> Remove(Recipe recipe);
        Task<List<Recipe>> GetRecipesByUserId(string userId);
    }
}

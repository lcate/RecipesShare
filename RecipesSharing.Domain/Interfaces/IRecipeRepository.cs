using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Domain.Interfaces
{
    public interface IRecipeRepository : IRepository<Recipe>
    {
        new Task<List<Recipe>> GetAll();

        new Task<Recipe> GetById(int id);

        Task<List<Recipe>> GetRecipesByUserId(string userId);
    }
}

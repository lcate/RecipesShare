using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Domain.Interfaces
{
    public interface IIngredientService : IDisposable
    {
        Task<IEnumerable<Ingredient>> GetAll();
        Task<Ingredient> GetById(int id);
        Task<Ingredient> GetByName(string name);
        Task<Ingredient> Add(Ingredient ingredient);
        Task<Ingredient> Update(Ingredient ingredient);
    }
}

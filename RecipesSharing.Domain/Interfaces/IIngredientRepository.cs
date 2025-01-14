using RecipesSharing.Domain.Entities;

namespace RecipesSharing.Domain.Interfaces
{
    public interface IIngredientRepository : IRepository<Ingredient>
    {
        new Task<List<Ingredient>> GetAll();

        new Task<Ingredient?> GetById(int id);

        new Task<Ingredient?> GetByName(string id);
    }
}

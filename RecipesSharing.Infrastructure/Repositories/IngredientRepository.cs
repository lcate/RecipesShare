using Microsoft.EntityFrameworkCore;
using RecipesSharing.Domain.Entities;
using RecipesSharing.Domain.Interfaces;
using RecipesSharing.Infrastructure.Context;

namespace RecipesSharing.Infrastructure.Repositories
{
    public class IngredientRepository : Repository<Ingredient>, IIngredientRepository
    {
        public IngredientRepository(RecipesDbContext context): base(context) { }

        public override async Task<List<Ingredient>> GetAll()
        {
            return await Db.Ingredients
                .OrderBy(c => c.Id)
                .ToListAsync();
        }

        public override async Task<Ingredient?> GetById(int id)
        {
            Ingredient? ingredient = await Db.Ingredients
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            return ingredient;
        }

        public async Task<Ingredient?> GetByName(string name)
        {
            return await Db.Ingredients
                .Where(x => x.Name == name)
                .FirstOrDefaultAsync();
        }
    }
}

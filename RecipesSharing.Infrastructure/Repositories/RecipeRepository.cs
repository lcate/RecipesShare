using Microsoft.EntityFrameworkCore;
using RecipesSharing.Domain.Entities;
using RecipesSharing.Domain.Interfaces;
using RecipesSharing.Infrastructure.Context;

namespace RecipesSharing.Infrastructure.Repositories
{
    public class RecipeRepository : Repository<Recipe>, IRecipeRepository
    {
        public RecipeRepository(RecipesDbContext context): base(context) { }

        public override async Task<List<Recipe>> GetAll()
        {
            List<Recipe> jobOffers = await Db.Recipes
                .OrderBy(c => c.Id)
                .ToListAsync();
            return jobOffers;
        }

        public override async Task<Recipe> GetById(int id)
        {
            Recipe jobOffer = await Db.Recipes
                .Where(b => b.Id == id)
                .FirstOrDefaultAsync();
            return jobOffer;
        }

        public async Task<List<Recipe>> GetRecipesByUserId(string userId)
        {
            List<Recipe> jobOffers = await Db.Recipes
                .Where(b => b.UserFk == userId)
                .ToListAsync();
            return jobOffers;
        }
    }
}

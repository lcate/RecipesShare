using Microsoft.EntityFrameworkCore;
using RecipesSharing.Domain.Entities;
using RecipesSharing.Domain.Interfaces;
using RecipesSharing.Infrastructure.Context;

namespace RecipesSharing.Infrastructure.Repositories
{
    public class RatingRepository : Repository<Rating>, IRatingRepository
    {
        public RatingRepository(RecipesDbContext context): base(context) { }

        public async Task<List<Rating>> GetRatingsForRecipeId(int recipeId)
        {
            return await Db.Ratings
                .Where(b => b.RecipeFk == recipeId)
                .ToListAsync();
        }

        public async Task<Rating> GetById(int id)
        {
            return await Db.Ratings.FindAsync(id);
        }
    }
}

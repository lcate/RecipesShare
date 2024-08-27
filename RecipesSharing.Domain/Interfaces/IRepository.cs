using RecipesSharing.Domain.Entities;
using System.Linq.Expressions;

namespace RecipesSharing.Domain.Interfaces
{
    public interface IRepository<TEntity> : IDisposable where TEntity : BaseEntity
    {
        // for adding a new entity
        Task Add(TEntity entity);

        // to get all records for the entity
        Task<List<TEntity>> GetAll();

        // to get an entity by it’s Id
        Task<TEntity> GetById(int id);

        // to update an entity
        Task Update(TEntity entity);

        // to delete an entity
        Task Remove(TEntity entity);

        // exactly the same way we use the where with linq
        Task<IEnumerable<TEntity>> Search(Expression<Func<TEntity, bool>> predicate);

        // save the changes of the entity
        // return an int, that will be the number of lines that were affected by the save action
        Task<int> SaveChanges();
    }
}

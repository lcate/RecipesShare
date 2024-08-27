namespace RecipesSharing.Domain.Entities
{
    public abstract class BaseEntity
    {
        public int Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? DeletedOn { get; set; }
    }
}

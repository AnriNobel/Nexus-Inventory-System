using NexusInventory.Domain.Entities;

namespace NexusInventory.Application.Interfaces;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllAsync();
    Task<Product?> GetByIdAsync(int id);
    Task AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(int id);
    Task<IEnumerable<Product>> SearchAsync(string? name, decimal? minPrice, decimal? maxPrice);
}

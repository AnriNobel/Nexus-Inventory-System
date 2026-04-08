using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using NexusInventory.Application.Interfaces;
using NexusInventory.Domain.Entities;

namespace NexusInventory.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _repo;
    private readonly IMemoryCache _cache;
    private const string CacheKey = "products_all";

    public ProductsController(IProductRepository repo, IMemoryCache cache) {
        _repo = repo;
        _cache = cache;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() {
        if (!_cache.TryGetValue(CacheKey, out IEnumerable<Product>? products)) {
            products = await _repo.GetAllAsync();
            _cache.Set(CacheKey, products, TimeSpan.FromMinutes(5));
        }
        return Ok(products);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string? name, [FromQuery] decimal? min, [FromQuery] decimal? max) {
        return Ok(await _repo.SearchAsync(name, min, max));
    }

    [HttpPost]
    public async Task<IActionResult> Create(Product product) {
        await _repo.AddAsync(product);
        _cache.Remove(CacheKey);
        return CreatedAtAction(nameof(GetAll), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Product product) {
        if (id != product.Id) return BadRequest();
        await _repo.UpdateAsync(product);
        _cache.Remove(CacheKey);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id) {
        await _repo.DeleteAsync(id);
        _cache.Remove(CacheKey);
        return NoContent();
    }
}

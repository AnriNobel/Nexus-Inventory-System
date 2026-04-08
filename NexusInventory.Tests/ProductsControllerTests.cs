using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Moq;
using NexusInventory.Api.Controllers;
using NexusInventory.Application.Interfaces;
using NexusInventory.Domain.Entities;
using Xunit;

namespace NexusInventory.Tests;

public class ProductsControllerTests
{
    private readonly Mock<IProductRepository> _mockRepo;
    private readonly Mock<IMemoryCache> _mockCache;
    private readonly ProductsController _controller;

    public ProductsControllerTests()
    {
        _mockRepo = new Mock<IProductRepository>();
        _mockCache = new Mock<IMemoryCache>();
        _controller = new ProductsController(_mockRepo.Object, _mockCache.Object);
    }

    [Fact]
    public async Task GetAll_ReturnsOkResult_WithListOfProducts()
    {
        // Arrange
        var products = new List<Product> { new Product { Id = 1, Name = "Test" } };
        _mockRepo.Setup(repo => repo.GetAllAsync()).ReturnsAsync(products);
        
        object? cacheEntry = products;
        _mockCache.Setup(m => m.CreateEntry(It.IsAny<object>())).Returns(Mock.Of<ICacheEntry>());

        // Act
        var result = await _controller.GetAll();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, okResult.StatusCode);
    }
}

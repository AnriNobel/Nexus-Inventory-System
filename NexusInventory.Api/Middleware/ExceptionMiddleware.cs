using System.Net;
using System.Text.Json;

namespace NexusInventory.Api.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try { await _next(context); }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred.");
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = new { 
                statusCode = context.Response.StatusCode,
                message = "Internal Server Error from the custom middleware.",
                detailed = ex.Message 
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}

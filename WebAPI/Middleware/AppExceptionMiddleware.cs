using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace WebAPI.Middleware
{
    public class AppExceptionMiddleware
    {
        private readonly RequestDelegate _request;
        private readonly ILogger<AppExceptionMiddleware> _logger;
        private readonly IHostEnvironment _environment;
        public AppExceptionMiddleware(RequestDelegate req, ILogger<AppExceptionMiddleware> logger,
            IHostEnvironment environment)
        {
            _environment = environment;
            _logger = logger;
            _request = req;
        }

        public async Task InvokeAsync(HttpContext httpcontext)
        {
            try
            {
                await _request(httpcontext);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                httpcontext.Response.ContentType = "application/json";
                httpcontext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _environment.IsDevelopment()
                    ? new AppException(httpcontext.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new AppException(httpcontext.Response.StatusCode, "Application server error");

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var json = JsonSerializer.Serialize(response, options);

                await httpcontext.Response.WriteAsync(json);
            }
        }
    }
}


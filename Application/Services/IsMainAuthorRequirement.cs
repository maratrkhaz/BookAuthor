using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Services
{
    public class IsMainAuthorRequirement : IAuthorizationRequirement
    {
    }

    public class IsMainAuthorRequirementHandler : AuthorizationHandler<IsMainAuthorRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsMainAuthorRequirementHandler(DataContext dbContext,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsMainAuthorRequirement requirement)
        {

            var user = _dbContext.Users
                .FirstOrDefault(x => x.UserName == context.User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (user == null) return Task.CompletedTask;

            var userId = user.Id;

            var bookId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var bookAuthor = _dbContext.BookAuthors
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.AppUserId == userId && x.BookId == bookId)
                .Result;

            if (bookAuthor == null) return Task.CompletedTask;

            if (bookAuthor.IsMainAuthor) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}

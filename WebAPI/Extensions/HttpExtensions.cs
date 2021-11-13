using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace WebAPI.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPagingHeader(this HttpResponse resp, int curPage,
           int itemsPerPage, int totalItems, int totalPages)
        {
            var pagingHeader = new
            {
                curPage,
                itemsPerPage,
                totalItems,
                totalPages
            };
            resp.Headers.Add("Paging", JsonSerializer.Serialize(pagingHeader));
            resp.Headers.Add("Access-Control-Expose-Headers", "Paging");
        }
    }
}

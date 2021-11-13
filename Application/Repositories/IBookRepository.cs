using Application.Core;
using Application.Domain;
using Application.Resources;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public interface IBookRepository
    {
        Task<Result<Book>> GetBookByIdAsync(Guid id);
        Task<Result<PageList<BookDto>>> GetBooksAsync(PageParams param);
        Task<IReadOnlyList<Category>> GetBookCategoriesAsync();
        Task<Result<Book>> AddAsync(Book book);
        Task<Result<Book>> EditAsync(Book book);
        Task<Result<Book>> DeleteAsync(Guid id);
    }
}

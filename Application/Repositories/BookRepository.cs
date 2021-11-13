using Application.Core;
using Application.Domain;
using Application.Resources;
using Application.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUser _currentUser;

        //public PageParams Params { get; set; }

        public BookRepository(DataContext context, IMapper mapper, ICurrentUser currentUser)
        {
            _context = context;
            _mapper = mapper;
            _currentUser = currentUser;
        }

        public async Task<Result<PageList<BookDto>>> GetBooksAsync(PageParams param)
        {
            var query = _context.Books
                .Include(x => x.Category)
                .ProjectTo<BookDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            return Result<PageList<BookDto>>
                .Success(await PageList<BookDto>.CreateAsync(query, param.PageNumber, param.PageSize));
        }

        public async Task<Result<Book>> GetBookByIdAsync(Guid id)
        {
            var currentBook = await _context.Books
                .Include(b => b.Category)
                .FirstOrDefaultAsync(x => x.BookId == id);

            if (currentBook == null) return Result<Book>.Failure("The book is not found.");

            return Result<Book>.Success(currentBook);
        }

        public async Task<Result<Book>> AddAsync(Book book)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(x => x.CategoryId == book.CategoryId);
            if (category == null)
                return Result<Book>.Failure("A book category is not found.");

            _context.Books.Add(book);

            var curUser = await _context.Users.SingleOrDefaultAsync(x => x.UserName == "mark");
            //var curUser = await _context.Users.SingleOrDefaultAsync(x => 
            //    x.UserName == _currentUser.GetCurrentUsername());


            var bookAuthor = new BookAuthor
            {
                Book = book,
                AppUser = curUser,
                IsMainAuthor = true
            };

            _context.BookAuthors.Add(bookAuthor);

            var success = await _context.SaveChangesAsync() > 0;
            
            if (success) return Result<Book>.Success(book);

            return Result<Book>.Failure("Errors were detected while saving a book");
        }

        public async Task<Result<Book>> EditAsync(Book book)
        {
            var category = await _context.Categories.SingleOrDefaultAsync(x => x.CategoryId == book.CategoryId);
            if (category == null)
                return Result<Book>.Failure("A book category is not found.");

            var currentBook = await _context.Books.FindAsync(book.BookId);

            if (currentBook == null) return Result<Book>.Failure("The book is not found.");

            //_mapper.Map(book, currentBook);
            currentBook.CategoryId = book.CategoryId;
            currentBook.Title = book.Title;
            currentBook.Description = book.Description;


            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Book>.Failure("Failed to update book.");

            return Result<Book>.Success(book);
        }

        public async Task<Result<Book>> DeleteAsync(Guid id)
        {
            var currentBook = await _context.Books.FindAsync(id);

            if (currentBook == null) return Result<Book>.Failure("The book is not found.");

            _context.Remove(currentBook);

            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return Result<Book>.Failure("Failed to delete book.");

            return Result<Book>.Success(currentBook);
        }

       

        public Task<IReadOnlyList<Category>> GetBookCategoriesAsync()
        {
            throw new NotImplementedException();
        }

       

       
    }
}

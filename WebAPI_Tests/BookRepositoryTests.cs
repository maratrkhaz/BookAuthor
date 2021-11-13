using Application.Core;
using Application.Domain;
using Application.Mapping;
using Application.Repositories;
using Application.Resources;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Moq;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace WebAPI_Tests
{
    public class BookRepositoryTests
    {
        private DataContext _context;
        private readonly Mock<IBookRepository> _mockRepo;
        private readonly IMapper _mapper;

        public BookRepositoryTests()
        {
            _context = GetDbContext();
            _mockRepo = new Mock<IBookRepository>();
            var mockMapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfiles());
            });
            _mapper = mockMapper.CreateMapper();
        }

        public DataContext GetDbContext()
        {
            var builder = new DbContextOptionsBuilder<DataContext>();
            builder.UseInMemoryDatabase(Guid.NewGuid().ToString());
            var dbContext = new DataContext(builder.Options);

            dbContext.Database.EnsureDeleted();
            dbContext.Database.EnsureCreated();

            return dbContext;
        }

        private async Task SeedData()
        {
            Category category = new Category { CategoryId = 1, Name = "Computers" };

            if (!_context.Categories.Any())
            {
                await _context.Categories.AddAsync(category);
            }

            if (!_context.Books.Any())
            {
                var books = new List<Book>
                {
                    new Book
                    {
                        BookId = Guid.NewGuid(),
                        CategoryId = 1,
                        Category = category,
                        Title = "Computer One"
                    },
                    new Book
                    {
                        BookId = Guid.NewGuid(),
                        CategoryId = 1,
                        Category = category,
                        Title = "Computer Two"
                    },

                };
                await _context.Books.AddRangeAsync(books);
            }

            await _context.SaveChangesAsync();
        }

        [Fact]
        public async Task GetBooksAsync_Return_AllBooks()
        {
            //Arrange
            _context.Database.EnsureDeleted();
            await SeedData();

            var query = _context.Books
                .Include(x => x.Category)
                .ProjectTo<BookDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            var pageParams = new PageParams() {PageNumber=1,PageSize=50 };

            _mockRepo.Setup(m => m.GetBooksAsync(pageParams)).
                Returns(Task.FromResult(Result<PageList<BookDto>>.
                        Success(PageList<BookDto>.CreateAsync(query, 1, 50).Result)));

            //Act
            var result = await _mockRepo.Object.GetBooksAsync(pageParams);

            var resultBookId = result.Val.Select(b => b.BookId);
            var actualBookId = _context.Books.Select(b => b.BookId);

            //Assert
            Assert.Equal(2, result.Val.Count());
            if (result.Val.Count() > 0)
            {
                Assert.Equal(expected: resultBookId, actual: actualBookId);
            }
        }

        [Theory]
        [ClassData(typeof(BookTestData))]
        public async Task AddAsync_Returns_Value(Book book)
        {
            //Arrange
            _mockRepo.Setup(m => m.AddAsync(book))
                .Returns(Task.FromResult(Result<Book>.Success(book))
            );

            //Act
            var result = await _mockRepo.Object.AddAsync(book);

            //Assert
            Assert.Equal(expected: book.Title, actual: result.Val.Title);
        }

        [Fact]
        public async Task GetBookAsync_Returns_Value()
        {
            //Arrange
            var bookId = Guid.NewGuid();

            var books = new List<Result<Book>>(){
              Result<Book>.Success(val: new Book
            {
                BookId = bookId,
                CategoryId = 1,
                Category = new Category { CategoryId = 1, Name = "Computers" },
                Title = "Computer One",
            }),
             Result<Book>.Success(val: new Book
            {
                BookId = Guid.NewGuid(),
                CategoryId = 1,
                Category = new Category { CategoryId = 1, Name = "Computers" },
                Title = "Computer Two",
            })
            };

            _mockRepo.Setup(m => m.GetBookByIdAsync(bookId))
                .Returns(Task.FromResult(books.FirstOrDefault(b => b.Val.BookId == bookId))
            );

            ////Act
            var result = await _mockRepo.Object.GetBookByIdAsync(bookId);

            var expected = result?.Val.Title;
            var actual = "Computer One";

            ////Assert
            Assert.Equal(expected: expected, actual: actual);
        }

    }
}

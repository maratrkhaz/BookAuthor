using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Resources
{
    public class BookToSaveDto
    {
        public Guid BookId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CategoryId { get; set; }
    }

    public class BookValidator : AbstractValidator<BookToSaveDto>
    {
        public BookValidator()
        {
            RuleFor(e => e.BookId).NotEmpty(); 
            RuleFor(e => e.Title).NotEmpty();
            RuleFor(e => e.CategoryId).NotEmpty();
        }
    }
}

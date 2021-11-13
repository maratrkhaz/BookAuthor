using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Application.Domain
{
    public class Book
    {
        public Guid BookId { get; set; }
        [StringLength(500)]
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public string PictureUrl { get; set; }
        public virtual ICollection<BookAuthor> BookAuthors { get; set; }
    }

    
}

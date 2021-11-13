using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Domain
{
    public class BookAuthor
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid BookId { get; set; }
        public Book Book { get; set; }
        public bool IsMainAuthor { get; set; }
    }
}

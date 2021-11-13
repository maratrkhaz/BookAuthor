using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Resources
{
    public class BookDto
    {
        public Guid BookId { get; set; }
       
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public string Category { get; set; }
        public string PictureUrl { get; set; }
       
    }
}

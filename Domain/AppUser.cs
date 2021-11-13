using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace Application.Domain
{
    public class AppUser : IdentityUser
    {
        [Column(TypeName = "nvarchar(255)")]
        public string DisplayName { get; set; }
        public virtual ICollection<BookAuthor> BookAuthors { get; set; }
    }


}

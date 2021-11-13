using Application.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Persistence
{
    public class DataContext: IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options): base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<BookAuthor> BookAuthors { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<BookAuthor>(b=> b.HasKey(ba=>
                new {ba.AppUserId, ba.BookId }));

            builder.Entity<BookAuthor>()
                .HasOne(u => u.AppUser)
                .WithMany(b => b.BookAuthors)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<BookAuthor>()
                .HasOne(u => u.Book)
                .WithMany(b => b.BookAuthors)
                .HasForeignKey(u => u.BookId);
                
        }

    }
}

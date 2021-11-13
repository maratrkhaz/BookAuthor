using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Application.Domain;
using System.Linq;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "fa853d4e-8176-49e9-a303-56319b97e9b0",
                        DisplayName = "Mark",
                        UserName = "mark",
                        Email = "mark@t.com"
                    },
                    new AppUser
                    {
                        Id = "72f4826c-3f95-42de-9fe4-1260e1864e37",
                        DisplayName = "Mary",
                        UserName = "mary",
                        Email = "mary@t.com"
                    },
                    new AppUser
                    {
                        Id = "be34e989-4955-4c32-8e9c-480b2eac448d",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@t.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Categories.Any())
            {
                var categories = new List<Category>
                {
                    new Category
                    {
                        Name = "Computers"
                    },
                    new Category
                    {
                        Name = "Fantasy"
                    },
                    new Category
                    {
                         Name = "Historical Fiction"
                    },
                    new Category
                    {
                         Name = "Literary Fiction"
                    }
                };

                await context.Categories.AddRangeAsync(categories);
                await context.SaveChangesAsync();
            }
        }
    }
}

using Application.Core;
using Application.Domain;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace WebAPI_Tests
{
    public class BookTestData : IEnumerable<object[]>
    {
        public IEnumerator<object[]> GetEnumerator()
        {
            yield return new object[] 
            { 
                new Book
                {
                    BookId = Guid.NewGuid(),
                    CategoryId = 1,
                    Title = "Computer Two"
                } 
            };
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
   
}
}

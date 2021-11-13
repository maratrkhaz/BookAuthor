using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSuccessed { get; set; }
        public T Val { get; set; }
        public string Message { get; set; }

        public static Result<T> Success(T val) 
            => new Result<T> { IsSuccessed = true, Val = val };
        public static Result<T> Failure(string message) 
            => new Result<T> { IsSuccessed = false, Message = message };
    }
}

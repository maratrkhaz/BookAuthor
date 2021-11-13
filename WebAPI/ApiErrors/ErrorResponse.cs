using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.ApiErrors
{
    public class ErrorResponse
    {
        public ErrorResponse(int sCode, string mes = null)
        {
            StatusCode = sCode;
            Message = mes ?? GetDefaultMessage(sCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessage(int sCode)
        {
            return sCode switch
            {
                400 => "Bad request.",
                401 => "Unauthorized.",
                404 => "Page is not found.",
                500 => "Internal Sever Error.",
                _ => "An error is not defined."
            };
        }
    }
}

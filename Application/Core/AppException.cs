using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Core
{
    public class AppException
    {
        public AppException(int sCode, string mes, string details = null)
        {
            SCode = sCode;
            Message = mes;
            Details = details;
        }

        public int SCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}


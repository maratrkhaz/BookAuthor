using Application.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Services
{
    public interface IJwtGenerator
    {
        string CreateToken(AppUser user);
    }
}

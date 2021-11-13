using Application.Core;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Extensions;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseWebApiController: ControllerBase
    {
        protected ActionResult HandlePagingResult<T>(Result<PageList<T>> result)
        {
            if (result == null) return NotFound();
            if (result.IsSuccessed && result.Val != null)
            {
                Response.AddPagingHeader(result.Val.CurrentPage, result.Val.PageSize,
                    result.Val.TotalCount, result.Val.TotalPages);
                return Ok(result.Val);
            }
            if (result.IsSuccessed && result.Val == null)
                return NotFound();

            return BadRequest(result.Message);
        }
    }
}

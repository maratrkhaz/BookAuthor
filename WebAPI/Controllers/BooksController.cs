using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using System.Threading.Tasks;
using Application.Domain;
using Application.Repositories;
using Microsoft.AspNetCore.Mvc;
using Application.Resources;
using Application.Core;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Extensions;

namespace WebAPI.Controllers
{
    public class BooksController:  BaseWebApiController
    {
        private readonly IMapper _mapper;
        private readonly IBookRepository _repository;

        public BooksController(IBookRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<PageList<BookDto>>> List([FromQuery] PageParams param)
        {
            return HandlePagingResult(await _repository.GetBooksAsync(param));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<BookDto>> GetBookAsync(Guid id)
        {
            var result = await _repository.GetBookByIdAsync(id);
            if (result == null)
                return BadRequest(new ApiErrors.ErrorResponse(400, "A book is not found."));

            if (result.IsSuccessed && result.Val != null)
                return _mapper.Map<Book, BookDto>(result.Val);

            return BadRequest(new ApiErrors.ErrorResponse(400, "A book is not found."));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostAsync(BookToSaveDto resource)
        {
            var book = _mapper.Map<BookToSaveDto, Book>(resource);

            var result = await _repository.AddAsync(book);

            if (result.IsSuccessed && result.Val != null)
                return Ok(_mapper.Map<Book, BookSaveResponse>(result.Val));

            return BadRequest(new ApiErrors.ErrorResponse(400, result.Message));
        }

        [Authorize(Policy = "IsBookMainAuhor")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditAsync(Guid id, BookToSaveDto resource)
        {
            resource.BookId = id;

            var book = _mapper.Map<BookToSaveDto, Book>(resource);
            var result = await _repository.EditAsync(book);

            if (result.IsSuccessed && result.Val != null)
                return Ok(_mapper.Map<Book, BookSaveResponse>(result.Val));

            return BadRequest(new ApiErrors.ErrorResponse(400, result.Message));
        }

        [Authorize(Policy = "IsBookMainAuhor")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            var result = await _repository.DeleteAsync(id);

            if (result.IsSuccessed && result.Val != null)
                return Ok(_mapper.Map<Book, BookSaveResponse>(result.Val));

            return BadRequest(new ApiErrors.ErrorResponse(400, result.Message));
        }
    }
}

using Application.Domain;
using Application.Resources;
using AutoMapper;

namespace Application.Mapping
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            
            CreateMap<BookToSaveDto, Book>()
                .ForMember(d => d.CategoryId, o => o.MapFrom(s => s.CategoryId));

            CreateMap<Book, BookSaveResponse>();
            CreateMap<Book, BookDto>()
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Name));

        }
    }
}

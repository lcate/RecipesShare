using AutoMapper;
using RecipesSharing.API.Model.DTO;
using RecipesSharing.Domain.Entities;

namespace RecipesSharing.API.Configuration
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<UserForRegistrationDto, User>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));
        }
    }
}

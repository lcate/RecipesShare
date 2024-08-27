using AutoMapper;
using RecipesSharing.API.Model.DTO;
using RecipesSharing.API.Model.DTO.Comment;
using RecipesSharing.API.Model.DTO.Recipe;
using RecipesSharing.Domain.Entities;

namespace RecipesSharing.API.Configuration
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<UserForRegistrationDto, AppUser>()
                .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));

            CreateMap<Recipe, RecipeAddDto>().ReverseMap();
            CreateMap<Recipe, RecipeEditDto>().ReverseMap();
            CreateMap<Recipe, RecipeResultDto>().ReverseMap();

            CreateMap<Comment, CommentAddDto>().ReverseMap();
            CreateMap<Comment, CommentEditDto>().ReverseMap();
            CreateMap<Comment, CommentResultDto>().ReverseMap();
        }
    }
}

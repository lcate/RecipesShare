using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RecipesSharing.API.Model.DTO.Rating;
using RecipesSharing.Domain.Entities;
using RecipesSharing.Domain.Interfaces;

namespace RecipesSharing.API.Controllers
{
    [Route("/api/rating")]
    public class RatingController : ControllerBase
    {
        private readonly IRecipeService _recipeService;
        private readonly IRatingService _ratingService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public RatingController(IMapper mapper,
            IRatingService ratingService,
                                    IRecipeService recipeService,
                                    UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _recipeService = recipeService;
            _ratingService = ratingService;
            _userManager = userManager;
        }

        [HttpGet("recipe/{recipeId:int}")]
        public async Task<IActionResult> GetAllByRecipeId(int recipeId)
        {
            List<Rating> ratings = await _ratingService.GetRatingsForRecipeId(recipeId);

            foreach (Rating rating in ratings)
            {
                rating.User = await _userManager.FindByIdAsync(rating.UserFk);
            }

            return Ok(ratings);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] RatingAddDto ratingDto)
        {
            //Rating rating = _mapper.Map<Rating>(ratingDto);
            Rating rating = new Rating();
            rating.CreatedOn = DateTime.Now;
            rating.UserFk = ratingDto.User.Id;
            rating.RecipeFk = ratingDto.RecipeId;
            rating.Comment = ratingDto.Comment;
            rating.Stars = ratingDto.Stars;

            var ratingResult = await _ratingService.Add(rating);

            if (ratingResult == null) return BadRequest();

            return Ok(ratingResult);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Remove(int id)
        {
            Rating? rating = await _ratingService.GetById(id);
            if (rating == null) return NotFound();

            var result = await _ratingService.Remove(rating);

            if (!result) return BadRequest();

            return Ok();
        }
    }
}

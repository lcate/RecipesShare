using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RecipesSharing.API.Model.DTO.Recipe;
using RecipesSharing.Domain.Entities;
using RecipesSharing.Domain.Interfaces;

namespace RecipesSharing.API.Controllers
{
    [Route("/api/recipe")]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipeService _recipeService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public RecipesController(IMapper mapper,
                                    IRecipeService recipeService,
                                    UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _recipeService = recipeService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var recipes = await _recipeService.GetAll();

            foreach (Recipe recipe in recipes)
            {
                var user = await _userManager.FindByIdAsync(recipe.UserFk);
                recipe.User = user;
            }

            return Ok(recipes);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            Recipe recipe = await _recipeService.GetById(id);

            if (recipe == null) return NotFound();

            recipe.User = await _userManager.FindByIdAsync(recipe.UserFk);

            return Ok(recipe);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] RecipeAddDto recipeDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var recipe = _mapper.Map<Recipe>(recipeDto);
            var recipeResult = await _recipeService.Add(recipe);

            if (recipeResult == null) return BadRequest();

            return Ok(_mapper.Map<RecipeResultDto>(recipeResult));
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, RecipeEditDto recipeDto)
        {
            if (id != recipeDto.Id) return BadRequest();

            if (!ModelState.IsValid) return BadRequest();

            var recipe = await _recipeService.GetById(id);
            recipe.DietaryPreferences = recipeDto.DietaryPreferences;
            recipe.PreparationTime = recipeDto.PreparationTime;
            recipe.Image = recipeDto.Image;
            recipe.MealType = recipeDto.MealType;
            recipe.Name = recipeDto.Name;

            //var recipe = _mapper.Map<Recipe>(recipeDto);
            var recipeResult = await _recipeService.Update(recipe);

            if (recipeResult == null) return BadRequest();

            return Ok(_mapper.Map<RecipeResultDto>(recipeResult));
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Remove(int id)
        {
            var recipe = await _recipeService.GetById(id);
            if (recipe == null) return NotFound();

            var result = await _recipeService.Remove(recipe);

            if (!result) return BadRequest();

            return Ok();
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetRecipesForUser(string userId)
        {
            var recipes = await _recipeService.GetRecipesByUserId(userId);

            if (recipes == null) return NotFound();

            foreach(Recipe recipe in recipes)
            {
                var user = await _userManager.FindByIdAsync(recipe.UserFk);
                recipe.User = user;
            }

            return Ok(recipes);
        }
    }
}

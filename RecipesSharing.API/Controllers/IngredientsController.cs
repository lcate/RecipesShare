using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RecipesSharing.Domain.Entities;
using RecipesSharing.Domain.Interfaces;

namespace ingredientsSharing.API.Controllers
{
    [Route("/api/ingredient")]
    public class IngredientsController : ControllerBase
    {
        private readonly IIngredientService _ingredientService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public IngredientsController(IMapper mapper,
                                    IIngredientService ingredientService,
                                    UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _ingredientService = ingredientService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            IEnumerable<Ingredient> ingredients = await _ingredientService.GetAll();

            return Ok(ingredients);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            Ingredient? ingredient = await _ingredientService.GetById(id);

            if (ingredient == null) return NotFound();

            return Ok(ingredient);
        }

        //[HttpPost]
        //public async Task<IActionResult> Add([FromBody] IngredientAddDto ingredientDto)
        //{
        //    if (!ModelState.IsValid) return BadRequest();

        //    var ingredient = _mapper.Map<Ingredient>(ingredientDto);
        //    ingredient.CreatedOn = DateTime.Now;

        //    var ingredientResult = await _ingredientService.Add(ingredient);

        //    if (ingredientResult == null) return BadRequest();

        //    return Ok(_mapper.Map<IngredientResultDto>(ingredientResult));
        //}

        //[HttpPut("{id:int}")]
        //public async Task<IActionResult> Update([FromRoute] int id, [FromBody] IngredientEditDto ingredientDto)
        //{
        //    if (id != ingredientDto.Id) return BadRequest();

        //    if (!ModelState.IsValid) return BadRequest();

        //    var ingredient = await _ingredientService.GetById(id);
        //    ingredient.IsAllergen = ingredientDto.IsAllergen;
        //    ingredient.Name = ingredientDto.Name;

        //    //var ingredient = _mapper.Map<ingredient>(ingredientDto);
        //    var ingredientResult = await _ingredientService.Update(ingredient);

        //    if (ingredientResult == null) return BadRequest();

        //    return Ok(_mapper.Map<IngredientResultDto>(ingredientResult));
        //}
    }
}

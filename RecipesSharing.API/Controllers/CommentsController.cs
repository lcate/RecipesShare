using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RecipesSharing.API.Model.DTO.Comment;
using RecipesSharing.Domain.Entities;
using RecipesSharing.Domain.Interfaces;

namespace RecipesSharing.API.Controllers
{
    [ApiController]
    [Route("api/comment")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public CommentsController(IMapper mapper,
                                 ICommentService commentService,
                                 UserManager<AppUser> userManager)
        {
            _commentService = commentService;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _commentService.GetAll();

            return Ok(comments);
        }

        [HttpPost]
        public async Task<IActionResult> Add(CommentAddDto commentAddDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            AppUser? templUser = await _userManager.FindByEmailAsync(commentAddDto.UserEmail);

            if (templUser == null) return BadRequest($"No user found with mail:{commentAddDto.UserEmail}.");

            Comment comment = new Comment();
            comment.RecipeFk = commentAddDto.RecipeId;
            comment.Text = commentAddDto.Text;
            comment.UserFk = templUser.Id;
            comment.CreatedOn = DateTime.Now;

            var commentResult = await _commentService.Add(comment);

            if (commentResult == null) return BadRequest();

            return Ok(_mapper.Map<Comment>(commentResult));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var comment = await _commentService.GetById(id);

            if (comment == null) return NotFound();

            return Ok(comment);
        }

        [HttpGet("recipe/{recipeId:int}")]
        public async Task<IActionResult> GetCommentsByRecipeId(int recipeId)
        {
            List<Comment> comments = await _commentService.GetCommentsByRecipeId(recipeId);

            if (comments == null) return NotFound();

            foreach (Comment comment in comments)
            {
                comment.User = await _userManager.FindByIdAsync(comment.UserFk);
            }

            return Ok(comments);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Recomp_Resource.Models;
using Recomp_Resource.Repositories;

namespace Recomp_Resource.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;


        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetAll(int commentId)
        {
            var comments = _commentRepository.GetAllCommentsOfResource(commentId);
            if (comments == null)
            {
                return NotFound();
            }
            return Ok(comments);
        }


        [HttpPost]
        public IActionResult Add(Comment comment)
        {
            _commentRepository.Add(comment);

            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        
    }
}
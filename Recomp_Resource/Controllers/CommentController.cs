using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Recomp_Resource.Models;
using Recomp_Resource.Repositories;
using System;

namespace Recomp_Resource.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;


        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet("{resourceId}")]
        public IActionResult GetAllByResourceId(int resourceId)
        {
            var comments = _commentRepository.GetAllCommentsOfResource(resourceId);
            if (comments == null)
            {
                return NotFound();
            }
            return Ok(comments);
        }


        [HttpPost]
        public IActionResult Add(Comment comment)
        {
            comment.DateSent = DateTime.Now;
            _commentRepository.Add(comment);

            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        
    }
}
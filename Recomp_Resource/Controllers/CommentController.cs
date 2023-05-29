using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Recomp_Resource.Models;
using Recomp_Resource.Repositories;
using System;
using System.Security.Claims;

namespace Recomp_Resource.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserRepository _userRepository;

        public CommentController(ICommentRepository commentRepository, IUserRepository userRepository)
        {

            _commentRepository = commentRepository;
            _userRepository = userRepository;
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
            var User = GetCurrentUserProfile();
            
            comment.UserId = User.Id;
            comment.DateSent = DateTime.Now;
            _commentRepository.Add(comment);


            return Ok(comment);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();
            if (user.UserTypeId == 1)
            {
                _commentRepository.Delete(id);

            }
            else
            {
                return Unauthorized();
            }
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
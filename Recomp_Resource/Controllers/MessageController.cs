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
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;


        public MessageController(IMessageRepository messageRepository, IUserRepository userRepository)
        {
            _messageRepository = messageRepository;
            _userRepository = userRepository;
        }

        [HttpGet("user")]
        public IActionResult GetAllMessagesOfUser()
        {
            var user = GetCurrentUserProfile();
            var messages = _messageRepository.GetAllMessagesOfUser(user.Id);
            return Ok(messages);
        }

        [HttpGet("sender")]
        public IActionResult GetAllMessagesSentByUser()
        {
            var user = GetCurrentUserProfile();
            var messages = _messageRepository.GetAllMessagesOfUser(user.Id);
            return Ok(messages);
        }

        [HttpGet("recipient")]
        public IActionResult GetAllMessagesReceivedByUser()
        {
            var user = GetCurrentUserProfile();
            var messages = _messageRepository.GetAllMessagesReceivedByUser(user.Id);
            return Ok(messages);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var message = _messageRepository.GetMessageById(id);
            if (message == null)
            {
                return NotFound();
            }
            return Ok(message);
        }

        [HttpPost]
        public IActionResult Add(Message message)
        {
            var user = GetCurrentUserProfile();
            message.SenderId = user.Id;
            message.DateCreated = DateTime.Now;
            _messageRepository.Add(message);

            return Ok(message);
        }
    
        [HttpPut("{id}")]
        public IActionResult Put(int id, Message message)
        {
            if (id != message.Id)
            {
                return BadRequest();
            }
            message.Opened = true;
            _messageRepository.Edit(message);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();
            _messageRepository.Delete(id);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
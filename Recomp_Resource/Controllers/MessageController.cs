using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Recomp_Resource.Models;
using Recomp_Resource.Repositories;

namespace Recomp_Resource.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;


        public MessageController(IMessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var messages = _messageRepository.GetAllMessages();
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
            _messageRepository.Add(message);

            return CreatedAtAction("Get", new { id = message.Id }, message);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _messageRepository.Delete(id);
            return NoContent();
        }
    }
}
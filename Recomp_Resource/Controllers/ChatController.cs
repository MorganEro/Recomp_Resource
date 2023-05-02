using Microsoft.AspNetCore.Mvc;
using Recomp_Resource.Models;
using Recomp_Resource.Repositories;

namespace Recomp_Resource.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatRepository _chatRepository;


        public ChatController(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetAll(int chatId)
        {
            var chats = _chatRepository.GetAllChats(chatId);
            if (chats == null)
            {
                return NotFound();
            }
            return Ok(chats);
        }


        [HttpPost]
        public IActionResult Add(Chat chat)
        {
            _chatRepository.Add(chat);

            return CreatedAtAction("Get", new { id = chat.Id }, chat);
        }


    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Recomp_Resource.Models;
using Recomp_Resource.Repositories;
using System;
using System.Security.Claims;

namespace Recomp_Resource.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuoteController : Controller
    {
        private readonly IQuoteRepository _quoteRepository;
        private readonly IUserRepository _userRepository;

        public QuoteController(IQuoteRepository quoteRepository, IUserRepository userRepository)
        {
            _quoteRepository = quoteRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var User = GetCurrentUserProfile();
            if (User.UserTypeId == 1) 
            {
                var quotes = _quoteRepository.GetAllQuotes();
                return Ok(quotes);
            } else
            {
                return Unauthorized();
            }
            
        }

        [HttpGet("random")]
        public IActionResult GetRandom()
        {
  

            var rnd = new Random();
            var quotes = _quoteRepository.GetAllQuotes();
            var rndQuote = quotes[rnd.Next(quotes.Count - 1)];

            return Ok(rndQuote);
        }

        [HttpPost]
        public IActionResult Add(Quote quote)
        {
            var User = GetCurrentUserProfile();
            if (User.UserTypeId == 1)
            {
                _quoteRepository.Add(quote);

                return CreatedAtAction("Get", new { id = quote.Id }, quote);
            }
            else
            {
                return Unauthorized();
            }
           
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Quote quote)
        {
            var User = GetCurrentUserProfile();
            if (User.UserTypeId == 1)
            {
                if (id != quote.Id)
                {
                    return BadRequest();
                }

                _quoteRepository.Edit(quote);
                return NoContent();
            }
            else
            {
                return Unauthorized();
            }
            
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var User = GetCurrentUserProfile();
            var quote = _quoteRepository.GetQuoteById(id);
            if (quote == null)
            {
                return NotFound();
            }
            return Ok(quote);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _quoteRepository.Delete(id);
            return NoContent();
        }


      
            

       

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }



    }
}
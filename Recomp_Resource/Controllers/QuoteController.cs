using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Recomp_Resource.Models;
using Recomp_Resource.Repositories;

namespace Recomp_Resource.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class QuoteController : Controller
    {
        private readonly IQuoteRepository _quoteRepository;

        public QuoteController(IQuoteRepository quoteRepository)
        {
            _quoteRepository = quoteRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var quotes = _quoteRepository.GetAllQuotes();
            return Ok(quotes);
        }

        [HttpPost]
        public IActionResult Add(Quote quote)
        {
            _quoteRepository.Add(quote);

            return CreatedAtAction("Get", new { id = quote.Id }, quote);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Quote quote)
        {
            if (id != quote.Id)
            {
                return BadRequest();
            }

            _quoteRepository.Edit(quote);
            return NoContent();
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
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


    }
}
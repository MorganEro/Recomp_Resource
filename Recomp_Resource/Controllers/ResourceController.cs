using Microsoft.AspNetCore.Mvc;
using Recomp_Resource.Models;
using Recomp_Resource.Repositories;

namespace Recomp_Resource.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResourceController : ControllerBase
    {
        private readonly IResourceRepository _resourceRepository;

        public ResourceController(IResourceRepository resourceRepository)
        {
            _resourceRepository = resourceRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var resources = _resourceRepository.GetAllResources();
            return Ok(resources);
        }

        [HttpGet("category/{id}")]
        public IActionResult GetAllByCategoryId(int categoryId)
        {
            var categoryResources = _resourceRepository.GetAllResourcesByCategory(categoryId);
            return Ok(categoryResources);
        }

        [HttpGet("user/{id}")]
        public IActionResult GetAllSavedByUser(int userId)
        {
            var savedResources = _resourceRepository.GetAllSavedResourceByUser(userId);
            return Ok(savedResources);
        }

        [HttpPost]
        public IActionResult Add(Resource resource)
        {
            _resourceRepository.Add(resource);

            return CreatedAtAction("Get", new { id = resource.Id }, resource);
        }

        [HttpPost]
        public IActionResult Save(SavedResource savedResource)
        {
            _resourceRepository.SaveResource(savedResource);

            return CreatedAtAction("Get", new { id = savedResource.Id }, savedResource);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Resource resource)
        {
            if (id != resource.Id)
            {
                return BadRequest();
            }

            _resourceRepository.Edit(resource);
            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult GetSaved(int id)
        {
            var savedResource = _resourceRepository.GetSavedResourceById(id);
            if (savedResource == null)
            {
                return NotFound();
            }
            return Ok(savedResource);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var resource = _resourceRepository.GetResourceById(id);
            if (resource == null)
            {
                return NotFound();
            }
            return Ok(resource);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _resourceRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            return Ok(_resourceRepository.SearchResources(q));
        }


    }
}
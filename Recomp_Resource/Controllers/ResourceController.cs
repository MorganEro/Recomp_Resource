using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Hosting;
using Recomp_Resource.Models;
using Recomp_Resource.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Versioning;
using System.Security.Claims;


namespace Recomp_Resource.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ResourceController : ControllerBase
    {
        private readonly IResourceRepository _resourceRepository;
        private readonly IUserRepository _userRepository;

        public ResourceController(IResourceRepository resourceRepository, IUserRepository userRepository)
        {
            _resourceRepository = resourceRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Resource> resources = null;
            var user = GetCurrentUserProfile();
            if (user.UserTypeId == 1)
            {

                resources = _resourceRepository.GetAllResources();
                foreach (Resource resource in resources)
                {
                    resource.NumberOfSaves = _resourceRepository.NumberOfSaves(resource.Id);
                };
            }
            else
            {
                return Unauthorized();
            }
            return Ok(resources);
        }

        [HttpGet("categoryList")]
        public IActionResult GetAllByCategoryId(int categoryId)
        {
            var user = GetCurrentUserProfile();
            categoryId = user.CategoryId;
            var categoryResources = _resourceRepository.GetAllResourcesByCategory(categoryId);
            return Ok(categoryResources);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var resource = _resourceRepository.GetResourceById(id);
            resource.NumberOfSaves = _resourceRepository.NumberOfSaves(resource.Id);
            if (resource == null)
            {
                return NotFound();
            }
            return Ok(resource);
        }



        [HttpPost]
        public IActionResult Add(Resource resource)
        {
            var user = GetCurrentUserProfile();
            if (user.UserTypeId == 1)
            {
                /*
                 
                try
                {
                    if (resource.Content.Contains("youtube") && resource.Content.Contains("embed"))
                    {
                        var videoCode = resource.Content.Split("v=")[1].Split("&")[0];
                        resource.Content = $"https://www.youtube.com/embed/{videoCode}";
                    }
                }
                catch
                {
                    Console.WriteLine("not a youtube video");
                }
                 */

                resource.DateAdded = DateTime.Now;
                _resourceRepository.Add(resource);

            }
            else
            {
                return Unauthorized();
            }
            return CreatedAtAction("Get", new { id = resource.Id }, resource);
        }


        [HttpPut("{id}")]
        public IActionResult Put(int id, Resource resource)
        {
            var user = GetCurrentUserProfile();
            if (user.UserTypeId == 1)
            {

                if (id != resource.Id)
                {
                    return BadRequest();
                }

                _resourceRepository.Edit(resource);
            }
            else
            {
                return BadRequest();
            }
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();
            if (user.UserTypeId == 1)
            {
                _resourceRepository.Delete(id);

            }
            else
            {
                return Unauthorized();
            }
            return NoContent();
        }




        [HttpPost("save")]
        public IActionResult Save(SavedResource savedResource)
        {
            var user = GetCurrentUserProfile();
            savedResource.SaveDate = DateTime.Now;
            savedResource.UserId = user.Id;
            _resourceRepository.SaveResource(savedResource);

            return CreatedAtAction("Get", new { id = savedResource.Id }, savedResource);
        }


        [HttpGet("saved/{id}")]
        public IActionResult GetSaved(int id)
        {
            var savedResource = _resourceRepository.GetSavedResourceById(id);
            if (savedResource == null)
            {
                return NotFound();
            }
            return Ok(savedResource);
        }


        [HttpGet("thisUserSavedList")]
        public IActionResult GetAllSavedByUser(int userId)
        {
            var user = GetCurrentUserProfile();
            userId = user.Id;
            var savedResources = _resourceRepository.GetAllSavedResourceByUser(userId);
            return Ok(savedResources);
        }


        [HttpDelete("saved/{id}")]
        public IActionResult UnSave(int id)
        {
            _resourceRepository.UnSave(id);
            return NoContent();
        }





        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            var user = GetCurrentUserProfile();
            if (user.UserTypeId == 1)
            {
                return Ok(_resourceRepository.SearchResources(q));

            }
            else
            {
                var results = _resourceRepository.SearchResources(q);
                return Ok(results.Where(resource => resource.CategoryId == user.CategoryId));
            }
        }



        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
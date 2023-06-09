﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Recomp_Resource.Models;
using Recomp_Resource.Repositories;
using System;
using System.Security.Claims;

namespace Recomp_Resource.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_userRepository.GetAllUsers());
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = _userRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //[Authorize]
        [HttpGet("firebaseUser/{id}")]
        public IActionResult GetByFirebaseUserId(string id)
        {
            var user = _userRepository.GetByFirebaseUserId(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult Add(User user)
        {
            user.UserTypeId = 2;
            user.JoinDate = DateTime.Now;
            _userRepository.Add(user);
            return CreatedAtAction(
               nameof(GetByFirebaseUserId), new { firebaseUserId = user.FirebaseUserId }, user);
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult Put(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _userRepository.Edit(user);
            return NoContent();
        }

        [Authorize]
        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            return Ok(_userRepository.SearchUsers(q));
        }


        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }


        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [Authorize]
        [HttpGet("user")]
        public IActionResult CurrentUser()
        {
            var userProfile = GetCurrentUserProfile();
            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }

    }
}

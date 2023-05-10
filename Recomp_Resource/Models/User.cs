using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;
using System;
using System.Web;
using System.Collections.Generic;

namespace Recomp_Resource.Models
{
    public class User
    {
        public int Id { get; set; }

        [MaxLength(55)]
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
        [Required]
        public DateTime Birthday { get; set; }
        public int Age {
            get 
            {
                int age = 0;
                age = DateTime.Now.Year - Birthday.Year;
                return age;
            }
        }
        public string Weight { get; set; }
        public string Height { get; set; }
        public string BFPercentage { get; set; }
        public string BMR { get; set; }
        [Required]
        public string CurrentFocus { get; set; }
     
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public DateTime JoinDate { get; set; }
        public string ImageAddress { get; set; }
        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }
        public string Bio { get; set; }
        [Required]
        public string Email { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        public bool Deactivated { get; set; }

        public User ME { get; set; }

        public List<Chat> Chats { get; set; }
        public List<Message> Messages { get; set; }
        public List<SavedResource> SavedResources { get; set; }

    }
}

using System;
using System.Collections.Generic;

namespace Recomp_Resource.Models
{
    public class Resource
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public string Topic { get; set; }
        public DateTime DateAdded { get; set; }
        public string Content { get; set; }

        public List<Comment> Comments { get; set; }

        public User ThisUser { get; set; }

        public int NumberOfComments { get; set; }

        public int NumberOfSaves { get; set; }

        public bool Saved { get; set; }
    }
}

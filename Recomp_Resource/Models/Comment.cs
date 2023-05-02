
using System;

namespace Recomp_Resource.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ResourceId { get; set; }
        public Resource Resource { get; set; }
        public string Content { get; set; }
        public DateTime DateSent { get; set; }
    }
}

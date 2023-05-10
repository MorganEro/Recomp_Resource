using Azure.Core;
using Microsoft.Identity.Client;
using System;

namespace Recomp_Resource.Models
{
    public class SavedResource
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ResourceId { get; set; }
        public Resource Resource { get; set; }
        public DateTime SaveDate { get; set; }

        public User ThisUser { get; set; }

        public int NumberOfSaves { get
            {
                return 0;
            } }

    }
}

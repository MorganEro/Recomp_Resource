using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace Recomp_Resource.Models
{
    public class Chat
    {

        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime DateCreated { get; set; }
        public string TimePassed
        {
            get
            {
                string timePassed = "";
                DateTime CurrentTime= DateTime.Now;
                TimeSpan interval = DateCreated- CurrentTime;
                string hours = interval.Hours.ToString();
                string minutes = interval.Minutes.ToString();
                string days = interval.Days.ToString();
 
                if (interval.Minutes < 60 ) 
                {
                    timePassed = $"{minutes}m ago";
                } else if (interval.Minutes > 60 && interval.Hours < 24 )
                {
                    timePassed = $"{hours}h ago";
                    
                } else
                {
                    timePassed = $"{days}d ago";
                }
                return timePassed;
            }
        }
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
        public List<Chat> Chats { get; set; }


    }
}


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
        public string TimePassed
        {
            get
            {
                string timePassed = "";
                DateTime CurrentTime = DateTime.Now;
                TimeSpan interval = DateSent - CurrentTime;
                string hours = interval.Hours.ToString();
                string minutes = interval.Minutes.ToString();
                string days = interval.Days.ToString();

                if (interval.Minutes < 60)
                {
                    timePassed = $"{minutes}m ago";
                }
                else if (interval.Minutes > 60 && interval.Hours < 24)
                {
                    timePassed = $"{hours}h ago";

                }
                else
                {
                    timePassed = $"{days}d ago";
                }
                return timePassed;
            }
        }

        public User ThisUser { get; set; }
    }
}

using System;

namespace Recomp_Resource.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime DateCreated { get; set; }
        public string DayCreated
        {
            get
            {
                string Days = "";
                TimeSpan daysPast = DateTime.Now - DateCreated;
                if (daysPast.Days < 1)
                {
                    Days = DateCreated.ToString("hh:mm tt");
                }
                else if(daysPast.Days < 7 )
                {
                    Days= DateCreated.DayOfWeek.ToString();
                } else
                {
                    Days = DateCreated.Date.ToString("MM/dd/yyyy");
                }
                return Days;
            }
        }
        public bool Opened { get; set; }

        public int SenderId { get; set; }
        public User Sender { get; set; }

        public int RecipientId { get; set; }
        public User Recipient { get; set; }
        public string Content { get; set; }

        public int NewMessages { get; set; }

        public bool RecipientHidden { get; set; }

        public bool SenderHidden { get; set; }
    }
}

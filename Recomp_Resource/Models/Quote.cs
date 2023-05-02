using System;
using System.Collections.Generic;
using System.Threading;

namespace Recomp_Resource.Models
{
    public class Quote
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public List<Quote> Quotes { get; set; }
        public Quote RandomQuote
        {
            get
            {
                var rnd = new Random();
                var randQuote = new Quote();
                randQuote = Quotes[rnd.Next(Quotes.Count)];
                return randQuote;
            }
        }
    }

}


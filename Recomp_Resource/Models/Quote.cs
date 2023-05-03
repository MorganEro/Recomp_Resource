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
     
    }

}


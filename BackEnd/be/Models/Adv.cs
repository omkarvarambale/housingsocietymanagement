using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace be.Models
{
    public class Adv
    {
        public int Id { get; set; }
        public string description { get; set; }
        public string image { get; set; }
        public string Description { get; set; }
        public Nullable<int> userId { get; set; }

        public virtual user user { get; set; }

    }
}
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace be.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class management
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string img { get; set; }
        public string phoneNo { get; set; }
        public string email { get; set; }
        public string position { get; set; }
        public Nullable<int> userId { get; set; }
    
        public virtual user user { get; set; }
    }
}
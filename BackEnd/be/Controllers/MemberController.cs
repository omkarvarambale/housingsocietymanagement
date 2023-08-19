using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using be.Models;

namespace Members.Controllers
{
    public class MemberController : ApiController
    {
        ProjectEntities1 entities = new ProjectEntities1();
        // GET: api/Member
        public IEnumerable<member> Get()
        {
            return entities.members.ToList();
        }

        // GET: api/Member/5
        public member Get(int id)
        {
            return entities.members.Find(id);
        }

        // POST: api/Member
        public string Post(member m)
        {
            entities.members.Add(m);
            int j = entities.SaveChanges();
            if (j == 1) return "Data Added Successfully.";
            else return "Failed to add data.";
        }

        // PUT: api/Member/5
        public string Put(int id, member m)
        {
            member demember = entities.members.Find(id);
            demember.name = m.name;
            demember.age = m.age;
            demember.profession = m.profession;
            demember.relation = m.relation;
            demember.image = m.image;
            int k = entities.SaveChanges();

            if (k == 1) return "Data Updated Successfully.";
            else return "Failed to updated data.";
        }

        // DELETE: api/Member/5
        public string Delete(int id)
        {
            entities.members.Remove(entities.members.Find(id));
            int i = entities.SaveChanges();
            if (i == 1) return "Data deleted Successfully.";
            else return "Failed to delete data.";

        }
    }
}
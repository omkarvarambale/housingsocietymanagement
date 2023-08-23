using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using be.Models;

namespace Members.Controllers
{
    [EnableCors("*", "*", "*")]
    public class MemberController : ApiController
    {
        ProjectEntities projectEntities = new ProjectEntities();

        // GET: api/Member
        public IEnumerable<member> Get()
        {
            return projectEntities.members.ToList();
        }

        // GET: api/Member/5
        public member Get(int id)
        {
            return projectEntities.members.Find(id);
        }

        // POST: api/Member
        public string Post(member m)
        {
            projectEntities.members.Add(m);
            int j = projectEntities.SaveChanges();
            if (j == 1) return "Data Added Successfully.";
            else return "Failed to add data.";
        }

        // PUT: api/Member/5
        public string Put(int id, member m)
        {
            member demember = projectEntities.members.Find(id);
            demember.name = m.name;
            demember.age = m.age;
            demember.profession = m.profession;
            demember.relation = m.relation;
            demember.image = m.image;
            int k = projectEntities.SaveChanges();

            if (k == 1) return "Data Updated Successfully.";
            else return "Failed to updated data.";
        }

        // DELETE: api/Member/5
        public string Delete(int id)
        {
            projectEntities.members.Remove(projectEntities.members.Find(id));
            int i = projectEntities.SaveChanges();
            if (i == 1) return "Data deleted Successfully.";
            else return "Failed to delete data.";

        }
    }
}
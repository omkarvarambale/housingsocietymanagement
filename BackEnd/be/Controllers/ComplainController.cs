using be.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApplication1.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ComplainController : ApiController
    {
        ProjectEntities projectEntities = new ProjectEntities();


        // GET: api/Complain
        public IEnumerable<complain> Get()
        {
            return projectEntities.complains.ToList();
        }

        // GET: api/Complain/5
        public complain Get(int id)
        {
            return projectEntities.complains.Find(id);
        }

        // POST: api/Complain
        public string Post(complain c)
        {
            projectEntities.complains.Add(c);
            int i = projectEntities.SaveChanges();
            if (i == 1) return "Complain Added Successfully.";
            else return "Failed to add Complain.";
        }

        // PUT: api/Complain/5
        public string Put(int id, complain u)
        {
            complain dbcomplain = projectEntities.complains.Find(id);
            dbcomplain.subject = u.subject;
            dbcomplain.detail = u.detail;

            int i = projectEntities.SaveChanges();

            if (i == 1) return "Complain Updated Successfully.";
            else return "Failed to updated Complain.";

        }

        // DELETE: api/Complain/5
        public string Delete(int id)
        {
            projectEntities.complains.Remove(projectEntities.complains.Find(id));
            int i = projectEntities.SaveChanges();
            if (i == 1) return "Complain deleted Successfully.";
            else return "Failed to delete Complain.";
        }
    }
}
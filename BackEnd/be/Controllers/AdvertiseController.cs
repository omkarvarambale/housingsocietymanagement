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
    public class AdvertiseController : ApiController
    {
        ProjectEntities projectEntities = new ProjectEntities();
        // GET: api/Advertise
        public IEnumerable<advertise> Get()
        {
            return projectEntities.advertises.ToList();
        }

        // GET: api/Advertise/5
        public advertise Get(int id)
        {
            return projectEntities.advertises.Find(id);
        }

        // POST: api/Advertise
        public string Post(advertise x)
        {
            projectEntities.advertises.Add(x);
            int j = projectEntities.SaveChanges();
            if (j == 1) return "Data Added Successfully.";
            else return "Failed to add data.";
        }

        // PUT: api/Advertise/5
        public string Put(int id, advertise m)
        {
            advertise demember = projectEntities.advertises.Find(id);
            demember.Id = m.Id;
            demember.date = m.date;
            demember.userId = m.userId;
            demember.image = m.image;
            int k = projectEntities.SaveChanges();

            if (k == 1) return "Data Updated Successfully.";
            else return "Failed to updated data.";
        }

        // DELETE: api/Advertise/5
        public string Delete(int id)
        {
            projectEntities.advertises.Remove(projectEntities.advertises.Find(id));
            int i = projectEntities.SaveChanges();
            if (i == 1) return "Data deleted Successfully.";
            else return "Failed to delete data.";

        }
    }
}
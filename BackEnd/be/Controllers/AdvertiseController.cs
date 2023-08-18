using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using be.Models;

namespace Members.Controllers
{
    public class AdvertiseController : ApiController
    {
        ProjectEntities1 prjentites = new ProjectEntities1();
        // GET: api/Advertise
        public IEnumerable<advertise> Get()
        {
            return prjentites.advertises.ToList();
        }

        // GET: api/Advertise/5
        public advertise Get(int id)
        {
            return prjentites.advertises.Find(id);
        }

        // POST: api/Advertise
        public string Post(advertise x)
        {
            prjentites.advertises.Add(x);
            int j = prjentites.SaveChanges();
            if (j == 1) return "Data Added Successfully.";
            else return "Failed to add data.";
        }

        // PUT: api/Advertise/5
        public string Put(int id, advertise m)
        {
            advertise demember = prjentites.advertises.Find(id);
            demember.Id = m.Id;
            demember.date = m.date;
            demember.userId = m.userId;
            demember.image = m.image;
            int k = prjentites.SaveChanges();

            if (k == 1) return "Data Updated Successfully.";
            else return "Failed to updated data.";
        }

        // DELETE: api/Advertise/5
        public string Delete(int id)
        {
            prjentites.advertises.Remove(prjentites.advertises.Find(id));
            int i = prjentites.SaveChanges();
            if (i == 1) return "Data deleted Successfully.";
            else return "Failed to delete data.";

        }
    }
}
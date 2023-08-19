using be.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Members.Controllers
{
    public class ManagementController : ApiController
    {
        ProjectEntities1 prjEntities = new ProjectEntities1();

        // GET: api/Management
        public IEnumerable<management> Get()
        {
            return prjEntities.managements.ToList();
        }

        // GET: api/Management/5
        public management Get(int id)
        {
            return prjEntities.managements.Find(id);
        }

        // POST: api/Management
        public string Post(management m)
        {
            prjEntities.managements.Add(m);
            int i = prjEntities.SaveChanges();
            if (i == 1) return "Data Added Successfully.";
            else return "Failed to add data.";
        }

        // PUT: api/Management/5
        public string Put(int id, management m)
        {
            management dbManagement = prjEntities.managements.Find(id);
            dbManagement.name = m.name;
            dbManagement.img = m.img;
            dbManagement.phoneNo = m.phoneNo;
            dbManagement.email = m.email;
            dbManagement.position = m.position;

            int i = prjEntities.SaveChanges();
            if (i == 1) return "Data Updated Successfully.";
            else return "Failed to update data.";
        }

        // DELETE: api/Management/5
        public string Delete(int id)
        {
            prjEntities.managements.Remove(prjEntities.managements.Find(id));
            int i = prjEntities.SaveChanges();
            if (i == 1) return "Data Deleted Successfully.";
            else return "Failed to delete data.";
        }
    }
}
using be.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Members.Controllers
{
    [EnableCors("*", "*", "*")]
    public class ManagementController : ApiController
    {
        ProjectEntities projectEntities = new ProjectEntities();


        // GET: api/Management
        public IEnumerable<management> Get()
        {
            return projectEntities.managements.ToList();
        }

        // GET: api/Management/5
        public management Get(int id)
        {
            return projectEntities.managements.Find(id);
        }

        // POST: api/Management
        public string Post(management m)
        {
            projectEntities.managements.Add(m);
            int i = projectEntities.SaveChanges();
            if (i == 1) return "Data Added Successfully.";
            else return "Failed to add data.";
        }

        // PUT: api/Management/5
        public string Put(int id, management m)
        {
            management dbManagement = projectEntities.managements.Find(id);
            dbManagement.name = m.name;
            dbManagement.img = m.img;
            dbManagement.phoneNo = m.phoneNo;
            dbManagement.email = m.email;
            dbManagement.position = m.position;

            int i = projectEntities.SaveChanges();
            if (i == 1) return "Data Updated Successfully.";
            else return "Failed to update data.";
        }

        // DELETE: api/Management/5
        public string Delete(int id)
        {
            projectEntities.managements.Remove(projectEntities.managements.Find(id));
            int i = projectEntities.SaveChanges();
            if (i == 1) return "Data Deleted Successfully.";
            else return "Failed to delete data.";
        }
    }
}
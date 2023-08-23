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
    [EnableCors("*","*","*")]
    public class HomeController : ApiController
    {
        ProjectEntities projectEntities = new ProjectEntities();

        // GET: api/Home
        public IEnumerable<user> Get()
        {
            return projectEntities.users.ToList();
        }

        // GET: api/Home/5
        public user Get(int id)
        {
            return projectEntities.users.Find(id);
        }

        // POST: api/Home
        public bool Post(user u)
        {
            int i=0;
            try
            {
                projectEntities.users.Add(u);
                i = projectEntities.SaveChanges();
                if (i == 1) return true;
            }
            catch (Exception ex) {
                return false;
            }
            return true;
            //if (i == 1) return "Data Added Successfully.";
            //else return "Failed to add data.";
        }

        // PUT: api/Home/5
        public bool Put(int id, user u)
        {
            try
            {
                user dbuser = projectEntities.users.Find(id);
                dbuser.fname = u.fname;
                dbuser.lname = u.lname;
                dbuser.flatno = u.flatno;
                dbuser.familymember = u.familymember;
                dbuser.mobileno = u.mobileno;
                dbuser.profession = u.profession;
                dbuser.image = u.image;
                dbuser.password = u.password;
                int i = projectEntities.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
            //return true;
            //if (i == 1) return "Data Updated Successfully.";
            //else return "Failed to updated data.";
        }

        // DELETE: api/Home/5
        public string Delete(int id)
        {
            projectEntities.users.Remove(projectEntities.users.Find(id));
            int i = projectEntities.SaveChanges();
            if (i == 1) return "Data deleted Successfully.";
            else return "Failed to delete data.";
        }

        //[HttpGet]
        //[Route("/user/login")]
        //public user Login(string email, string password)
        //{
        //    projectEntities.users.ToList();

        //    return null;
        //}
    }
}
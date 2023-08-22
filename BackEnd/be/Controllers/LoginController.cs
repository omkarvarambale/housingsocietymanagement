using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using be.Models;

namespace be.Controllers
{
    [EnableCors("*", "*", "*")]
    public class LoginController : ApiController
    {
        ProjectEntities projectEntities = new ProjectEntities();
        // GET: api/Login
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/Login
        //public user Get(user u)
        //{
        //    List<user> users = projectEntities.users.ToList();
        //    user foundUser = (from uf in users
        //                 where uf.email == u.email && uf.password == u.password
        //                 select uf).FirstOrDefault();
        //    return foundUser;
        //}

        // POST: api/Login
        public user Post(user u)
        {
            List<user> users = projectEntities.users.ToList();
            user foundUser = (from uf in users
                              where uf.email == u.email && uf.password == u.password
                              select uf).FirstOrDefault();
            return foundUser;
        }

        // PUT: api/Login/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE: api/Login/5
        //public void Delete(int id)
        //{
        //}
    }
}

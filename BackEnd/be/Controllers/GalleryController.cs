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
    public class GalleryController : ApiController
    {
        ProjectEntities projectEntities = new ProjectEntities();
        // GET: api/Gallery
        public IEnumerable<gallery> Get()
        {
            return projectEntities.galleries.ToList();
        }

        //// GET: api/Gallery/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Gallery
        public string Post(gallery g)
        {
            int i = 0;
            projectEntities.galleries.Add(g);
            i = projectEntities.SaveChanges();
            if (i == 1) return "Image added successfully";
            else return "Failed to add image";
        }

        // PUT: api/Gallery/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE: api/Gallery/5
        public string Delete(int id)
        {
            int i = 0;
            projectEntities.galleries.Remove(projectEntities.galleries.Find(id));
            i = projectEntities.SaveChanges();
            if (i == 1) return "Image deleted Successfully";
            else return "Failed to delete image";
        }
    }
}

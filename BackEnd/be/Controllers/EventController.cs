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
    public class EventController : ApiController
    {
        ProjectEntities projectEntities = new ProjectEntities();


        // GET: api/Event
        public IEnumerable<@event> Get()
        {
            return projectEntities.events.ToList();
        }

        // GET: api/Event/5
        public @event Get(int id)
        {
            return projectEntities.events.Find(id);
        }

        // POST: api/Event
        public string Post(@event u)
        {
            projectEntities.events.Add(u);
            int i = projectEntities.SaveChanges();
            if (i == 1) return "Event Added Successfully.";
            else return "Failed to add Event.";
        }

        // PUT: api/Event/5
        public string Put(int id, @event u)
        {
            @event dbevent = projectEntities.events.Find(id);
            dbevent.eventname = u.eventname;
            dbevent.description = u.description;
            dbevent.place = u.place;
            dbevent.eventdate = u.eventdate;
            dbevent.eventtime = u.eventtime;
            dbevent.eventimage = u.eventimage;
           
            int i = projectEntities.SaveChanges();

            if (i == 1) return "Event Updated Successfully.";
            else return "Failed to updated Event.";

        }

        // DELETE: api/Event/5
        public string Delete(int id)
        {
            projectEntities.events.Remove(projectEntities.events.Find(id));
            int i = projectEntities.SaveChanges();
            if (i == 1) return "Data deleted Successfully.";
            else return "Failed to delete data.";
        }
    }
}
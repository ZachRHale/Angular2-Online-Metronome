using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineMetronomeREST.Models;

namespace OnlineMetronomeREST.Controllers.api
{
    
    public class MeasuresController : Controller
    {
        
        public JsonResult Index()
        {
            var someMeasures = new List<Measure>();
            someMeasures.Add(new Measure(5, 4, 80));
            someMeasures.Add(new Measure(10, 8, 90));

            return Json(someMeasures);
        }

        [HttpGet]
        public JsonResult Zachhale(int id) 
        {
            var someMeasures = new List<Measure>(); 

            if (id == 0){
				
				someMeasures.Add(new Measure(1, 4, 80));
				someMeasures.Add(new Measure(2, 4, 80));

				return Json(someMeasures);  
            } else if (id == 1){
				someMeasures.Add(new Measure(6, 4, 80));
				someMeasures.Add(new Measure(9, 8, 90));
                someMeasures.Add(new Measure(2, 4, 70));

				return Json(someMeasures);
            } else {
				someMeasures.Add(new Measure(1, 4, 80));
				someMeasures.Add(new Measure(1, 8, 90));
				someMeasures.Add(new Measure(1, 2, 70));

				return Json(someMeasures);
            }

			
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineMetronomeREST.Models;
using OnlineMetronomeREST.DataAccess;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;

namespace OnlineMetronomeREST.Controllers.api
{
    [Route("api/Measures")]
    public class MeasuresController : Controller
    {

		private readonly PieceMySqlContext _context;

        public MeasuresController(PieceMySqlContext context)
        {
            _context = context;    
        }

		[HttpGet]
		public JsonResult Index()
		{
			var measures = _context.Measures
				.Where(b => b.PieceID == "12345678-1234-1234-1234-123456789012")
				.OrderBy(b => b.MeasureNumber)
				.ToList();

			return Json(measures);  
		}

		[HttpPost]
		public IActionResult Create([FromBody] List<Measure> measures)
		{
			
			var oldMeasures = (from oldMeasure in _context.Measures
			where oldMeasure.PieceID == oldMeasure.PieceID select oldMeasure);

			foreach (Measure oldMeasure in oldMeasures){
				_context.Measures.Remove(oldMeasure);
			}

			_context.SaveChanges();
			
			
			int counter = 1;
			foreach (Measure measure in measures)
			{
				var theMeasure = new Measure();
				theMeasure.BottomNumber = measure.BottomNumber;
				theMeasure.TopNumber = measure.TopNumber;
				theMeasure.PieceID = measure.PieceID;
				theMeasure.Tempo = measure.Tempo;
				theMeasure.MeasureNumber = counter;

				_context.Add(theMeasure);
				counter++;
			}
			
			_context.SaveChanges();

			return Ok("Saved the Measures");
		}
		

		[HttpGet("{id}")]
		public JsonResult Index(string id)
		{
			var measures = _context.Measures
				.Where(b => b.PieceID == id)
				.OrderBy(b => b.MeasureNumber)
				.ToList();

			return Json(measures);
		}
    }
}

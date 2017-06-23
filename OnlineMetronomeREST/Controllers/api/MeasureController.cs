using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineMetronomeREST.Models;
using OnlineMetronomeREST.DataAccess;

namespace OnlineMetronomeREST.Controllers.api
{
    [Route("api/Measures")]
    public class MeasuresController : Controller
    {
		public Piece thePiece;
		public PieceData PieceDL = new PieceData();
		public List<Measure> theMeasures;
		public Array output;

		[HttpGet]
		public JsonResult Index()
		{
			thePiece = PieceDL.GetPiece(2);
			theMeasures = PieceDL.GetMeasures(thePiece);
            return Json(thePiece);
		}

		[HttpGet("{id}")]
		public JsonResult Index(int id){
			thePiece = PieceDL.GetPiece(id);
			theMeasures = PieceDL.GetMeasures(thePiece);
			return Json(theMeasures);
		}
    }
}

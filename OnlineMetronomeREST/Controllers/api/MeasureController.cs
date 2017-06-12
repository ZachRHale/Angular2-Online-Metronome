using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineMetronomeREST.Models;
using OnlineMetronomeREST.DataAccess;

namespace OnlineMetronomeREST.Controllers.api
{
    [Route("api/[controller]")]
    public class MeasuresController : Controller
    {
		public Piece thePiece;
		public PieceData PieceDL = new PieceData();
		public List<Measure> theMeasures;

		public JsonResult Index()
		{
			thePiece = PieceDL.GetPiece(1);
			theMeasures = PieceDL.GetMeasures(thePiece);
            return Json(theMeasures);
		}
    }
}

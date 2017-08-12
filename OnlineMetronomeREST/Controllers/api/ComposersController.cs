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
    [Route("api/Composers")]
    public class ComposersController : Controller
    {

		private readonly PieceMySqlContext _context;

        public ComposersController(PieceMySqlContext context)
        {
            _context = context;    
        }

		[HttpGet]
		public JsonResult Index()
		{
			var message  = "please select";

			return Json(message);  
		}

		[HttpGet("{composer}")]
		public JsonResult Index(string composer)
		{
			var composerPieces = _context.Pieces
				.Where(b => b.PieceComposer == composer)
				.OrderBy(b => b.PieceName)
				.ToList();

			return Json(composerPieces);
		}

    }
}

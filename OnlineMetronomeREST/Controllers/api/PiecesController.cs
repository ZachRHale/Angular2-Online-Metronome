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
    [Route("api/Pieces")]
    public class PiecesController : Controller
    {

		private readonly PieceMySqlContext _context;

        public PiecesController(PieceMySqlContext context)
        {
            _context = context;    
        }

		[HttpGet]
		public JsonResult Index()
		{
			var piece = _context.Pieces
				.Where(b => b.PieceID == "12345678-1234-1234-1234-123456789012")
				.OrderBy(b => b.PieceComposer)
				.ToList();

			return Json(piece);  
		}

		[HttpPost]
		public IActionResult Create([FromBody] Piece newPiece)
		{
			var thePiece = new Piece();
			var user = new User();

			Guid pieceGUID = Guid.NewGuid();

			thePiece.PieceComposer = newPiece.PieceComposer;
			thePiece.PieceOwner = newPiece.PieceOwner;
			thePiece.PieceID = pieceGUID.ToString();
			thePiece.PieceName = newPiece.PieceName; 

			Console.WriteLine("Piece Saved");

			_context.Add(thePiece);
			_context.SaveChanges();

			return Ok("Piece was saved");
		}
		

		[HttpGet("{id}")]
		public JsonResult Index(string id)
		{
			var pieceDetails = _context.Pieces
				.Where(b => b.PieceID == id)
				.OrderBy(b => b.PieceName)
				.ToList();

			return Json(pieceDetails);
		}

    }
}

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
    [Route("api/Users")]
    public class UsersController : Controller
    {

		private readonly PieceMySqlContext _context;

        public UsersController(PieceMySqlContext context)
        {
            _context = context;    
        }

		[HttpPost]
		public IActionResult Create([FromBody] User newUser)
		{
			var user = new User();

			Guid userGUID = Guid.NewGuid();

			user.UserFirstName = newUser.UserFirstName;
			user.UserLastName = newUser.UserLastName;
			user.UserID = userGUID.ToString();
			user.UserName = newUser.UserName; 

			Console.WriteLine("User" + userGUID.ToString() +"Created");

			_context.Add(user);
			_context.SaveChanges();

			return Ok("whatever");
		}
		

		[HttpGet("{id}")]
		public JsonResult Index(string id)
		{
			var user = _context.Users
				.Where(b => b.UserID == id)
				.OrderBy(b => b.UserLastName)
				.ToList();

			return Json(user);
		}
    }
}

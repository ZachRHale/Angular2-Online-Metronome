using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace OnlineMetronomeREST.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "This is about.";

            return View();
        }

        public IActionResult Metronome()
        {
            ViewData["Message"] = "An Angular4 metronome";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}

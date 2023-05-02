using Microsoft.AspNetCore.Mvc;

namespace Recomp_Resource.Controllers
{
    public class QuoteController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

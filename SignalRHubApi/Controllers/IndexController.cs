using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SignalRHubApi.Controllers
{
    [Route("api")]
    public class IndexController : Controller
    {
        // GET api/HealthCheck
        [HttpGet("healthCheck")]
        public string HealthCheck()
        {
            return "Sucess";
        }
    }
}

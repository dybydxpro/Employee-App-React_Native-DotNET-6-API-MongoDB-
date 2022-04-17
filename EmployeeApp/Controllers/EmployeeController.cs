using EmployeeApp.Models;
using EmployeeApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeServices _employeeServices;

        public EmployeeController(EmployeeServices employeeServices)
        {
            _employeeServices = employeeServices;
        }

        [HttpGet]
        public async Task<ActionResult<Employee>> Get()
        {
            var emoloyee = await _employeeServices.GetAsync();
            return Ok(emoloyee);
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Employee>> Get(string id)
        {
            var emoloyee = await _employeeServices.GetAsync(id);
            if (emoloyee == null)
            {
                return BadRequest("Null");
            }
            return Ok(emoloyee);
        }

        [HttpPost]
        public async Task<ActionResult<Employee>> Post(Employee employee)
        {
            await _employeeServices.CreateAsync(employee);
            return CreatedAtAction(nameof(Get), new { id = employee.Id }, employee);
        }

        [HttpPut]
        public async Task<ActionResult<Employee>> Update(Employee employee)
        {
            var data = await _employeeServices.GetAsync(employee.Id);
            if (data == null)
            {
                return BadRequest();
            }
            employee.Id = data.Id;
            await _employeeServices.UpdateAsync(employee);
            return Ok();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult<Employee>> Delete(string id)
        {
            var data = await _employeeServices.GetAsync(id);
            if (data == null)
            {
                return NotFound();
            }
            await _employeeServices.DeleteAsync(id);
            return Ok();
        }
    }
}

using EmployeeApp.Data;
using EmployeeApp.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace EmployeeApp.Services
{
    public class EmployeeServices
    {
        private readonly IMongoCollection<Employee> _employeeCollection;

        public EmployeeServices(IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
            _employeeCollection = mongoDatabase.GetCollection<Employee>("Employee"); 
        }

        public async Task<List<Employee>> GetAsync() =>
            await _employeeCollection.Find(_ => true).ToListAsync();

        public async Task<Employee?> GetAsync(string id) =>
            await _employeeCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Employee employee) =>
            await _employeeCollection.InsertOneAsync(employee);

        public async Task UpdateAsync(Employee employee) =>
            await _employeeCollection.ReplaceOneAsync(x => x.Id == employee.Id, employee);

        public async Task DeleteAsync(string id) =>
            await _employeeCollection.DeleteOneAsync(x => x.Id == id);
            
    }
}

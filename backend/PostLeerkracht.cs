using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using MoveForFortune.Models;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;

namespace MoveForFortune
{
    public static class PostLeerkracht
    {
        [FunctionName("PostLeerkracht")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = "v2/leerkrachten")] HttpRequest req,
            ILogger log)
        {
            try
            {
                string connectionString = Environment.GetEnvironmentVariable("ServerConnectionString");

                string json = await new StreamReader(req.Body).ReadToEndAsync();
                //newLeerkracht.RegistrationId = Guid.NewGuid().ToString();//guid genereert een uniek id

                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connectionString);
                CloudTableClient tableClient = storageAccount.CreateCloudTableClient();
                CloudTable table = tableClient.GetTableReference("Leerkracht");

                Leerkracht newLeerkracht = JsonConvert.DeserializeObject<Leerkracht>(json);
                {
                    VoorNaam = newLeerkracht.Voornaam,
                    Naam = newLeerkracht.Naam,
                    Email = newLeerkracht.Email,
                    Wachtwoord = newLeerkracht.Wachtwoord,
                    ThemaId = newLeerkracht.ThemaId,
                };

                TableOperation insertOperation = TableOperation.Insert(ent);
                await table.ExecuteAsync(insertOperation);
                return new OkObjectResult(newLeerkracht);
            }
            catch (Exception ex)
            {
                log.LogError(ex, "AddRegistrationV2");
                return new StatusCodeResult(500);
            }
        }
    }
}

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
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net.Http;
using System.Diagnostics;

namespace MoveForFortune
{
    public static class OphalenData
    {
        [FunctionName("OphalenData")]

        public static async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req, ILogger log)
        {
            string connectionString = Environment.GetEnvironmentVariable("ServerConnectionString");
            List<Leerkracht> LeerkrachtList = new List<Leerkracht>();
            log.LogInformation("C# HTTP trigger function processed a request.");
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();
                    using (SqlCommand sqlCommand = new SqlCommand())
                    {
                        sqlCommand.Connection = connection;
                        sqlCommand.CommandText = "SELECT * FROM Leerkracht"; //SQL command
                        SqlDataReader reader = await sqlCommand.ExecuteReaderAsync();

                        // while not always needed
                        while (await reader.ReadAsync())
                        {
                            LeerkrachtList.Add(new Leerkracht()
                            {
                                LeerkrachtId = int.Parse(reader["LeerkrachtId"].ToString()),
                                Voornaam = reader["Voornaam"].ToString(),
                                Naam = reader["Naam"].ToString(),
                                Email = reader["Email"].ToString(),
                                Wachtwoord = reader["Wachtwoord"].ToString()
                            });
                        }
                    }
                }
                return new OkObjectResult(LeerkrachtList);
            }
            catch (Exception x)
            {
                Debug.WriteLine(x);
                return new StatusCodeResult(500);
            }
        }
    }
}

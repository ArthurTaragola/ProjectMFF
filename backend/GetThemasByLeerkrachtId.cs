using System;
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
    public static class GetThemasByLeerkrachtId
    {
        [FunctionName("GetThemasByLeerkrachtId")]
        public static async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "v1/themas/{leerkrachtId}")] HttpRequest req, int leerkrachtId,ILogger log)
        {
            string connectionString = Environment.GetEnvironmentVariable("ServerConnectionString");
            List<ThemasPerLeerkracht> VraagList = new List<ThemasPerLeerkracht>();
            log.LogInformation("C# HTTP trigger function processed a request.");
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();
                    using (SqlCommand sqlCommand = new SqlCommand())
                    {
                        sqlCommand.Connection = connection;
                        sqlCommand.CommandText = "SELECT Themas.Naam from Themas join LeerkrachtThema on Themas.ThemaId = LeerkrachtThema.ThemaId where LeerkrachtId = @leerkrachtId"; //SQL command
                        sqlCommand.Parameters.AddWithValue("@leerkrachtId", leerkrachtId);
                        SqlDataReader reader = await sqlCommand.ExecuteReaderAsync();

                        // while not always needed
                        while (await reader.ReadAsync())
                        {
                            VraagList.Add(new ThemasPerLeerkracht()
                            {
                                Naam = reader["Naam"].ToString()
                            });
                        }
                    }
                }
                return new OkObjectResult(VraagList);
            }
            catch (Exception x)
            {
                Debug.WriteLine(x);
                return new StatusCodeResult(500);
            }
        }
    }
}

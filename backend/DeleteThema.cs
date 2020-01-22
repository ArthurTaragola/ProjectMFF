using System;
using System.IO;
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
    public static class DeleteThema
    {
        [FunctionName("DeleteThema")]
        public static async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "v1/thema/{themaId}")] HttpRequest req, int themaId, ILogger log)
        {
            string connectionString = Environment.GetEnvironmentVariable("ServerConnectionString");
            log.LogInformation("C# HTTP trigger function processed a request.");
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();
                    using (SqlCommand sqlCommand = new SqlCommand())
                    {
                        sqlCommand.Connection = connection;
                        sqlCommand.CommandText = "Delete FROM Themas WHERE Themas.ThemaId = @themaId;"; //SQL command
                        sqlCommand.Parameters.AddWithValue("@themaId", themaId);
                        await sqlCommand.ExecuteNonQueryAsync();
                    }
                }
                return new StatusCodeResult(200);
            }
            catch (Exception x)
            {
                Debug.WriteLine(x);
                return new StatusCodeResult(500);
            }
        }
    }
}
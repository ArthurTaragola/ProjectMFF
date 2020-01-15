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
using System.Data.SqlClient;

namespace MoveForFortune
{

    public static class PostThemas
    {
        [FunctionName("PostThemas")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous ,"post", Route = "v2/themas/{leerkrachtId}")] HttpRequest req, int leerkrachtId, ILogger log)
        {
            try
            {
                string connectionString = Environment.GetEnvironmentVariable("ServerConnectionString");
                string json = await new StreamReader(req.Body).ReadToEndAsync();
                Thema thema = JsonConvert.DeserializeObject<Thema>(json);
                using (SqlConnection con = new SqlConnection())
                {
                    con.ConnectionString = connectionString;
                    await con.OpenAsync();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = con;
                        cmd.CommandText = "Insert into Themas values (@Naam, @LeerkrachtId)";
                        cmd.Parameters.AddWithValue("@Naam", thema.Naam);
                        cmd.Parameters.AddWithValue("@LeerkrachtId", leerkrachtId);
                        await cmd.ExecuteNonQueryAsync();
                    }
                }
                return new StatusCodeResult(200);
            }
            catch (Exception ex)
            {
                log.LogError(ex + "     -Themas");
                return new StatusCodeResult(500);
            }
        }
    }
}
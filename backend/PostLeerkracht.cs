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
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Net.Http;

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
                Leerkracht leerkracht = JsonConvert.DeserializeObject<Leerkracht>(json);
                using (SqlConnection con = new SqlConnection())
                {
                    con.ConnectionString = connectionString;
                    await con.OpenAsync();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = con;
                        cmd.CommandText = "Insert into Leerkracht values (@Voornaam, @Naam,  @Email, @Wachtwoord)";
                        cmd.Parameters.AddWithValue("@Voornaam", leerkracht.Voornaam);
                        cmd.Parameters.AddWithValue("@Naam", leerkracht.Naam);
                        cmd.Parameters.AddWithValue("@Email", leerkracht.Email);
                        cmd.Parameters.AddWithValue("@Wachtwoord", leerkracht.Wachtwoord);
                        await cmd.ExecuteNonQueryAsync();
                    }
                }
                return new StatusCodeResult(200);
            }
            catch(Exception ex)
            {
                log.LogError(ex + "     ---->AddRegistration");
                return new StatusCodeResult(500);
            }
        }
    }
}

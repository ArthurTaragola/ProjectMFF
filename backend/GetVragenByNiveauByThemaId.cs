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
using System.Diagnostics;
namespace MoveForFortune
{
    public static class GetVragenByNiveauByThemaId
    {

        [FunctionName("GetVragenByNiveauByThemaId")]
        public static async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "v1/vragen/{niveau}/{themaid}")] HttpRequest req, int themaid, int niveau, ILogger log)
        {
            string connectionString = Environment.GetEnvironmentVariable("ServerConnectionString");
            List<Vraag> VraagList = new List<Vraag>();
            log.LogInformation("C# HTTP trigger function processed a request.");
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();
                    using (SqlCommand sqlCommand = new SqlCommand())
                    {
                        sqlCommand.Connection = connection;
                        sqlCommand.CommandText = $"SELECT * FROM Vragen WHERE	Vragen.Niveau = @niveau AND Vragen.ThemaId = @themaid;"; //SQL command
                        sqlCommand.Parameters.AddWithValue("@themaid", themaid);
                        sqlCommand.Parameters.AddWithValue("@niveau", niveau);
                        SqlDataReader reader = await sqlCommand.ExecuteReaderAsync();

                        // while not always needed
                        while (await reader.ReadAsync())
                        {
                            VraagList.Add(new Vraag()
                            {
                                VraagId = int.Parse(reader["VraagId"].ToString()),
                                Vraagstelling = reader["Vraagstelling"].ToString(),
                                JuistAntwoord = reader["JuistAntwoord"].ToString(),
                                FoutAntwoord1 = reader["Foutantwoord1"].ToString(),
                                FoutAntwoord2 = reader["Foutantwoord2"].ToString(),
                                Niveau = int.Parse(reader["Niveau"].ToString()),
                                ThemaId = int.Parse(reader["ThemaId"].ToString())
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

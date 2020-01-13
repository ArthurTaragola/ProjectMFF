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
    public static class PutVragen
    {
        [FunctionName("PutVragen")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "v1/vragen/{vraagId}")] HttpRequest req,int vraagId ,ILogger log)
        {
            try
            {
                string connectionString = Environment.GetEnvironmentVariable("ServerConnectionString");
                string json = await new StreamReader(req.Body).ReadToEndAsync();
                Vraag vraag = JsonConvert.DeserializeObject<Vraag>(json);
                using (SqlConnection con = new SqlConnection())
                {
                    con.ConnectionString = connectionString;
                    await con.OpenAsync();
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = con;
                        cmd.CommandText = "UPDATE Vragen SET ThemaId = @Themaid, Vraagstelling = @Vraagstelling, JuistAntwoord = @JuistAntwoord, FoutAntwoord1 = @FoutAntwoord1,  FoutAntwoord2 = @FoutAntwoord2, Niveau = @Niveau WHERE VraagId = @VraagId;";
                        cmd.Parameters.AddWithValue("@VraagId", vraagId);
                        cmd.Parameters.AddWithValue("@ThemaId", vraag.ThemaId);
                        cmd.Parameters.AddWithValue("@Vraagstelling", vraag.Vraagstelling);
                        cmd.Parameters.AddWithValue("@JuistAntwoord", vraag.JuistAntwoord);
                        cmd.Parameters.AddWithValue("@FoutAntwoord1", vraag.FoutAntwoord1);
                        cmd.Parameters.AddWithValue("@FoutAntwoord2", vraag.FoutAntwoord2);
                        cmd.Parameters.AddWithValue("@Niveau", vraag.Niveau);
                        await cmd.ExecuteNonQueryAsync();
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
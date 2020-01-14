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

    public static class PostVraag
    {
        [FunctionName("PostVraag")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "v2/vragen")] HttpRequest req,
            ILogger log)
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
                        cmd.CommandText = "Insert into Vragen values (@ThemaId,@Vraagstelling, @JuistAntwoord,  @FoutAntwoord1, @FoutAntwoord2, @Niveau)";
                        cmd.Parameters.AddWithValue("@Vraagstelling", vraag.Vraagstelling);
                        cmd.Parameters.AddWithValue("@JuistAntwoord", vraag.JuistAntwoord);
                        cmd.Parameters.AddWithValue("@FoutAntwoord1", vraag.FoutAntwoord1);
                        cmd.Parameters.AddWithValue("@FoutAntwoord2", vraag.FoutAntwoord2);
                        cmd.Parameters.AddWithValue("@Niveau", vraag.Niveau);
                        cmd.Parameters.AddWithValue("@ThemaId", vraag.ThemaId);
                        await cmd.ExecuteNonQueryAsync();
                    }
                }
                return new StatusCodeResult(200);
            }
            catch (Exception ex)
            {
                log.LogError(ex + "     -Vraag");
                return new StatusCodeResult(500);
            }
        }
    }
}
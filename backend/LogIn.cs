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
    public static class LogIn
    {
        [FunctionName("LogIn")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "v1/login")] HttpRequest req, ILogger log)
        {
            string connectionString = Environment.GetEnvironmentVariable("ServerConnectionString");
            string json = await new StreamReader(req.Body).ReadToEndAsync();
            List<Gebruiker> gebruikerList = new List<Gebruiker>();
            Gebruiker gebruiker = JsonConvert.DeserializeObject<Gebruiker>(json);

            string GetStringSha256Hash(string text)
            {
                if (String.IsNullOrEmpty(text))
                    return String.Empty;

                using (var sha = new System.Security.Cryptography.SHA256Managed())
                {
                    byte[] textData = System.Text.Encoding.UTF8.GetBytes(text);
                    byte[] hash = sha.ComputeHash(textData);
                    return BitConverter.ToString(hash).Replace("-", String.Empty);
                }
            }

            string wachtwoord = GetStringSha256Hash(gebruiker.Wachtwoord);
            string Email = gebruiker.Email;

            log.LogInformation("C# HTTP trigger function processed a request.");
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    await connection.OpenAsync();
                    using (SqlCommand sqlCommand = new SqlCommand())
                    {
                        sqlCommand.Connection = connection;
                        sqlCommand.CommandText = $"SELECT Leerkracht.Email , Leerkracht.Wachtwoord FROM Leerkracht where Leerkracht.Email = @Email;"; //SQL command
                        sqlCommand.Parameters.AddWithValue("@Email", Email);
                        SqlDataReader reader = await sqlCommand.ExecuteReaderAsync();

                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {
                                string ww = reader["Wachtwoord"].ToString();
                                if (ww == wachtwoord)
                                {
                                    Debug.WriteLine("corect");
                                    return new OkObjectResult("wachtwoord juist");
                                }
                                else
                                {
                                    Debug.WriteLine("fout");
                                    return new OkObjectResult("wachtwoord fout");
                                }
                            }
                        }
                        else
                        {
                            Debug.WriteLine("ongeldig email");
                            return new OkObjectResult("ongeldig email");
                        }
                    }
                }
                return new OkObjectResult(gebruikerList);
            }
            catch (Exception x)
            {
                Debug.WriteLine(x);
                return new StatusCodeResult(500);
            }
        }
    }
}

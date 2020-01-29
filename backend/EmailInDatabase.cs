using Microsoft.Azure.WebJobs;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace MoveForFortune
{
    public class EmailInDatabase
    {
        [FunctionName("EmailInDatabase")]
        public static async Task<bool> EmailokAsync(string email)
        {
            bool returnValue = false;
            using (SqlConnection connection = new SqlConnection(Environment.GetEnvironmentVariable("ServerConnectionString")))
            {
                await connection.OpenAsync();
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    string sql = "SELECT COUNT(LeerkrachtId) AS countLeerkrachten FROM Leerkracht where Email =@email";
                    command.CommandText = sql;
                    command.Parameters.AddWithValue("@email", email);
                    SqlDataReader reader = await command.ExecuteReaderAsync();
                    if (reader.Read())
                    {
                        if (Convert.ToInt16(reader["countLeerkrachten"])==0) {
                            returnValue = true;
                        }
                    }
                }
            }
            return returnValue;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace MoveForFortune.Models
{
    public class Leerkracht
    {
        public int LeerkrachtId { get; set; }
        public string Voornaam { get; set; }
        public string Naam { get; set; }
        public string Email { get; set; }
        public string Wachtwoord { get; set; }
        public int ThemaId { get; set; }
    }
}

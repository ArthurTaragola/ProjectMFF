using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoveForFortune.Models
{
    class Vraag
    {
        public int VraagId { get; set; }
        public string Vraagstelling { get; set; }
        public string JuistAntwoord { get; set; }
        public string FoutAntwoord1 { get; set; }
        public string FoutAntwoord2 { get; set; }
        public int Niveau { get; set; }
        public int ThemaId { get; set; }
    }
}

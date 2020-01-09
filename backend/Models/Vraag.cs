﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace MoveForFortune.Models
{
    class Vraag
    {
        public int VraagId { get; set; }

        //[JsonProperty(PropertyName = "Vraag")]
        public string Vraagstelling { get; set; }
        public string JuistAntwoord { get; set; }
        public string Foutantwoord1 { get; set; }
        public string Foutantwoord2 { get; set; }
        public int Niveau { get; set; }
        public int ThemaId { get; set; }
    }
}

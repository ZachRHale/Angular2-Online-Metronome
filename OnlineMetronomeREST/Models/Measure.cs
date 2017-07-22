using System;
using MySql.Data.MySqlClient;
using OnlineMetronomeREST.Models;

namespace OnlineMetronomeREST.Models
{
    public class Measure
    {
        public string PieceID { get;  set; }
        public int TopNumber { get;  set; }
        public int BottomNumber { get;  set; }
        public int Tempo { get;  set; }

        public int MeasureNumber {get;  set;}

        public Measure() {}
    }
}

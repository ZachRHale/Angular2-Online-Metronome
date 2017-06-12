using System;
using MySql.Data.MySqlClient;
using OnlineMetronomeREST.Models;

namespace OnlineMetronomeREST.Models
{
    public class Measure
    {
        public int PieceID { get; private set; }
        public int Top { get; private set; }
        public int Bottom { get; private set; }
        public int Tempo { get; private set; }

        public Measure(Piece piece, int top, int bottom, int tempo) 
        {
            PieceID = piece.PieceID;
            Top = top;
            Bottom = bottom;
            Tempo = tempo;

        }
    }
}

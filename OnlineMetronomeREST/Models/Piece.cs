using System;
namespace OnlineMetronomeREST.Models
{
    public class Piece
    {

        public string PieceID { get; set; }
        public string PieceName { get; set; }
        public string PieceComposer { get; set; }

        public string PieceOwner {get; set;}

        public Piece(){}
    }
}

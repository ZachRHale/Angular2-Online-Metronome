using System;
namespace OnlineMetronomeREST.Models
{
    public class Piece
    {

        public int PieceID { get; set; }
        public string PieceName { get; set; }
        public string PieceComposer { get; set; }

        public Piece(int pieceid, string piecename, string piececomposer)
        {
            PieceID = pieceid;
            PieceName = piecename;
            PieceComposer = piececomposer;
        }
    }
}

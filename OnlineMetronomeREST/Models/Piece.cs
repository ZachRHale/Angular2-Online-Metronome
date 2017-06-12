using System;
namespace OnlineMetronomeREST.Models
{
    public class Piece
    {

        public int PieceID { get; private set; }
        public string PieceName { get; private set; }
        public string PieceComposer { get; private set; }

        public Piece(int pieceid, string piecename, string piececomposer)
        {
            PieceID = pieceid;
            PieceName = piecename;
            PieceComposer = piececomposer;
        }
    }
}

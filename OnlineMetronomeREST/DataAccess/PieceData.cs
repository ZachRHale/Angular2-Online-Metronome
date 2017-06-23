using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using OnlineMetronomeREST.Models;

namespace OnlineMetronomeREST.DataAccess
                             
{
    public class PieceData
    {
        public Piece GetPiece(int id) 
        {
			string connStr = "server=localhost;user=root;password=root;database=onlinemetronome;SSLmode=none";
			MySqlConnection conn = new MySqlConnection(connStr);

			Piece thePiece = new Piece(0, "","");

			
			try
			{
				Console.WriteLine("Connecting to MySQL...");
				conn.Open();

                string sql = String.Format("SELECT * FROM Pieces WHERE PieceID = {0}", id);
				MySqlCommand cmd = new MySqlCommand(sql, conn);
				MySqlDataReader rdr = cmd.ExecuteReader();

				while (rdr.Read())
				{
					thePiece.PieceID = Int32.Parse(rdr[0].ToString());
					thePiece.PieceName = rdr[1].ToString();
					thePiece.PieceComposer = rdr[2].ToString();
                    
				}
				rdr.Close();
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.ToString());
				
			}

			conn.Close();
			Console.WriteLine("Done.");


            return thePiece;
            
        }

        public List<Measure> GetMeasures(Piece piece){

			string connStr = "server=localhost;user=root;password=root;database=onlinemetronome;SSLmode=none";
			MySqlConnection conn = new MySqlConnection(connStr);
            var someMeasures = new List<Measure>();

			try
			{
				Console.WriteLine("Connecting to MySQL...");
				conn.Open();

                string sql = String.Format("SELECT * FROM Measures WHERE PieceID = {0}", piece.PieceID);
				MySqlCommand cmd = new MySqlCommand(sql, conn);
				MySqlDataReader rdr = cmd.ExecuteReader();

				while (rdr.Read())
				{
                    someMeasures.Add(new Measure(piece, Int32.Parse(rdr[1].ToString()), Int32.Parse(rdr[2].ToString()),80));
				}
				rdr.Close();
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.ToString());
			}

			conn.Close();
			Console.WriteLine("Done.");


            return someMeasures;


			
        }
    }
}

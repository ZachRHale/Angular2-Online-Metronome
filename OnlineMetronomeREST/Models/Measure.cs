using System;
namespace OnlineMetronomeREST.Models
{
    public class Measure
    {
        public int Top { get; private set; }
        public int Bottom { get; private set; }
        public int Tempo { get; private set; }

        public Measure(int top, int bottom, int tempo) 
        {
            Top = top;
            Bottom = bottom;
            Tempo = tempo;

        }
    }
}

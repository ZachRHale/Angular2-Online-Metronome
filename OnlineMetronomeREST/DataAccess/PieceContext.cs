using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OnlineMetronomeREST.Models;
 
namespace OnlineMetronomeREST.DataAccess
{ 
    // >dotnet ef migration add testMigration
    public class PieceMySqlContext : DbContext
    {
        public PieceMySqlContext(DbContextOptions<PieceMySqlContext> options) :base(options)
        { }
         
        public DbSet<User> Users { get; set; }
        public DbSet<Piece> Pieces { get; set; }
        public DbSet<Measure> Measures { get; set; }
 
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().HasKey(m => m.UserID);
            builder.Entity<Piece>().HasKey(m => m.PieceID);
            builder.Entity<Measure>().HasKey(m => new {m.PieceID, m.MeasureNumber});
 
            // shadow properties
            //builder.Entity<User>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<Piece>().Property<DateTime>("UpdatedTimestamp");
            //builder.Entity<Measure>().Property<DateTime>("UpdatedTimestamp");
 
            base.OnModelCreating(builder);
        }
 
        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
 
            updateUpdatedProperty<User>();
            updateUpdatedProperty<Piece>();
            updateUpdatedProperty<Measure>();
 
            return base.SaveChanges();
        }
 
        private void updateUpdatedProperty<T>() where T : class
        {
            var modifiedSourceInfo =
                ChangeTracker.Entries<T>()
                    .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);
 
            foreach (var entry in modifiedSourceInfo)
            {
                //entry.Property("UpdatedTimestamp").CurrentValue = DateTime.UtcNow;
            }
        }
    }
}
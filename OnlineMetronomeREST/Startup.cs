using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Converters;
using Microsoft.AspNetCore.Cors;
using OnlineMetronomeREST.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace OnlineMetronomeREST
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();

            HostingEnvironment = env;
        }

        public IConfigurationRoot Configuration { get; }
        public IHostingEnvironment HostingEnvironment {get;}
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var connection = "";

            // Add framework services.
            services.AddMvc()
            .AddJsonOptions(options =>
	        {
		        options.SerializerSettings.Converters.Add(new StringEnumConverter
		        {
			        CamelCaseText = true
		        });
	        });

            services.AddCors();
            
            if(HostingEnvironment.IsProduction()) {
                connection = Configuration.GetConnectionString("Azure");
            } else if (HostingEnvironment.IsDevelopment()) {
                connection = Configuration.GetConnectionString("Azure");
            }
            
            services.AddDbContext<PieceMySqlContext>(options => options.UseSqlServer(connection));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();

				app.UseCors(builder => builder
                .WithOrigins("http://localhost:4200")
                            .AllowAnyHeader());
            }
    


            
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}

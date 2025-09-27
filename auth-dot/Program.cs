using AuthSystem.Data;
using AuthSystem.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add Entity Framework with SQLite for development
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<AuthDbContext>(options =>
    {
        options.UseSqlite("Data Source=authsystem.db");
    });
}
else
{
    // Add Entity Framework with explicit schema configuration for production
    builder.Services.AddDbContext<AuthDbContext>(options =>
    {
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"), npgsqlOptions =>
        {
            npgsqlOptions.MigrationsAssembly("AuthSystem");
        });
    });
}

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost5173", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:5175")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Add HttpClientFactory
builder.Services.AddHttpClient();

// Add custom services
builder.Services.AddScoped<IPasswordHasherService, PasswordHasherService>();
builder.Services.AddScoped<IJwtService>(provider =>
{
    var configuration = provider.GetRequiredService<IConfiguration>();
    return new JwtService(
        configuration["Jwt:Key"] ?? "default_secret_key_32_chars_min!",
        configuration["Jwt:Issuer"] ?? "AuthSystem",
        configuration["Jwt:Audience"] ?? "AuthSystemUsers",
        int.Parse(configuration["Jwt:ExpiryInMinutes"] ?? "60")
    );
});
builder.Services.AddScoped<IAuthService, AuthService>();

// Add JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "AuthSystem",
        ValidAudience = builder.Configuration["Jwt:Audience"] ?? "AuthSystemUsers",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "default_secret_key_32_chars_min!"))
    };
});

// Add Authorization
builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

// Use CORS
app.UseCors("AllowLocalhost5173");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Initialize the database
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AuthDbContext>();
    try
    {
        // Ensure the database is created
        context.Database.EnsureCreated();
        Console.WriteLine("Database EnsureCreated() completed");
        
        // Different initialization logic for development (SQLite) and production (PostgreSQL)
        if (app.Environment.IsDevelopment())
        {
            Console.WriteLine("Running in development mode with SQLite");
            // For SQLite, the EnsureCreated() should handle table creation
            // Additional manual table creation is not needed and can cause conflicts
        }
        else
        {
            // For PostgreSQL, the EnsureCreated() should handle table creation
            Console.WriteLine("Running in production mode with PostgreSQL");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error initializing database: {ex.Message}");
        // Log the full exception for debugging
        Console.WriteLine($"Full exception: {ex}");
    }
}

app.Run();
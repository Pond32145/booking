using AuthSystem.Data;
using AuthSystem.DTOs;
using AuthSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthSystem.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto?> AuthenticateAsync(LoginRequestDto request);
        Task<AuthResponseDto?> RegisterAsync(RegisterRequestDto request);
        Task<AuthResponseDto?> AuthenticateExternalAsync(string email, string firstName, string lastName, string provider, string providerId);
    }
    
    public class AuthService : IAuthService
    {
        private readonly AuthDbContext _context;
        private readonly IPasswordHasherService _passwordHasher;
        private readonly IJwtService _jwtService;
        
        public AuthService(AuthDbContext context, IPasswordHasherService passwordHasher, IJwtService jwtService)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _jwtService = jwtService;
        }
        
        public async Task<AuthResponseDto?> AuthenticateAsync(LoginRequestDto request)
        {
            Console.WriteLine($"Attempting to authenticate user: {request.Email}");
            
            // Check if the input is an email or username
            var user = await _context.Users.FirstOrDefaultAsync(u => 
                (u.Email == request.Email) && u.Provider == null);
            
            if (user == null)
            {
                Console.WriteLine($"User not found: {request.Email}");
                return null;
            }
            
            Console.WriteLine($"User found: {user.Email}, Provider: {user.Provider}");
            Console.WriteLine($"Stored password hash: {user.PasswordHash}");
            
            if (!_passwordHasher.VerifyPassword(request.Password, user.PasswordHash ?? ""))
            {
                Console.WriteLine("Password verification failed");
                return null;
            }
            
            Console.WriteLine("Password verification succeeded");
            
            var token = _jwtService.GenerateToken(user);
            
            return new AuthResponseDto
            {
                Token = token,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ExpiresAt = DateTime.UtcNow.AddHours(1)
            };
        }
        
        public async Task<AuthResponseDto?> RegisterAsync(RegisterRequestDto request)
        {
            Console.WriteLine($"Attempting to register user: {request.Email}");
            
            // Check if user already exists by email
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => 
                u.Email == request.Email);
            
            if (existingUser != null)
            {
                Console.WriteLine($"User already exists: {request.Email}");
                return null;
            }
            
            var user = new User
            {
                Email = request.Email,
                // Username = request.Email, // Set username to email for consistency
                PasswordHash = _passwordHasher.HashPassword(request.Password),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Provider = null, // Local user
                ProviderId = null
            };
            
            Console.WriteLine($"Creating user with email: {user.Email}");
            Console.WriteLine($"Password hash: {user.PasswordHash}");
            
            _context.Users.Add(user);
            
            try
            {
                await _context.SaveChangesAsync();
                Console.WriteLine($"User successfully saved to database with ID: {user.Id}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving user to database: {ex.Message}");
                Console.WriteLine($"Full exception: {ex}");
                throw; // Re-throw to see the actual error
            }
            
            var token = _jwtService.GenerateToken(user);
            
            return new AuthResponseDto
            {
                Token = token,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ExpiresAt = DateTime.UtcNow.AddHours(1)
            };
        }
        
        public async Task<AuthResponseDto?> AuthenticateExternalAsync(string email, string firstName, string lastName, string provider, string providerId)
        {
            Console.WriteLine($"Attempting external authentication for: {email} with provider: {provider}");
            
            // Check if user already exists with this provider
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Provider == provider && u.ProviderId == providerId);
            
            // If not found, create new user
            if (user == null)
            {
                Console.WriteLine($"Creating new external user: {email}");
                user = new User
                {
                    Email = email,
                    // Username = email, // Set username to email for external users
                    FirstName = firstName,
                    LastName = lastName,
                    Provider = provider,
                    ProviderId = providerId
                };
                
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
            else
            {
                Console.WriteLine($"Found existing external user: {email}");
            }
            
            var token = _jwtService.GenerateToken(user);
            
            return new AuthResponseDto
            {
                Token = token,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ExpiresAt = DateTime.UtcNow.AddHours(1)
            };
        }
    }
}
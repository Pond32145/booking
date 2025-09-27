using System.ComponentModel.DataAnnotations;

namespace AuthSystem.DTOs
{
    public class LoginRequestDto
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string Password { get; set; } = string.Empty;
    }
    
    public class RegisterRequestDto
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string Password { get; set; } = string.Empty;
        
        public string? FirstName { get; set; }
        
        public string? LastName { get; set; }
    }
    
    public class AuthResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime ExpiresAt { get; set; }
    }
}
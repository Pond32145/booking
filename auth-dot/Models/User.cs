using System.ComponentModel.DataAnnotations;

namespace AuthSystem.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        public string? Username { get; set; }
        
        public string? PasswordHash { get; set; }
        
        public string? FirstName { get; set; }
        
        public string? LastName { get; set; }
        
        public string? Provider { get; set; } // Google, Facebook, or Local
        
        public string? ProviderId { get; set; } // ID from external provider
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
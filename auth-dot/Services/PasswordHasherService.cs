using System.Security.Cryptography;
using System.Text;

namespace AuthSystem.Services
{
    public interface IPasswordHasherService
    {
        string HashPassword(string password);
        bool VerifyPassword(string password, string hash);
    }
    
    public class PasswordHasherService : IPasswordHasherService
    {
        private const int SaltSize = 16; // 128 bit
        private const int HashSize = 32; // 256 bit
        private const int Iterations = 10000;
        
        public string HashPassword(string password)
        {
            // For double hashing as requested, we'll hash twice
            // But we need to make it deterministic for verification to work
            
            // First hash with a fixed approach
            string firstHash = HashWithFixedSalt(password, "FirstHashSalt");
            
            // Second hash with a different fixed approach
            string secondHash = HashWithFixedSalt(firstHash, "SecondHashSalt");
            
            return secondHash;
        }
        
        public bool VerifyPassword(string password, string hash)
        {
            // Hash the input password the same way it was hashed when stored
            string passwordHash = HashPassword(password);
            
            // Compare with the stored hash using constant-time comparison
            return CryptographicEquals(passwordHash, hash);
        }
        
        private string HashWithFixedSalt(string input, string saltString)
        {
            // Convert the salt string to bytes
            byte[] salt = Encoding.UTF8.GetBytes(saltString);
            if (salt.Length > SaltSize)
                Array.Resize(ref salt, SaltSize);
            else if (salt.Length < SaltSize)
            {
                byte[] temp = new byte[SaltSize];
                Array.Copy(salt, temp, salt.Length);
                salt = temp;
            }
            
            // Hash input with fixed salt
            using (var pbkdf2 = new Rfc2898DeriveBytes(input, salt, Iterations, HashAlgorithmName.SHA256))
            {
                byte[] hash = pbkdf2.GetBytes(HashSize);
                
                // Combine salt and hash
                byte[] hashBytes = new byte[SaltSize + HashSize];
                Array.Copy(salt, 0, hashBytes, 0, SaltSize);
                Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);
                
                return Convert.ToBase64String(hashBytes);
            }
        }
        
        // Constant-time comparison to prevent timing attacks
        private bool CryptographicEquals(string a, string b)
        {
            // If lengths don't match, they're not equal
            if (a.Length != b.Length)
                return false;
            
            // Convert to bytes for comparison
            byte[] aBytes = Encoding.UTF8.GetBytes(a);
            byte[] bBytes = Encoding.UTF8.GetBytes(b);
            
            // Constant-time comparison
            int result = 0;
            for (int i = 0; i < aBytes.Length; i++)
            {
                result |= aBytes[i] ^ bBytes[i];
            }
            
            return result == 0;
        }
    }
}
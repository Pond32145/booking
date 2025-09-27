using Microsoft.AspNetCore.Mvc;
using AuthSystem.DTOs;
using AuthSystem.Services;
using AuthSystem.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AuthSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly AuthDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;
        
        public AuthController(IAuthService authService, AuthDbContext context, IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _authService = authService;
            _context = context;
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
        }
        
        [HttpGet("test-http")]
        public async Task<ActionResult> TestHttp()
        {
            try
            {
                Console.WriteLine("Testing HTTP client...");
                var httpClient = _httpClientFactory.CreateClient();
                Console.WriteLine("HTTP client created");
                var response = await httpClient.GetAsync("https://httpbin.org/get");
                Console.WriteLine($"HTTP request completed with status: {response.StatusCode}");
                var content = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Content read successfully");
                return Ok(new { status = response.StatusCode, content });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"HTTP test failed: {ex}");
                return BadRequest(new { error = ex.Message });
            }
        }
        
        [HttpGet("users")]
        public async Task<ActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginRequestDto request)
        {
            var result = await _authService.AuthenticateAsync(request);
            
            if (result == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }
            
            return Ok(result);
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterRequestDto request)
        {
            try
            {
                Console.WriteLine($"Received registration request for email: {request.Email}");
                var result = await _authService.RegisterAsync(request);
                
                if (result == null)
                {
                    Console.WriteLine($"Registration failed for email: {request.Email}");
                    return BadRequest(new { message = "User already exists" });
                }
                
                Console.WriteLine($"Registration successful for email: {request.Email}");
                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception during registration: {ex}");
                Console.WriteLine($"Exception details: {ex.Message}");
                return StatusCode(500, new { message = "An error occurred during registration", error = ex.Message });
            }
        }
        
        [HttpGet("google")]
        public ActionResult GoogleLogin()
        {
            try
            {
                var clientId = _configuration["Google:ClientId"];
                // Use the configured redirect URI that matches what's registered with Google
                var redirectUri = _configuration["Google:RedirectUri"];
                var scope = "email profile";
                
                // Log the values for debugging
                Console.WriteLine($"Google OAuth Configuration:");
                Console.WriteLine($"  Client ID: {clientId}");
                Console.WriteLine($"  Redirect URI: {redirectUri}");
                Console.WriteLine($"  Scope: {scope}");
                
                var googleAuthUrl = $"https://accounts.google.com/o/oauth2/v2/auth?client_id={clientId}&redirect_uri={redirectUri}&response_type=code&scope={scope}";
                
                Console.WriteLine($"Redirecting to Google OAuth URL: {googleAuthUrl}");
                
                return Redirect(googleAuthUrl);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GoogleLogin: {ex}");
                return BadRequest(new { message = "Failed to initiate Google login", error = ex.Message });
            }
        }
        
        [HttpGet("facebook")]
        public ActionResult FacebookLogin()
        {
            try
            {
                var appId = _configuration["Facebook:AppId"];
                // Use the configured redirect URI from appsettings
                var redirectUri = _configuration["Facebook:RedirectUri"];
                // Use only the most basic and always available Facebook scopes
                var scope = "public_profile";
                
                // Log the values for debugging
                Console.WriteLine($"Facebook OAuth Configuration:");
                Console.WriteLine($"  App ID: {appId}");
                Console.WriteLine($"  Redirect URI: {redirectUri}");
                Console.WriteLine($"  Scope: {scope}");
                
                var facebookAuthUrl = $"https://www.facebook.com/v19.0/dialog/oauth?client_id={appId}&redirect_uri={redirectUri}&scope={scope}";
                
                Console.WriteLine($"Redirecting to Facebook OAuth URL: {facebookAuthUrl}");
                
                return Redirect(facebookAuthUrl);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in FacebookLogin: {ex}");
                return BadRequest(new { message = "Failed to initiate Facebook login", error = ex.Message });
            }
        }
        
        [HttpGet("google/callback")]
        public async Task<ActionResult> GoogleCallbackGet([FromQuery] string? code = null, [FromQuery] string? email = null, [FromQuery] string? firstName = null, [FromQuery] string? lastName = null, [FromQuery] string? providerId = null)
        {
            Console.WriteLine($"GoogleCallbackGet called with parameters:");
            Console.WriteLine($"  code: {code}");
            Console.WriteLine($"  email: {email}");
            Console.WriteLine($"  firstName: {firstName}");
            Console.WriteLine($"  lastName: {lastName}");
            Console.WriteLine($"  providerId: {providerId}");
            
            // If we received an authorization code, we need to exchange it for user info
            if (!string.IsNullOrEmpty(code))
            {
                try
                {
                    // Exchange code for access token
                    var tokenResponse = await ExchangeCodeForTokenAsync(code);
                    
                    if (tokenResponse?.AccessToken == null)
                    {
                        Console.WriteLine($"Failed to exchange code for token. Error: {tokenResponse?.Error ?? "Unknown error"}");
                        // Return more detailed error information
                        return BadRequest(new { 
                            message = "Failed to exchange code for token", 
                            details = tokenResponse?.Error ?? "Unknown error",
                            code_length = code?.Length,
                            timestamp = DateTime.UtcNow.ToString("o")
                        });
                    }
                    
                    // Get user info using access token
                    var userInfo = await GetUserInfoAsync(tokenResponse.AccessToken);
                    
                    if (userInfo?.Email == null || userInfo?.FirstName == null || userInfo?.LastName == null || userInfo?.Id == null)
                    {
                        Console.WriteLine($"Failed to get user information from Google");
                        return BadRequest(new { message = "Failed to get user information" });
                    }
                    
                    // Authenticate user in our system
                    var result = await _authService.AuthenticateExternalAsync(
                        userInfo.Email, 
                        userInfo.FirstName, 
                        userInfo.LastName, 
                        "Google", 
                        userInfo.Id);
                    
                    if (result == null)
                    {
                        Console.WriteLine($"Authentication failed for user {userInfo.Email}");
                        return BadRequest(new { message = "Authentication failed" });
                    }
                    
                    // Redirect to frontend with token - properly URL encode parameters
                    var redirectUrl = _configuration["Frontend:RedirectUrl"];
                    var encodedToken = Uri.EscapeDataString(result.Token ?? "");
                    var encodedEmail = Uri.EscapeDataString(result.Email ?? "");
                    var encodedFirstName = Uri.EscapeDataString(result.FirstName ?? "");
                    var encodedLastName = Uri.EscapeDataString(result.LastName ?? "");
                    var redirectUri = $"{redirectUrl}?token={encodedToken}&email={encodedEmail}&firstName={encodedFirstName}&lastName={encodedLastName}";
                    Console.WriteLine($"Redirecting to frontend: {redirectUri}");
                    return Redirect(redirectUri);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Exception in GoogleCallbackGet: {ex}");
                    Console.WriteLine($"Exception details: {ex.ToString()}");
                    return BadRequest(new { message = $"OAuth flow failed: {ex.Message}", exception = ex.ToString() });
                }
            }
            
            // Handle direct user info for testing purposes
            if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(firstName) && !string.IsNullOrEmpty(lastName) && !string.IsNullOrEmpty(providerId))
            {
                Console.WriteLine($"Handling direct user info for testing");
                var result = await _authService.AuthenticateExternalAsync(email!, firstName!, lastName!, "Google", providerId!);

                if (result == null)
                {
                    Console.WriteLine($"Authentication failed for direct user info");
                    return BadRequest(new { message = "Authentication failed" });
                }

                // Redirect to frontend with token - properly URL encode parameters
                var redirectUrl = _configuration["Frontend:RedirectUrl"];
                var encodedToken = Uri.EscapeDataString(result.Token ?? "");
                var encodedEmail = Uri.EscapeDataString(result.Email ?? "");
                var encodedFirstName = Uri.EscapeDataString(result.FirstName ?? "");
                var encodedLastName = Uri.EscapeDataString(result.LastName ?? "");
                var redirectUri = $"{redirectUrl}?token={encodedToken}&email={encodedEmail}&firstName={encodedFirstName}&lastName={encodedLastName}";
                Console.WriteLine($"Redirecting to frontend: {redirectUri}");
                return Redirect(redirectUri);
            }
            
            Console.WriteLine($"Missing required information for authentication");
            return BadRequest(new { message = "Missing required information for authentication" });
        }
        
        [HttpPost("google/callback")]
        public async Task<ActionResult> GoogleCallbackPost([FromForm] string? code = null, [FromQuery] string? email = null, [FromQuery] string? firstName = null, [FromQuery] string? lastName = null, [FromQuery] string? providerId = null)
        {
            Console.WriteLine($"GoogleCallbackPost called with parameters:");
            Console.WriteLine($"  code: {code}");
            Console.WriteLine($"  email: {email}");
            Console.WriteLine($"  firstName: {firstName}");
            Console.WriteLine($"  lastName: {lastName}");
            Console.WriteLine($"  providerId: {providerId}");
            
            // If we received an authorization code, we need to exchange it for user info
            if (!string.IsNullOrEmpty(code))
            {
                try
                {
                    // Exchange code for access token
                    var tokenResponse = await ExchangeCodeForTokenAsync(code);
                    
                    if (tokenResponse?.AccessToken == null)
                    {
                        Console.WriteLine($"Failed to exchange code for token. Error: {tokenResponse?.Error ?? "Unknown error"}");
                        // Return more detailed error information
                        return BadRequest(new { 
                            message = "Failed to exchange code for token", 
                            details = tokenResponse?.Error ?? "Unknown error",
                            code_length = code?.Length,
                            timestamp = DateTime.UtcNow.ToString("o")
                        });
                    }
                    
                    // Get user info using access token
                    var userInfo = await GetUserInfoAsync(tokenResponse.AccessToken);
                    
                    if (userInfo?.Email == null || userInfo?.FirstName == null || userInfo?.LastName == null || userInfo?.Id == null)
                    {
                        Console.WriteLine($"Failed to get user information from Google");
                        return BadRequest(new { message = "Failed to get user information" });
                    }
                    
                    // Authenticate user in our system
                    var result = await _authService.AuthenticateExternalAsync(
                        userInfo.Email, 
                        userInfo.FirstName, 
                        userInfo.LastName, 
                        "Google", 
                        userInfo.Id);
                    
                    if (result == null)
                    {
                        Console.WriteLine($"Authentication failed for user {userInfo.Email}");
                        return BadRequest(new { message = "Authentication failed" });
                    }
                    
                    // Redirect to frontend with token - properly URL encode parameters
                    var redirectUrl = _configuration["Frontend:RedirectUrl"];
                    var encodedToken = Uri.EscapeDataString(result.Token ?? "");
                    var encodedEmail = Uri.EscapeDataString(result.Email ?? "");
                    var encodedFirstName = Uri.EscapeDataString(result.FirstName ?? "");
                    var encodedLastName = Uri.EscapeDataString(result.LastName ?? "");
                    var redirectUri = $"{redirectUrl}?token={encodedToken}&email={encodedEmail}&firstName={encodedFirstName}&lastName={encodedLastName}";
                    Console.WriteLine($"Redirecting to frontend: {redirectUri}");
                    return Redirect(redirectUri);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Exception in GoogleCallbackPost: {ex}");
                    Console.WriteLine($"Exception details: {ex.ToString()}");
                    return BadRequest(new { 
                        message = $"OAuth flow failed: {ex.Message}", 
                        exception = ex.ToString(),
                        code_length = code?.Length,
                        timestamp = DateTime.UtcNow.ToString("o")
                    });
                }
            }
            
            // Handle direct user info for testing purposes
            if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(firstName) && !string.IsNullOrEmpty(lastName) && !string.IsNullOrEmpty(providerId))
            {
                Console.WriteLine($"Handling direct user info for testing");
                var result = await _authService.AuthenticateExternalAsync(email!, firstName!, lastName!, "Google", providerId!);

                if (result == null)
                {
                    Console.WriteLine($"Authentication failed for direct user info");
                    return BadRequest(new { message = "Authentication failed" });
                }

                // Redirect to frontend with token - properly URL encode parameters
                var redirectUrl = _configuration["Frontend:RedirectUrl"];
                var encodedToken = Uri.EscapeDataString(result.Token ?? "");
                var encodedEmail = Uri.EscapeDataString(result.Email ?? "");
                var encodedFirstName = Uri.EscapeDataString(result.FirstName ?? "");
                var encodedLastName = Uri.EscapeDataString(result.LastName ?? "");
                var redirectUri = $"{redirectUrl}?token={encodedToken}&email={encodedEmail}&firstName={encodedFirstName}&lastName={encodedLastName}";
                Console.WriteLine($"Redirecting to frontend: {redirectUri}");
                return Redirect(redirectUri);
            }
            
            Console.WriteLine($"Missing required information for authentication");
            return BadRequest(new { message = "Missing required information for authentication" });
        }
        
        [HttpGet("facebook/callback")]
        public async Task<ActionResult> FacebookCallbackGet([FromQuery] string? code = null, [FromQuery] string? email = null, [FromQuery] string? firstName = null, [FromQuery] string? lastName = null, [FromQuery] string? providerId = null)
        {
            Console.WriteLine($"FacebookCallbackGet called with parameters:");
            Console.WriteLine($"  code: {code}");
            Console.WriteLine($"  email: {email}");
            Console.WriteLine($"  firstName: {firstName}");
            Console.WriteLine($"  lastName: {lastName}");
            Console.WriteLine($"  providerId: {providerId}");
            
            // If we received an authorization code, we need to exchange it for user info
            if (!string.IsNullOrEmpty(code))
            {
                try
                {
                    // Exchange code for access token
                    var tokenResponse = await ExchangeFacebookCodeForTokenAsync(code);
                    
                    if (tokenResponse?.AccessToken == null)
                    {
                        Console.WriteLine($"Failed to exchange code for token. Error: {tokenResponse?.Error ?? "Unknown error"}");
                        // Return more detailed error information
                        return BadRequest(new { 
                            message = "Failed to exchange code for token", 
                            details = tokenResponse?.Error ?? "Unknown error",
                            code_length = code?.Length,
                            timestamp = DateTime.UtcNow.ToString("o")
                        });
                    }
                    
                    // Get user info using access token
                    var userInfo = await GetFacebookUserInfoAsync(tokenResponse.AccessToken);
                    
                    // Check if we have the minimum required information
                    if (userInfo?.Id == null || userInfo?.Name == null)
                    {
                        Console.WriteLine($"Failed to get required user information from Facebook");
                        return BadRequest(new { message = "Failed to get user information" });
                    }
                    
                    // Use name as email if email is not available
                    var userEmail = userInfo.Email ?? $"{userInfo.Id}@facebook.com";
                    var userFirstName = userInfo.FirstName ?? userInfo.Name.Split(' ')[0];
                    var userLastName = userInfo.LastName ?? (userInfo.Name.Contains(' ') ? userInfo.Name.Substring(userInfo.Name.IndexOf(' ') + 1) : userInfo.Name);
                    
                    // Authenticate user in our system
                    var result = await _authService.AuthenticateExternalAsync(
                        userEmail, 
                        userFirstName, 
                        userLastName, 
                        "Facebook", 
                        userInfo.Id);
                    
                    if (result == null)
                    {
                        Console.WriteLine($"Authentication failed for user {userEmail}");
                        return BadRequest(new { message = "Authentication failed" });
                    }
                    
                    // Redirect to frontend with token - properly URL encode parameters
                    var redirectUrl = _configuration["Frontend:RedirectUrl"];
                    var encodedToken = Uri.EscapeDataString(result.Token ?? "");
                    var encodedEmail = Uri.EscapeDataString(result.Email ?? "");
                    var encodedFirstName = Uri.EscapeDataString(result.FirstName ?? "");
                    var encodedLastName = Uri.EscapeDataString(result.LastName ?? "");
                    var redirectUri = $"{redirectUrl}?token={encodedToken}&email={encodedEmail}&firstName={encodedFirstName}&lastName={encodedLastName}";
                    Console.WriteLine($"Redirecting to frontend: {redirectUri}");
                    return Redirect(redirectUri);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Exception in FacebookCallbackGet: {ex}");
                    Console.WriteLine($"Exception details: {ex.ToString()}");
                    return BadRequest(new { message = $"OAuth flow failed: {ex.Message}", exception = ex.ToString() });
                }
            }
            
            // Handle direct user info for testing purposes
            if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(firstName) && !string.IsNullOrEmpty(lastName) && !string.IsNullOrEmpty(providerId))
            {
                Console.WriteLine($"Handling direct user info for testing");
                var result = await _authService.AuthenticateExternalAsync(email!, firstName!, lastName!, "Facebook", providerId!);

                if (result == null)
                {
                    Console.WriteLine($"Authentication failed for direct user info");
                    return BadRequest(new { message = "Authentication failed" });
                }

                // Redirect to frontend with token - properly URL encode parameters
                var redirectUrl = _configuration["Frontend:RedirectUrl"];
                var encodedToken = Uri.EscapeDataString(result.Token ?? "");
                var encodedEmail = Uri.EscapeDataString(result.Email ?? "");
                var encodedFirstName = Uri.EscapeDataString(result.FirstName ?? "");
                var encodedLastName = Uri.EscapeDataString(result.LastName ?? "");
                var redirectUri = $"{redirectUrl}?token={encodedToken}&email={encodedEmail}&firstName={encodedFirstName}&lastName={encodedLastName}";
                Console.WriteLine($"Redirecting to frontend: {redirectUri}");
                return Redirect(redirectUri);
            }
            
            Console.WriteLine($"Missing required information for authentication");
            return BadRequest(new { message = "Missing required information for authentication" });
        }
        
        [HttpPost("facebook/callback")]
        public async Task<ActionResult> FacebookCallbackPost([FromForm] string? code = null, [FromQuery] string? email = null, [FromQuery] string? firstName = null, [FromQuery] string? lastName = null, [FromQuery] string? providerId = null)
        {
            Console.WriteLine($"FacebookCallbackPost called with parameters:");
            Console.WriteLine($"  code: {code}");
            Console.WriteLine($"  email: {email}");
            Console.WriteLine($"  firstName: {firstName}");
            Console.WriteLine($"  lastName: {lastName}");
            Console.WriteLine($"  providerId: {providerId}");
            
            // If we received an authorization code, we need to exchange it for user info
            if (!string.IsNullOrEmpty(code))
            {
                try
                {
                    // Exchange code for access token
                    var tokenResponse = await ExchangeFacebookCodeForTokenAsync(code);
                    
                    if (tokenResponse?.AccessToken == null)
                    {
                        Console.WriteLine($"Failed to exchange code for token. Error: {tokenResponse?.Error ?? "Unknown error"}");
                        // Return more detailed error information
                        return BadRequest(new { 
                            message = "Failed to exchange code for token", 
                            details = tokenResponse?.Error ?? "Unknown error",
                            code_length = code?.Length,
                            timestamp = DateTime.UtcNow.ToString("o")
                        });
                    }
                    
                    // Get user info using access token
                    var userInfo = await GetFacebookUserInfoAsync(tokenResponse.AccessToken);
                    
                    // Check if we have the minimum required information
                    if (userInfo?.Id == null || userInfo?.Name == null)
                    {
                        Console.WriteLine($"Failed to get required user information from Facebook");
                        return BadRequest(new { message = "Failed to get user information" });
                    }
                    
                    // Use name as email if email is not available
                    var userEmail = userInfo.Email ?? $"{userInfo.Id}@facebook.com";
                    var userFirstName = userInfo.FirstName ?? userInfo.Name.Split(' ')[0];
                    var userLastName = userInfo.LastName ?? (userInfo.Name.Contains(' ') ? userInfo.Name.Substring(userInfo.Name.IndexOf(' ') + 1) : userInfo.Name);
                    
                    // Authenticate user in our system
                    var result = await _authService.AuthenticateExternalAsync(
                        userEmail, 
                        userFirstName, 
                        userLastName, 
                        "Facebook", 
                        userInfo.Id);
                    
                    if (result == null)
                    {
                        Console.WriteLine($"Authentication failed for user {userEmail}");
                        return BadRequest(new { message = "Authentication failed" });
                    }
                    
                    // Redirect to frontend with token - properly URL encode parameters
                    var redirectUrl = _configuration["Frontend:RedirectUrl"];
                    var encodedToken = Uri.EscapeDataString(result.Token ?? "");
                    var encodedEmail = Uri.EscapeDataString(result.Email ?? "");
                    var encodedFirstName = Uri.EscapeDataString(result.FirstName ?? "");
                    var encodedLastName = Uri.EscapeDataString(result.LastName ?? "");
                    var redirectUri = $"{redirectUrl}?token={encodedToken}&email={encodedEmail}&firstName={encodedFirstName}&lastName={encodedLastName}";
                    Console.WriteLine($"Redirecting to frontend: {redirectUri}");
                    return Redirect(redirectUri);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Exception in FacebookCallbackPost: {ex}");
                    Console.WriteLine($"Exception details: {ex.ToString()}");
                    return BadRequest(new { 
                        message = $"OAuth flow failed: {ex.Message}", 
                        exception = ex.ToString(),
                        code_length = code?.Length,
                        timestamp = DateTime.UtcNow.ToString("o")
                    });
                }
            }
            
            // Handle direct user info for testing purposes
            if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(firstName) && !string.IsNullOrEmpty(lastName) && !string.IsNullOrEmpty(providerId))
            {
                Console.WriteLine($"Handling direct user info for testing");
                var result = await _authService.AuthenticateExternalAsync(email!, firstName!, lastName!, "Facebook", providerId!);

                if (result == null)
                {
                    Console.WriteLine($"Authentication failed for direct user info");
                    return BadRequest(new { message = "Authentication failed" });
                }

                // Redirect to frontend with token - properly URL encode parameters
                var redirectUrl = _configuration["Frontend:RedirectUrl"];
                var encodedToken = Uri.EscapeDataString(result.Token ?? "");
                var encodedEmail = Uri.EscapeDataString(result.Email ?? "");
                var encodedFirstName = Uri.EscapeDataString(result.FirstName ?? "");
                var encodedLastName = Uri.EscapeDataString(result.LastName ?? "");
                var redirectUri = $"{redirectUrl}?token={encodedToken}&email={encodedEmail}&firstName={encodedFirstName}&lastName={encodedLastName}";
                Console.WriteLine($"Redirecting to frontend: {redirectUri}");
                return Redirect(redirectUri);
            }
            
            Console.WriteLine($"Missing required information for authentication");
            return BadRequest(new { message = "Missing required information for authentication" });
        }
        
        private async Task<GoogleTokenResponse?> ExchangeCodeForTokenAsync(string code)
        {
            var httpClient = _httpClientFactory.CreateClient();
            
            var clientId = _configuration["Google:ClientId"];
            var clientSecret = _configuration["Google:ClientSecret"];
            // Use the configured redirect URI that matches what's registered with Google
            var redirectUri = _configuration["Google:RedirectUri"];
            
            // Log the configuration values for debugging
            Console.WriteLine($"ExchangeCodeForTokenAsync configuration:");
            Console.WriteLine($"  Client ID: {clientId}");
            Console.WriteLine($"  Client Secret length: {clientSecret?.Length ?? 0}");
            Console.WriteLine($"  Redirect URI: {redirectUri}");
            Console.WriteLine($"  Code length: {code.Length}");
            
            var tokenRequest = new Dictionary<string, string>
            {
                ["client_id"] = clientId ?? "",
                ["client_secret"] = clientSecret ?? "",
                ["code"] = code,
                ["grant_type"] = "authorization_code",
                ["redirect_uri"] = redirectUri
            };
            
            try
            {
                // Log the actual request content
                var requestContent = new FormUrlEncodedContent(tokenRequest);
                var requestString = await requestContent.ReadAsStringAsync();
                Console.WriteLine($"Token exchange request content: {requestString}");
                
                var response = await httpClient.PostAsync("https://oauth2.googleapis.com/token", requestContent);
                
                var responseBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Token exchange response status: {response.StatusCode}");
                Console.WriteLine($"Token exchange response body: {responseBody}");
                
                // Log response headers for debugging
                Console.WriteLine("Response headers:");
                foreach (var header in response.Headers)
                {
                    Console.WriteLine($"  {header.Key}: {string.Join(", ", header.Value)}");
                }
                
                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Token exchange failed with status {response.StatusCode}");
                    
                    // Try to parse error response
                    try
                    {
                        var errorResponse = JsonSerializer.Deserialize<GoogleTokenErrorResponse>(responseBody);
                        var errorMessage = $"{errorResponse?.Error}: {errorResponse?.ErrorDescription}";
                        Console.WriteLine($"Parsed error response: {errorMessage}");
                        // Check if we actually got error information
                        if (!string.IsNullOrEmpty(errorResponse?.Error))
                        {
                            return new GoogleTokenResponse { Error = errorMessage };
                        }
                        else
                        {
                            // Return the raw response body as the error message
                            return new GoogleTokenResponse { Error = $"HTTP {response.StatusCode}: {responseBody}" };
                        }
                    }
                    catch (Exception parseEx)
                    {
                        Console.WriteLine($"Failed to parse error response: {parseEx.Message}");
                        // Return the raw response body as the error message
                        return new GoogleTokenResponse { 
                            Error = $"HTTP {response.StatusCode}: {responseBody}" 
                        };
                    }
                }
                
                var tokenResponse = JsonSerializer.Deserialize<GoogleTokenResponse>(responseBody);
                Console.WriteLine($"Successfully parsed token response. Access token length: {tokenResponse?.AccessToken?.Length ?? 0}");
                return tokenResponse;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception during token exchange: {ex}");
                Console.WriteLine($"Exception details: {ex.ToString()}");
                // Return more detailed error information
                return new GoogleTokenResponse { 
                    Error = $"Exception: {ex.Message}. Details: {ex.ToString()}" 
                };
            }
        }
        
        private async Task<GoogleUserInfo?> GetUserInfoAsync(string accessToken)
        {
            var httpClient = _httpClientFactory.CreateClient();
            
            Console.WriteLine($"Getting user info with access token length: {accessToken.Length}");
            
            // Use the correct Google userinfo endpoint
            var requestUri = $"https://www.googleapis.com/oauth2/v2/userinfo?access_token={accessToken}";
            Console.WriteLine($"Request URI: {requestUri}");
            
            var response = await httpClient.GetAsync(requestUri);
            
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"User info response status: {response.StatusCode}");
            Console.WriteLine($"User info response body: {responseBody}");
            
            // Log response headers for debugging
            Console.WriteLine("User info response headers:");
            foreach (var header in response.Headers)
            {
                Console.WriteLine($"  {header.Key}: {string.Join(", ", header.Value)}");
            }
            
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Failed to get user info. Status: {response.StatusCode}");
                return null;
            }
            
            try
            {
                var userInfo = JsonSerializer.Deserialize<GoogleUserInfo>(responseBody);
                Console.WriteLine($"Successfully parsed user info. Email: {userInfo?.Email}, Name: {userInfo?.Name}");
                return userInfo;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to parse user info: {ex.Message}");
                return null;
            }
        }
        
        private async Task<FacebookTokenResponse?> ExchangeFacebookCodeForTokenAsync(string code)
        {
            var httpClient = _httpClientFactory.CreateClient();
            
            var appId = _configuration["Facebook:AppId"];
            var appSecret = _configuration["Facebook:AppSecret"];
            // Use the configured redirect URI that matches what's registered with Facebook
            var redirectUri = _configuration["Facebook:RedirectUri"];
            
            // Log the configuration values for debugging
            Console.WriteLine($"ExchangeFacebookCodeForTokenAsync configuration:");
            Console.WriteLine($"  App ID: {appId}");
            Console.WriteLine($"  App Secret length: {appSecret?.Length ?? 0}");
            Console.WriteLine($"  Redirect URI: {redirectUri}");
            Console.WriteLine($"  Code length: {code.Length}");
            
            var tokenRequestUri = $"https://graph.facebook.com/v19.0/oauth/access_token?client_id={appId}&redirect_uri={redirectUri}&client_secret={appSecret}&code={code}";
            
            try
            {
                Console.WriteLine($"Token exchange request URI: {tokenRequestUri}");
                
                var response = await httpClient.GetAsync(tokenRequestUri);
                
                var responseBody = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Token exchange response status: {response.StatusCode}");
                Console.WriteLine($"Token exchange response body: {responseBody}");
                
                // Log response headers for debugging
                Console.WriteLine("Response headers:");
                foreach (var header in response.Headers)
                {
                    Console.WriteLine($"  {header.Key}: {string.Join(", ", header.Value)}");
                }
                
                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Token exchange failed with status {response.StatusCode}");
                    
                    // Try to parse error response
                    try
                    {
                        var errorResponse = JsonSerializer.Deserialize<FacebookTokenErrorResponse>(responseBody);
                        var errorMessage = $"{errorResponse?.Error?.Message}";
                        Console.WriteLine($"Parsed error response: {errorMessage}");
                        // Check if we actually got error information
                        if (!string.IsNullOrEmpty(errorResponse?.Error?.Message))
                        {
                            return new FacebookTokenResponse { Error = errorMessage };
                        }
                        else
                        {
                            // Return the raw response body as the error message
                            return new FacebookTokenResponse { Error = $"HTTP {response.StatusCode}: {responseBody}" };
                        }
                    }
                    catch (Exception parseEx)
                    {
                        Console.WriteLine($"Failed to parse error response: {parseEx.Message}");
                        // Return the raw response body as the error message
                        return new FacebookTokenResponse { 
                            Error = $"HTTP {response.StatusCode}: {responseBody}" 
                        };
                    }
                }
                
                var tokenResponse = JsonSerializer.Deserialize<FacebookTokenResponse>(responseBody);
                Console.WriteLine($"Successfully parsed token response. Access token length: {tokenResponse?.AccessToken?.Length ?? 0}");
                return tokenResponse;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception during Facebook token exchange: {ex}");
                Console.WriteLine($"Exception details: {ex.ToString()}");
                // Return more detailed error information
                return new FacebookTokenResponse { 
                    Error = $"Exception: {ex.Message}. Details: {ex.ToString()}" 
                };
            }
        }
        
        private async Task<FacebookUserInfo?> GetFacebookUserInfoAsync(string accessToken)
        {
            var httpClient = _httpClientFactory.CreateClient();
            
            Console.WriteLine($"Getting Facebook user info with access token length: {accessToken.Length}");
            
            // Use the Facebook Graph API to get user info with correct fields
            // Note: email field will only be included if email permission was granted
            var requestUri = $"https://graph.facebook.com/v19.0/me?access_token={accessToken}&fields=id,name,first_name,last_name,picture";
            Console.WriteLine($"Request URI: {requestUri}");
            
            var response = await httpClient.GetAsync(requestUri);
            
            var responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"Facebook user info response status: {response.StatusCode}");
            Console.WriteLine($"Facebook user info response body: {responseBody}");
            
            // Log response headers for debugging
            Console.WriteLine("Facebook user info response headers:");
            foreach (var header in response.Headers)
            {
                Console.WriteLine($"  {header.Key}: {string.Join(", ", header.Value)}");
            }
            
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Failed to get Facebook user info. Status: {response.StatusCode}");
                return null;
            }
            
            try
            {
                var userInfo = JsonSerializer.Deserialize<FacebookUserInfo>(responseBody);
                Console.WriteLine($"Successfully parsed Facebook user info. Name: {userInfo?.Name}");
                return userInfo;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to parse Facebook user info: {ex.Message}");
                return null;
            }
        }
    }
    
    public class GoogleTokenResponse
    {
        [JsonPropertyName("access_token")]
        public string? AccessToken { get; set; }
        
        [JsonPropertyName("token_type")]
        public string? TokenType { get; set; }
        
        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }
        
        [JsonPropertyName("refresh_token")]
        public string? RefreshToken { get; set; }
        
        public string? Error { get; set; }
    }
    
    public class GoogleTokenErrorResponse
    {
        [JsonPropertyName("error")]
        public string? Error { get; set; }
        
        [JsonPropertyName("error_description")]
        public string? ErrorDescription { get; set; }
    }
    
    public class GoogleUserInfo
    {
        [JsonPropertyName("id")]
        public string? Id { get; set; }
        
        [JsonPropertyName("email")]
        public string? Email { get; set; }
        
        [JsonPropertyName("given_name")]
        public string? FirstName { get; set; }
        
        [JsonPropertyName("family_name")]
        public string? LastName { get; set; }
        
        [JsonPropertyName("name")]
        public string? Name { get; set; }
        
        [JsonPropertyName("picture")]
        public string? Picture { get; set; }
    }
    
    public class FacebookTokenResponse
    {
        [JsonPropertyName("access_token")]
        public string? AccessToken { get; set; }
        
        [JsonPropertyName("token_type")]
        public string? TokenType { get; set; }
        
        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }
        
        public string? Error { get; set; }
    }
    
    public class FacebookTokenErrorResponse
    {
        [JsonPropertyName("error")]
        public FacebookError? Error { get; set; }
    }
    
    public class FacebookError
    {
        [JsonPropertyName("message")]
        public string? Message { get; set; }
        
        [JsonPropertyName("type")]
        public string? Type { get; set; }
        
        [JsonPropertyName("code")]
        public int Code { get; set; }
        
        [JsonPropertyName("fbtrace_id")]
        public string? FbtraceId { get; set; }
    }
    
    public class FacebookUserInfo
    {
        [JsonPropertyName("id")]
        public string? Id { get; set; }
        
        [JsonPropertyName("email")]
        public string? Email { get; set; }
        
        [JsonPropertyName("first_name")]
        public string? FirstName { get; set; }
        
        [JsonPropertyName("last_name")]
        public string? LastName { get; set; }
        
        [JsonPropertyName("name")]
        public string? Name { get; set; }
        
        [JsonPropertyName("picture")]
        public FacebookPicture? Picture { get; set; }
    }
    
    public class FacebookPicture
    {
        [JsonPropertyName("data")]
        public FacebookPictureData? Data { get; set; }
    }
    
    public class FacebookPictureData
    {
        [JsonPropertyName("url")]
        public string? Url { get; set; }
    }
}
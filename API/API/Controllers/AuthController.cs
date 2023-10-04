using LoginAPI3.Data;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using LoginAPI3.Models.UserModels;
using System;
using API.Models.UserModels;
using Microsoft.EntityFrameworkCore;

namespace LoginAPI3.Controllers
{

    [Route("api/[controller]")]
        public class AuthController : Controller
        {
            //public static User user = new User();
            private readonly IConfiguration _configuration;
            private readonly DataContext _context;
            public AuthController(IConfiguration configuration, DataContext context)
            {
                _configuration = configuration;
                _context = context;
            }






            [HttpPost("register")]
            public async Task<ActionResult<User>> Register([FromBody] UserDTO request)
            {
                if (_context.Users.Any(u => u.userName == request.userName))
                {
                    return BadRequest("Username already exists."); 
                }


                CreatePasswordHash(request.password, out byte[] passwordHash, out byte[] passwordSalt);

                var user = new User();

                user.userName = request.userName;
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Role = GetRoleById(request.roleRef);
                

                

                _context.Users.Add(user);
                _context.SaveChanges();
                return Ok();
            }

        [HttpPost("Login")]
        public async Task<ActionResult<string>> Login([FromBody]UserDTO request)
        {
            var user = _context.Users.Include(u => u.Role).FirstOrDefault(u => u.userName == request.userName);
            
            if (user == null)
            {
                return BadRequest("user not found");
            }
               
            

            if (!VerifyPasswordHash(request.password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("wrong password");
            }
               


            string token = CreateToken(user);

            var loggedInUser = new LoggedInUser
            {
                UserRef = user.Id, 
                userName = user.userName,
                Token = token,
                RoleREF = user.Role.RoleId
                
            };

            _context.LoggedInUsers.Add(loggedInUser);
            await _context.SaveChangesAsync();


            return Ok(
                     new
                     {
                         id = user.Id,
                         username = user.userName,
                         Token = token,
                         
                         roleName = user.Role.RoleName
                        
                     }
                ); ; 
               
                 
               
        }

        [HttpDelete("LogOff/{id}")]
        public async Task<ActionResult<LoggedInUser>> LogOff(int id)
        {
            var loggedOfUser = _context.LoggedInUsers.FirstOrDefault(u => u.UserRef == id);

            if (loggedOfUser != null)
            {
               
                _context.LoggedInUsers.Remove(loggedOfUser);

                await _context.SaveChangesAsync();

                return Ok();
            }
            else
            {
                return BadRequest("User not found in LoggedInUsers");
            }


        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
            {
                using (var hmac = new HMACSHA512())
                {
                    passwordSalt = hmac.Key;
                    passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                }
            }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.userName)
            };

            string tokenValue = _configuration.GetSection("AppSettings:Token").Value;

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(tokenValue));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;



        }

        private Role GetRoleById(int roleId)
        {
            
            var role = _context.Roles.FirstOrDefault(r => r.RoleId == roleId);
           
              return role;

            
        }


    }

    

}

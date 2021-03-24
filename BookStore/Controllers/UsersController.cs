using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookStore.Model;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Net.Http;
using RestSharp;
using System.Security.Cryptography;

namespace BookStore.Controllers
{
    public partial class AuthenticateRequest
    {
        public String Email { get; set; }
        public String Password { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly BookContext _context;
        public IConfiguration _configuration;
        public UsersController(BookContext context, IConfiguration config)
        {
            _context = context;
            _configuration = config;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            user.Password = "";
            return user;
        }

        


        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        //Post: api/Users/login
        [HttpPost("login")]
        public async Task<ActionResult<IEnumerable<User>>> LoginUser(AuthenticateRequest user)
        {
            if(user != null && user.Email != null && user.Password != null)
            {
                var CheckUser = _context.Users.Where(u => u.Email.Equals(user.Email)).Include(s => s.Role).FirstOrDefault();
                if(CheckUser != null && BCrypt.Net.BCrypt.Verify(user.Password, CheckUser.Password))
                {
                    if (CheckUser != null)
                    {
                        //var claims = new[]
                        //{
                        //new Claim("Id", CheckUser.Id.ToString()),
                        //new Claim("Name", CheckUser.Name),
                        //new Claim("Email", CheckUser.Email),
                        //new Claim("RoleId", CheckUser.RoleId.ToString()),
                        //};
                        //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                        //var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                        //var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);
                        //var cookie = new HttpCookie();
                        //cookie.Name = "Authorization";
                        //cookie.Value = new JwtSecurityTokenHandler().WriteToken(token).ToString();
                        //var resp = new HttpResponseMessage();
                        //HttpContext.Response.Cookies.Append(cookie.Name, cookie.Value, new CookieOptions { MaxAge = TimeSpan.FromDays(1), Path = "/api/login", HttpOnly = true });
                        CheckUser.Password = null;
                        return Ok(CheckUser);
                    }
                    else
                    {
                        return BadRequest("Login is failed!");
                    }
                }
               else
                {
                    return BadRequest("Login is failed!");
                }
            }else
            {
                return BadRequest("Username and password is not null");
            }
        }


        //Post: api/Users/{userId}/logout
        [HttpPost("{id}/logout")]
        public async Task<IActionResult> Logout(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if(user != null)
            {
                var cookie = Request.Cookies["Authorization"];
               // if (cookie != null)
               // {
                    //HttpContext.Response.Cookies.Delete("Authorization");
                    return Ok(cookie);
                //}
                
            }
            return NotFound("Can not found user by id");
        }


        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }


        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser(User user)
        {
            if(EmailExists(user.Email))
            {
                return BadRequest("Email have been registered!");
            }else
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                user.RoleId = 1;
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok("Create new user successfully!");
            }
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                user.Status = false;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private bool EmailExists(string Email)
        {
            return _context.Users.Any(e => e.Email.Equals(Email));
        }



    }
}

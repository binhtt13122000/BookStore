using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookStore.Model;

namespace BookStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCartsController : ControllerBase
    {
        private readonly BookContext _context;

        public ProductCartsController(BookContext context)
        {
            _context = context;
        }

        // GET: api/ProductCarts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCart>>> GetProductCarts()
        {
            return await _context.ProductCarts.ToListAsync();
        }

        // GET: api/ProductCarts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCart>> GetProductCart(int id)
        {
            var productCart = await _context.ProductCarts.FindAsync(id);

            if (productCart == null)
            {
                return NotFound();
            }

            return productCart;
        }

        // PUT: api/ProductCarts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductCart(int id, ProductCart productCart)
        {
            if (id != productCart.Id)
            {
                return BadRequest();
            }

            _context.Entry(productCart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductCartExistsById(id))
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

        // POST: api/ProductCarts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductCart>> PostProductCart(ProductCart productCart)
        {
            _context.ProductCarts.Add(productCart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductCart", new { id = productCart.Id }, productCart);
        }

        // DELETE: api/ProductCarts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductCart(int id)
        {
            var productCart = await _context.ProductCarts.FindAsync(id);
            if (productCart == null)
            {
                return NotFound();
            }

            _context.ProductCarts.Remove(productCart);
            await _context.SaveChangesAsync();

            return NoContent();
        }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // POST: api/ProductCarts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("users/{userId}/books/{bookId}")]
        public async Task<ActionResult<ProductCart>> AddProductInProductCart(int userId, int bookId, [FromQuery(Name = "quantity")] int quantity)
        {
            if(UserExists(userId))
            {
                var CheckUser = await _context.Users.FindAsync(userId);
                if(BookExists(bookId))
                {
                    var CheckBook = await _context.Books.FindAsync(bookId);
                    if(CheckBook.Quantity >= quantity) {
                        if (ProductCartExists(CheckUser.Id, CheckBook.Id, true))
                        {
                            var ProductCart =  _context.ProductCarts.Where(s => s.UserId.Equals(CheckUser.Id) && s.BookId.Equals(CheckBook.Id) && s.Status.Equals(true)).FirstOrDefault();
                            if (ProductCart.Quantity + quantity <= CheckBook.Quantity)
                            {
                                _context.Entry(ProductCart).State = EntityState.Modified;
                                try
                                {
                                    ProductCart.Quantity = ProductCart.Quantity + quantity;
                                    await _context.SaveChangesAsync();

                                }
                                catch (DbUpdateConcurrencyException)
                                {
                                    throw;
                                }

                                return Ok("Add product in product cart successful!");
                            }
                            else
                            {
                                return BadRequest("Quantity product is not enough to add to cart product!");
                            }
                        }
                        else
                        {
                            var ProductCart = new ProductCart();
                            ProductCart.UserId = CheckUser.Id;
                            ProductCart.User = CheckUser;
                            ProductCart.BookId = CheckBook.Id;
                            ProductCart.Book = CheckBook;
                            ProductCart.Quantity = quantity;
                            _context.ProductCarts.Add(ProductCart);
                            await _context.SaveChangesAsync();
                            return Ok("Add product in product cart successfull");
                        }
                    }else
                    {
                        return BadRequest("Quantity product is not enough to add to cart product!");
                    }
                }
                else
                {
                    return NotFound("Book can not found by book id!");
                }
            }
            else
            {
                return NotFound("User can not found by userId!");
            }
        }


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }

        private bool ProductCartExists(int userId, int bookId, bool status)
        {
            return _context.ProductCarts.Any(e => e.UserId.Equals(userId) && e.BookId.Equals(bookId) && e.Status.Equals(status));
        }

        private bool ProductCartExistsById(int id)
        {
            return _context.ProductCarts.Any(e => e.Id == id);
        }
    }
}

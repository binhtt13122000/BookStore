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
    public class OrdersController : ControllerBase
    {
        private readonly BookContext _context;

        public OrdersController(BookContext context)
        {
            _context = context;
        }

        // GET: api/Orders/users/{userId}
        [HttpGet("users/{userId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByUserId(int userId)
        {
            if (UserExists(userId))
            {
                var order = await _context.Orders.Where(s => s.UserId == userId).OrderByDescending(o => o.CreateTime).Include(o => o.User).Include(o => o.OrderDetails).ThenInclude(or => or.Book).ToListAsync();

                if (order == null)
                {
                    return NotFound("Can not found order by user id");
                }
                return order;
            }else
            {
                return NotFound("User can not found by user id!");
            }
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.OrderByDescending(o => o.CreateTime).Include(o => o.User).Include(o => o.OrderDetails).ThenInclude(or => or.Book).ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        // To protect from overposting attacks, see.https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            order.CreateTime = DateTime.Now;
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // POST: api/Orders/users/{userId}/books/{bookId}/productCarts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("users/{userId}/books/{bookId}/productCarts")]
        public async Task<ActionResult<Order>> OrderProductInProductCart(int userId, int bookId, [FromBody] Order order)
        {
            if (UserExists(userId))
            {
                var CheckUser = await _context.Users.FindAsync(userId);

                if (BookExists(bookId))
                {
                    var CheckBook = await _context.Books.FindAsync(bookId);
                    if (ProductCartExists(CheckUser.Id, CheckBook.Id, true))
                    {
                        using var transaction = _context.Database.BeginTransaction();
                        try
                        {
                            var ProductCart = _context.ProductCarts.Where(s => s.UserId.Equals(CheckUser.Id) && s.BookId.Equals(CheckBook.Id) && s.Status.Equals(true)).FirstOrDefault();
                            if(CheckBook.Quantity >= ProductCart.Quantity)
                            {
                                var Order = new Order();
                                Order.UserId = CheckUser.Id;
                                Order.User = CheckUser;
                                Order.CreateTime = DateTime.Now;
                                Order.Total = (ProductCart.Quantity * CheckBook.Price);
                                Order.PhoneNumber = order.PhoneNumber;
                                Order.Address = order.Address;
                                _context.Orders.Add(Order);
                                await _context.SaveChangesAsync();
                                var GetOrder = _context.Orders.Where(s => s.UserId.Equals(CheckUser.Id)).OrderByDescending(s => s.CreateTime).
                                    FirstOrDefault();
                                var OrderDetail = new OrderDetail();
                                OrderDetail.OrderId = GetOrder.Id;
                                OrderDetail.BookId = CheckBook.Id;
                                OrderDetail.Quantity = ProductCart.Quantity;
                                OrderDetail.Price = CheckBook.Price;
                                _context.OrderDetails.Add(OrderDetail);
                                await _context.SaveChangesAsync();
                                _context.Entry(ProductCart).State = EntityState.Modified;
                                try
                                {
                                    ProductCart.Status = false;
                                    await _context.SaveChangesAsync();
                                    _context.Entry(CheckBook).State = EntityState.Modified;
                                    CheckBook.Quantity = CheckBook.Quantity - ProductCart.Quantity;
                                    await _context.SaveChangesAsync();
                                }
                                catch (DbUpdateConcurrencyException)
                                {
                                    throw;
                                }
                                transaction.Commit();
                                return Ok("Order successfull!");
                            }
                            else
                            {
                                return BadRequest("Quantity of product is not enought to order!");
                            }
                            
                        }
                        catch (Exception e)
                        {
                            transaction.Rollback();
                            return BadRequest(e);
                        }
                    }
                    else
                    {
                        return NotFound("Product Cart can not found by user id and book id");
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

        // POST: api/Orders/users/{userId}/books/productCarts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("users/{userId}/books/productCarts")]
        public async Task<ActionResult<Order>> OrderListProductsInProductCart(int userId, [FromBody] Order order)
        {
            if (UserExists(userId))
            {
                var CheckUser = await _context.Users.FindAsync(userId);

                var ListProductsInCart = await _context.ProductCarts.Where(product => product.UserId == CheckUser.Id && product.Status.Equals(true)).ToListAsync();
                if (ListProductsInCart.Count != 0 && ListProductsInCart != null)
                {
                    using var transaction = _context.Database.BeginTransaction();
                    try
                    {
                        var result =(from ri in _context.ProductCarts
                                      join rr in _context.Books
                                         on ri.BookId equals rr.Id
                                      where ri.UserId == CheckUser.Id
                                      select
                                      (
                                          ri.Quantity * rr.Price
                                      )).Sum() ;
                        var Order = new Order();
                        Order.UserId = CheckUser.Id;
                        Order.User = CheckUser;
                        Order.CreateTime = DateTime.Now;
                        Order.Total = result;
                        Order.PhoneNumber = order.PhoneNumber;
                        Order.Address = order.Address;
                        _context.Orders.Add(Order);
                        await _context.SaveChangesAsync();
                        var GetOrder = _context.Orders.Where(s => s.UserId.Equals(CheckUser.Id)).OrderByDescending(s => s.CreateTime).
                                    FirstOrDefault();
                        foreach (ProductCart productCart in ListProductsInCart)
                        {
                            var CheckBook = await _context.Books.FindAsync(productCart.BookId);
                            if (CheckBook.Quantity >= productCart.Quantity)
                            {
                                var OrderDetail = new OrderDetail();
                                OrderDetail.OrderId = GetOrder.Id;
                                OrderDetail.BookId = CheckBook.Id;
                                OrderDetail.Quantity = productCart.Quantity;
                                OrderDetail.Price = CheckBook.Price;
                                _context.OrderDetails.Add(OrderDetail);
                                await _context.SaveChangesAsync();
                                _context.Entry(productCart).State = EntityState.Modified;
                                try
                                {
                                    productCart.Status = false;
                                    await _context.SaveChangesAsync();
                                    _context.Entry(CheckBook).State = EntityState.Modified;
                                    CheckBook.Quantity = CheckBook.Quantity - productCart.Quantity;
                                    await _context.SaveChangesAsync();
                                }
                                catch (DbUpdateConcurrencyException)
                                {
                                    throw;
                                }
                               
                            }
                            else
                            {
                                transaction.Rollback();
                                return BadRequest("Quantity of product is not enought to order!");
                            }
                        }
                        transaction.Commit();
                        return Ok("Order successfull!");
                    }
                    catch (Exception e)
                    {
                        transaction.Rollback();
                        return BadRequest(e);
                    }
                }
                else
                {
                    return NotFound("List Product Cart can not found by user id");
                }
            }
            else
            {
                return NotFound("User can not found by userId!");
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

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

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}

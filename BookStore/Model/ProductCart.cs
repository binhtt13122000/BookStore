using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace BookStore.Model
{
    [Table("ProductCart")]
    public partial class ProductCart
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        public ProductCart()
        {
        }

        [Column("userId")]
        public int? UserId { get; set; }
        [Column("bookId")]
        public int? BookId { get; set; }
        [Column("quantity")]
        public int Quantity { get; set; }
        [Column("status")]
        public bool? Status { get; set; }

        [ForeignKey(nameof(BookId))]
        [InverseProperty("ProductCarts")]
        public Book Book { get; set; }
        
        [ForeignKey(nameof(UserId))]
        [InverseProperty("ProductCarts")]
        public User User { get; set; }
    }
}

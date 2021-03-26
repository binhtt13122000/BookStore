using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

#nullable disable

namespace BookStore.Model
{
    [Table("Book")]
    public partial class Book
    {
        public Book()
        {
            OrderDetails = new HashSet<OrderDetail>();
            ProductCarts = new HashSet<ProductCart>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [Column("author")]
        [StringLength(50)]
        public string Author { get; set; }
        [Column("price")]
        public double? Price { get; set; }
        [Column("quantity")]
        public int? Quantity { get; set; }
        [Column("image")]
        public string Image { get; set; }
        [Column("status")]
        public bool? Status { get; set; }
        [Column("categoryId")]
        public int? CategoryId { get; set; }

        [ForeignKey(nameof(CategoryId))]
        [InverseProperty("Books")]
        public virtual Category Category { get; set; }
        [InverseProperty(nameof(OrderDetail.Book))]
        [JsonIgnore]
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        
        [JsonIgnore]
        [InverseProperty(nameof(ProductCart.Book))]
        public virtual ICollection<ProductCart> ProductCarts { get; set; }
    }
}

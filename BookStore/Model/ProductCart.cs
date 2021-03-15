using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

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

        [JsonIgnore]
        [ForeignKey(nameof(BookId))]
        [InverseProperty("ProductCarts")]
        public virtual Book Book { get; set; }
        
        [JsonIgnore]
        [ForeignKey(nameof(UserId))]
        [InverseProperty("ProductCarts")]
        public virtual User User { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

#nullable disable

namespace BookStore.Model
{
    [Table("OrderDetail")]
    public partial class OrderDetail
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("orderId")]
        public int? OrderId { get; set; }
        [Column("bookId")]
        public int? BookId { get; set; }
        [Column("quantity")]
        public int Quantity { get; set; }
        [Column("price")]
        public double? Price { get; set; }

        [ForeignKey(nameof(BookId))]
        [InverseProperty("OrderDetails")]
        public virtual Book Book { get; set; }
        [ForeignKey(nameof(OrderId))]
        [JsonIgnore]
        [InverseProperty("OrderDetails")]
        public virtual Order Order { get; set; }
    }
}

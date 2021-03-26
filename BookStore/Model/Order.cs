using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace BookStore.Model
{
    [Table("Order")]
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("userId")]
        public int? UserId { get; set; }
        [Required]
        [Column("phoneNumber")]
        [StringLength(12)]
        public string PhoneNumber { get; set; }
        [Required]
        [Column("address")]
        [StringLength(50)]
        public string Address { get; set; }
        [Column("createTime", TypeName = "datetime")]
        public DateTime? CreateTime { get; set; }
        [Column("total")]
        public double? Total { get; set; }

        [ForeignKey(nameof(UserId))]
        [InverseProperty("Orders")]
        public virtual User User { get; set; }
        [InverseProperty(nameof(OrderDetail.Order))]
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}

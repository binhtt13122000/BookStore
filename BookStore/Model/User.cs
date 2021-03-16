using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace BookStore.Model
{
    [Table("User")]
    [Index(nameof(Email), Name = "UQ__User__AB6E61644D0B37D0", IsUnique = true)]
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
            ProductCarts = new HashSet<ProductCart>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        
        [Required]
        [Column("email")]
        [StringLength(50, MinimumLength = 10)]
        [RegularExpression(@"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}")]
        public string Email { get; set; }
        
        [Required]
        [Column("password")]
        [StringLength(100, MinimumLength =5)]
        public string Password { get; set; }
        
        [Required]
        [Column("name")]
        [StringLength(50)]
        
        public string Name { get; set; }
        [Column("status")]
        
        public bool? Status { get; set; }
        [Column("roleId")]
        
        public int? RoleId { get; set; }

        [ForeignKey(nameof(RoleId))]
        [InverseProperty("Users")]
        public virtual Role Role { get; set; }
        [InverseProperty(nameof(Order.User))]
        public virtual ICollection<Order> Orders { get; set; }
        [InverseProperty(nameof(ProductCart.User))]
        public virtual ICollection<ProductCart> ProductCarts { get; set; }
    }
}

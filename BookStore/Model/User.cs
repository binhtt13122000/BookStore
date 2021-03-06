using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

#nullable disable

namespace BookStore.Model
{
    [Table("User")]
    [Index(nameof(Email), Name = "UQ__User__AB6E6164DECA1399", IsUnique = true)]
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
        [StringLength(50)]
        public string Email { get; set; }
        [Required]
        [Column("password")]
        [StringLength(100)]
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
        [JsonIgnore]
        [InverseProperty("Users")]
        public virtual Role Role { get; set; }
        [JsonIgnore]
        [InverseProperty(nameof(Order.User))]
        public virtual ICollection<Order> Orders { get; set; }
        [JsonIgnore]
        [InverseProperty(nameof(ProductCart.User))]
        public virtual ICollection<ProductCart> ProductCarts { get; set; }
    }
}

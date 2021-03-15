using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace BookStore.Model
{
    [Table("Category")]
    public partial class Category
    {
        public Category()
        {
            Books = new HashSet<Book>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }

        [InverseProperty(nameof(Book.Category))]
        public virtual ICollection<Book> Books { get; set; }
    }
}

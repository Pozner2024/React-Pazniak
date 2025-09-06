const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, 'shop.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('📊 Connected to SQLite database');
    initializeTables();
  }
});

// Initialize database tables
function initializeTables() {
  // Products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      imageUrl TEXT,
      stock INTEGER DEFAULT 0,
      description TEXT,
      category TEXT,
      brand TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Reviews table
  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      customer_name TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      comment TEXT,
      date TEXT DEFAULT (date('now')),
      verified BOOLEAN DEFAULT 0,
      helpful INTEGER DEFAULT 0,
      avatar TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
    )
  `);

  // Cart sessions table (for persistent cart storage)
  db.run(`
    CREATE TABLE IF NOT EXISTS cart_sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Cart items table
  db.run(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES cart_sessions (id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
      UNIQUE(session_id, product_id)
    )
  `);

  console.log('✅ Database tables initialized');
}

// Database helper functions
const dbHelpers = {
  // Get all products
  getAllProducts: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM products ORDER BY id', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Get product by ID
  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  // Add new product
  addProduct: (product) => {
    return new Promise((resolve, reject) => {
      const { name, price, imageUrl, stock, description, category, brand } = product;
      db.run(
        'INSERT INTO products (name, price, imageUrl, stock, description, category, brand) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, price, imageUrl, stock, description, category, brand],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...product });
        }
      );
    });
  },

  // Update product
  updateProduct: (id, product) => {
    return new Promise((resolve, reject) => {
      const { name, price, imageUrl, stock, description, category, brand } = product;
      db.run(
        'UPDATE products SET name = ?, price = ?, imageUrl = ?, stock = ?, description = ?, category = ?, brand = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, price, imageUrl, stock, description, category, brand, id],
        function(err) {
          if (err) reject(err);
          else resolve({ id, ...product });
        }
      );
    });
  },

  // Delete product
  deleteProduct: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ deleted: this.changes > 0 });
      });
    });
  },

  // Update product stock
  updateProductStock: (id, quantity) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE products SET stock = stock - ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND stock >= ?',
        [quantity, id, quantity],
        function(err) {
          if (err) reject(err);
          else resolve({ updated: this.changes > 0 });
        }
      );
    });
  },

  // Get reviews for product
  getProductReviews: (productId) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC', [productId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Add review
  addReview: (review) => {
    return new Promise((resolve, reject) => {
      const { product_id, customer_name, rating, comment, verified, avatar } = review;
      db.run(
        'INSERT INTO reviews (product_id, customer_name, rating, comment, verified, avatar) VALUES (?, ?, ?, ?, ?, ?)',
        [product_id, customer_name, rating, comment, verified || 0, avatar || '👤'],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...review });
        }
      );
    });
  }
};

module.exports = { db, ...dbHelpers };

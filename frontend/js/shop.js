// =============================================
// SHOP — Loads products.json + renders + filters
// =============================================

let allProducts = [];

async function loadProducts() {
  try {
    const res  = await fetch('/api/products');
    const data = await res.json();
    allProducts = data.products;
    renderProducts('all');
  } catch (err) {
    console.error('Could not load products.json:', err);
    document.getElementById('productsGrid').innerHTML =
      '<p style="color:var(--white-dim);padding:40px;grid-column:1/-1">No products loaded yet. Add products via the Admin Panel.</p>';
  }
}

function renderProducts(tab = 'all') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = tab === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === tab);

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:var(--white-dim);padding:40px;grid-column:1/-1">No products in this category yet.</p>';
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img" style="${p.image ? `background-image:url('${p.image}')` : ''}">
        ${p.image ? '' : `<span style="font-size:60px;position:relative;z-index:1">${p.emoji || '🔩'}</span>`}
      </div>
      <div class="product-info">
        <span class="product-badge">${p.badge || p.category}</span>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.description}</div>
        <div class="product-footer">
          <div class="product-price"><span>₹</span>${Number(p.price).toLocaleString('en-IN')}</div>
          <button class="add-btn" onclick="addToCart('${p.id}')">ADD TO CART</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Tab switching
document.querySelectorAll('.shop-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderProducts(tab.dataset.tab);
  });
});

// Placeholder cart
function addToCart(id) {
  const p = allProducts.find(x => x.id === id);
  if (p) alert(`✅ "${p.name}" added to cart!\n\n(Connect a payment gateway like Razorpay to activate checkout.)`);
}

// Init
loadProducts();

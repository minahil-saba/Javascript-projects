// Sample product data matching Miss Rose products
const products = [
  {
    id: 1,
    name: "Long Lasting Lipstick",
    price: 899,
    category: "lipstick",
    image: "https://th.bing.com/th/id/OIP.wSUotnGSU6dpBmxW12866QHaHa?w=174&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    description: "Long-lasting, moisturizing lipstick with rich color payoff"
  },
  {
    id: 2,
    name: "Matte Foundation",
    price: 1299,
    category: "foundation",
    image: "https://media.takealot.com/covers_images/288dbb8b8309468d95930c1926cedd37/s-pdpxl.file",
    description: "Full coverage matte foundation for flawless skin"
  },
  {
    id: 3,
    name: "Eyeshadow Palette",
    price: 1499,
    category: "eyeshadow",
    image: "https://th.bing.com/th/id/OIP.RoZumwvWloni3ZQTWv38IwHaHa?w=197&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    description: "Professional eyeshadow palette with 12 stunning shades"
  },
  {
    id: 4,
    name: "Blush Palette",
    price: 999,
    category: "blush",
    image: "https://th.bing.com/th/id/OIP.QmpQWHcG8B8ydmSx5ft6uQHaHa?w=198&h=198&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    description: "Multi-shade blush palette for a natural flush"
  }
];

// Shopping cart state
let cart = [];
let currentCategory = 'all';

// DOM elements
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutForm = document.getElementById('checkoutForm');
const closeCart = document.getElementById('closeCart');
const closeCheckout = document.getElementById('closeCheckout');
const productsContainer = document.getElementById("productsContainer");
const categoryLinks = document.querySelectorAll(".dropdown-item");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Auth related DOM elements
const authIcon = document.getElementById('authIcon');
const authModal = document.getElementById('authModal');
const closeAuth = document.getElementById('closeAuth');
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// User state
let currentUser = null;

// Search and filter function
function filterAndSearchProducts() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  let filteredProducts = products;
  
  // Apply category filter if not 'all'
  if (currentCategory !== 'all') {
    filteredProducts = filteredProducts.filter(product => 
      product.category === currentCategory
    );
  }
  
  // Apply search filter if search term exists
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Clear existing products
  productsContainer.innerHTML = '';

  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `
      <div class="no-results">
        <p>No products found${searchTerm ? ` matching "${searchTerm}"` : ''}</p>
      </div>
    `;
  } else {
    // Create and append product cards one by one
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      
      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-details">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <p class="product-price">Rs. ${product.price.toLocaleString()}</p>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      `;
      
      productsContainer.appendChild(productCard);
    });
  }
}

// Add to cart function
window.addToCart = (productId) => {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
  cartModal.classList.add('show');
};

// Update cart display
function updateCart() {
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-details">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="cart-item-price">Rs. ${item.price.toLocaleString()} x ${item.quantity}</p>
        </div>
      </div>
      <button onclick="removeFromCart(${item.id})" class="remove-item-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = total.toLocaleString();
}

// Remove from cart
window.removeFromCart = (productId) => {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
};

// Event listeners
categoryLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    currentCategory = e.target.dataset.category;
    filterAndSearchProducts();
    
    // Update active state visually
    categoryLinks.forEach(l => l.classList.remove('active'));
    e.target.classList.add('active');
  });
});

// Search button click event
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  filterAndSearchProducts();
});

// Search input enter key event
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    filterAndSearchProducts();
  }
});

// Clear search when input is empty
searchInput.addEventListener("input", (e) => {
  if (e.target.value === '') {
    filterAndSearchProducts();
  }
});

cartIcon.addEventListener('click', () => {
  cartModal.classList.add('show');
});

closeCart.addEventListener('click', () => {
  cartModal.classList.remove('show');
});

closeCheckout.addEventListener('click', () => {
  checkoutModal.classList.remove('show');
});

checkoutBtn.addEventListener('click', () => {
  if (!currentUser) {
    alert('Please login to proceed with checkout');
    cartModal.classList.remove('show');
    authModal.style.display = 'block';
    return;
  }
  cartModal.classList.remove('show');
  checkoutModal.classList.add('show');
});

checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your order! We will contact you shortly.');
  cart = [];
  updateCart();
  checkoutModal.classList.remove('show');
});

// Auth event listeners
authIcon.addEventListener('click', () => {
  authModal.style.display = 'block';
});

closeAuth.addEventListener('click', () => {
  authModal.style.display = 'none';
});

authTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    authTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const isLogin = tab.dataset.tab === 'login';
    loginForm.style.display = isLogin ? 'flex' : 'none';
    signupForm.style.display = isLogin ? 'none' : 'flex';
  });
});

// User management
const users = JSON.parse(localStorage.getItem('users') || '[]');

const saveUsers = () => {
  localStorage.setItem('users', JSON.stringify(users));
};

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = signupForm.querySelector('[name="name"]').value;
  const email = signupForm.querySelector('[name="email"]').value;
  const password = signupForm.querySelector('[name="password"]').value;
  const confirmPassword = signupForm.querySelector('[name="confirmPassword"]').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  
  if (users.some(u => u.email === email)) {
    alert('User already exists!');
    return;
  }
  
  const user = { name, email, password };
  users.push(user);
  saveUsers();
  
  alert('Sign up successful! Please login.');
  signupForm.reset();
  authTabs[0].click();
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = loginForm.querySelector('[name="email"]').value;
  const password = loginForm.querySelector('[name="password"]').value;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    currentUser = user;
    authModal.style.display = 'none';
    authIcon.innerHTML = `<i class="fas fa-user-check"></i>`;
    alert(`Welcome back, ${user.name}!`);
    loginForm.reset();
  } else {
    alert('Invalid credentials!');
  }
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.classList.remove('show');
  }
  if (e.target === checkoutModal) {
    checkoutModal.classList.remove('show');
  }
  if (e.target === authModal) {
    authModal.style.display = 'none';
  }
});

// Initialize the page
filterAndSearchProducts();
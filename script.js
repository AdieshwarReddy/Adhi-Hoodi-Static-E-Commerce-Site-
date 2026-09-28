// ==== PRODUCT DATA ====
const products = [
    {
        id: 1,
        name: "Midnight Core",
        category: "Essentials",
        price: 1899,
        oldPrice: 2399,
        badge: "BESTSELLER",
        badgeClass: "",
        description: "Heavyweight everyday hoodie with a clean minimal finish.",
        image: "assets/images/hoodie-01.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "Crimson Edge",
        category: "Graphic",
        price: 2199,
        oldPrice: 2699,
        badge: "NEW",
        badgeClass: "",
        description: "Statement streetwear hoodie featuring an original bold graphic treatment.",
        image: "assets/images/hoodie-02.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 3,
        name: "Urban Ghost",
        category: "Oversized",
        price: 2299,
        oldPrice: 2799,
        badge: "TRENDING",
        badgeClass: "",
        description: "Relaxed oversized silhouette built for modern streetwear layering.",
        image: "assets/images/hoodie-03.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 4,
        name: "Ash Drift",
        category: "Essentials",
        price: 1999,
        oldPrice: 2499,
        badge: "ESSENTIAL",
        badgeClass: "",
        description: "Soft neutral hoodie designed for effortless daily styling.",
        image: "assets/images/hoodie-04.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 5,
        name: "Ember Zip",
        category: "Zip Hoodies",
        price: 2499,
        oldPrice: 2999,
        badge: "LIMITED",
        badgeClass: "limited",
        description: "Premium full-zip hoodie combining comfort and sharp street styling.",
        image: "assets/images/hoodie-05.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 6,
        name: "Street Signal",
        category: "Graphic",
        price: 2349,
        oldPrice: 2899,
        badge: "DROP 01",
        badgeClass: "",
        description: "An expressive graphic hoodie designed for standout streetwear looks.",
        image: "assets/images/hoodie-06.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 7,
        name: "Shadow Form",
        category: "Essentials",
        price: 2099,
        oldPrice: 2599,
        badge: "NEW",
        badgeClass: "",
        description: "Heavyweight dark grey hoodie designed for ultimate comfort and durability.",
        image: "assets/images/new_arrivals/hoodie-07-grey.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 8,
        name: "Solar Flare",
        category: "Graphic",
        price: 2199,
        oldPrice: 2699,
        badge: "RESTOCK",
        badgeClass: "",
        description: "Bold mustard yellow hoodie featuring a bright, energetic colorway.",
        image: "assets/images/new_arrivals/hoodie-08-yellow.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 9,
        name: "Forest Canopy",
        category: "Essentials",
        price: 2149,
        oldPrice: 2649,
        badge: "NEW",
        badgeClass: "",
        description: "Deep green heavyweight hoodie perfect for layering in any season.",
        image: "assets/images/new_arrivals/hoodie-09-green.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 10,
        name: "Blush Core",
        category: "Oversized",
        price: 2299,
        oldPrice: 2799,
        badge: "TRENDING",
        badgeClass: "",
        description: "Relaxed pink oversized silhouette with a soft and comfortable feel.",
        image: "assets/images/new_arrivals/hoodie-10-pink.jpg",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 11,
        name: "Amethyst Drop",
        category: "Graphic",
        price: 2399,
        oldPrice: 2899,
        badge: "LIMITED",
        badgeClass: "limited",
        description: "Striking purple hoodie with a premium finish for modern streetwear aesthetics.",
        image: "assets/images/new_arrivals/hoodie-11-purple.jpg",
        sizes: ["S", "M", "L", "XL"]
    }
];

// ==== STATE ====
let cart = [];
let currentCategory = "ALL";
let selectedSizes = {}; // { productId: size }

// ==== DOM ELEMENTS ====
const navbar = document.getElementById('navbar');
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartEmptyState = document.getElementById('cart-empty');
const cartFooter = document.getElementById('cart-footer');
const cartCount = document.getElementById('cart-count');
const cartSubtotalPrice = document.getElementById('cart-subtotal-price');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const shopNowCartBtn = document.getElementById('shop-now-cart');
const toastContainer = document.getElementById('toast-container');
const checkoutModal = document.getElementById('checkout-modal');
const continueShoppingBtn = document.getElementById('continue-shopping');
const contactForm = document.getElementById('contact-form');

// ==== INITIALIZE ====
function init() {
    loadCart();
    renderProducts();
    setupEventListeners();
    updateCartUI();
}

// ==== FORMAT CURRENCY ====
function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

// ==== RENDER PRODUCTS ====
function renderProducts() {
    productsGrid.innerHTML = '';
    
    const filteredProducts = currentCategory === "ALL" 
        ? products 
        : products.filter(p => p.category.toUpperCase() === currentCategory.toUpperCase());
        
    filteredProducts.forEach(product => {
        // Initialize default size if not selected
        if (!selectedSizes[product.id]) {
            selectedSizes[product.id] = product.sizes[0]; // Auto-select first size
        }
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                <span class="product-badge ${product.badgeClass}">${product.badge}</span>
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            </div>
            <div class="product-info">
                <div class="product-meta">
                    <span class="product-category">${product.category}</span>
                    <div class="product-rating">
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                    </div>
                </div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-price-row">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    <span class="old-price">${formatPrice(product.oldPrice)}</span>
                </div>
                <div class="size-selector" id="size-selector-${product.id}">
                    ${product.sizes.map(size => 
                        `<button class="size-btn ${selectedSizes[product.id] === size ? 'selected' : ''}" data-product="${product.id}" data-size="${size}">${size}</button>`
                    ).join('')}
                </div>
                <button class="btn btn-outline btn-full add-to-cart-btn" data-product="${product.id}">ADD TO CART</button>
            </div>
        `;
        productsGrid.appendChild(card);
    });

    // Add event listeners for the dynamically created buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.product);
            const size = e.target.dataset.size;
            selectedSizes[productId] = size;
            
            // Update UI for this specific size selector
            const container = document.getElementById(`size-selector-${productId}`);
            container.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
        });
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.product);
            addToCart(productId);
        });
    });
}

// ==== CART FUNCTIONALITY ====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const size = selectedSizes[productId];
    
    if (!size) {
        showToast("Please select a size.", "error");
        return;
    }

    const existingItem = cart.find(item => item.id === productId && item.size === size);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} added to your cart.`);
    openCart();
}

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    saveCart();
    updateCartUI();
    showToast("Item removed.");
}

function updateQuantity(productId, size, change) {
    const item = cart.find(item => item.id === productId && item.size === size);
    
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId, size);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function clearCart() {
    if (cart.length === 0) return;
    cart = [];
    saveCart();
    updateCartUI();
    showToast("Cart cleared.");
}

function calculateSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function saveCart() {
    localStorage.setItem('adhihoodi_cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('adhihoodi_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            cart = [];
        }
    }
}

// ==== CART UI ====
function updateCartUI() {
    // Update count in navbar
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart drawer contents
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        cartFooter.style.display = 'none';
        cartEmptyState.style.display = 'flex';
    } else {
        cartItemsContainer.style.display = 'flex';
        cartFooter.style.display = 'block';
        cartEmptyState.style.display = 'none';
        
        cart.forEach(item => {
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <span class="cart-item-meta">Size: ${item.size}</span>
                    <span class="cart-item-price">${formatPrice(item.price)}</span>
                    <div class="cart-item-controls">
                        <div class="qty-control">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, '${item.size}', -1)">-</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, '${item.size}', 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id}, '${item.size}')">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(el);
        });
        
        // Update subtotal
        cartSubtotalPrice.textContent = formatPrice(calculateSubtotal());
    }
}

function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// ==== TOAST NOTIFICATIONS ====
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    // Style differently based on type if needed
    if (type === 'error') {
        toast.style.borderColor = 'var(--accent)';
    }
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ==== CONTACT FORM VALIDATION ====
function validateContactForm(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    let isValid = true;
    
    // Reset errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    
    // Name validation
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required';
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email';
        isValid = false;
    }
    
    // Message validation
    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Message is required';
        isValid = false;
    }
    
    if (isValid) {
        // Send data to Netlify via AJAX
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(new FormData(contactForm)).toString()
        })
        .then(() => {
            showToast("Message sent successfully! We'll be in touch.");
            contactForm.reset();
        })
        .catch((error) => {
            showToast("Oops! There was a problem submitting your form.", "error");
        });
    }
}

// ==== CHECKOUT DEMO ====
function showCheckoutDemo() {
    if (cart.length === 0) return;
    
    const subtotal = calculateSubtotal();
    // Demo shipping is ₹150 unless subtotal is over 1999
    const shipping = subtotal >= 1999 ? 0 : 150;
    const total = subtotal + shipping;
    
    document.getElementById('demo-items-price').textContent = formatPrice(subtotal);
    // document.getElementById('demo-shipping-price').textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    // Find the row for shipping to update it
    const summaryRows = document.querySelectorAll('.checkout-summary .summary-row span:nth-child(2)');
    if(summaryRows.length >= 2) {
        summaryRows[1].textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    }
    
    document.getElementById('demo-total-price').textContent = formatPrice(total);
    
    closeCart();
    checkoutModal.classList.add('active');
}

// ==== EVENT LISTENERS SETUP ====
function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    mobileBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });
    });

    // Category Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');
            
            currentCategory = e.target.dataset.filter;
            renderProducts();
        });
    });

    // Cart Events
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    clearCartBtn.addEventListener('click', clearCart);
    
    shopNowCartBtn.addEventListener('click', () => {
        closeCart();
        window.location.href = '#products';
    });

    checkoutBtn.addEventListener('click', showCheckoutDemo);
    
    continueShoppingBtn.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
        clearCart(); // Optional: clear cart after demo checkout
    });

    // Contact form validation
    contactForm.addEventListener('submit', validateContactForm);
}

// Start application
document.addEventListener('DOMContentLoaded', init);

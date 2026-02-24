// ========== Global Variables ==========
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ========== Update Cart Count in Navigation ==========
function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countEl.textContent = totalItems;
    }
}

// ========== Menu Items Data (Static) ==========
const menuItems = [
    { id: 1, name: 'Margherita Pizza', description: 'Classic cheese and tomato', price: 12.99, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400' },
    { id: 2, name: 'Caesar Salad', description: 'Fresh romaine with Caesar dressing', price: 8.99, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400' },
    { id: 3, name: 'Grilled Salmon', description: 'Served with vegetables', price: 18.99, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
    { id: 4, name: 'Chocolate Cake', description: 'Rich and moist', price: 6.99, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
    { id: 5, name: 'Iced Coffee', description: 'Freshly brewed with ice', price: 4.99, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400' },
    { id: 6, name: 'Fruit Smoothie', description: 'Mixed berries and banana', price: 5.99, image: 'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=400' }
];

// ========== Load Menu Items on menu.html ==========
if (document.querySelector('.menu-page')) {
    const menuContainer = document.getElementById('menu-items');
    if (menuContainer) {
        menuItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">$${item.price.toFixed(2)}</p>
                <button class="btn add-to-cart" data-id="${item.id}">Add to Cart</button>
            `;
            menuContainer.appendChild(itemDiv);
        });

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const item = menuItems.find(i => i.id === id);
                addToCart(item);
            });
        });
    }
}

// ========== Cart Functions ==========
function addToCart(item) {
    const existing = cart.find(cartItem => cartItem.id === item.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${item.name} added to cart!`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems(); // if on cart page
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCartItems();
        }
    }
}

// ========== Display Cart Items on cart.html ==========
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const totalSpan = document.getElementById('cart-total');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalSpan.textContent = '0.00';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} each</p>
            </div>
            <div class="cart-item-actions">
                <button class="decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase" data-id="${item.id}">+</button>
                <button class="remove" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartContainer.appendChild(itemDiv);
    });

    totalSpan.textContent = total.toFixed(2);

    // Attach event listeners
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.id), -1));
    });
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.id), 1));
    });
    document.querySelectorAll('.remove').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
    });
}

// ========== Checkout Button on cart.html ==========
if (document.getElementById('checkout-btn')) {
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        // Simulate payment processing
        document.getElementById('checkout-message').textContent = 'Processing payment...';
        setTimeout(() => {
            // Clear cart
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            displayCartItems();
            document.getElementById('checkout-message').textContent = 'Payment successful! Thank you for your order.';
        }, 1500);
    });
}

// ========== Login Simulation ==========
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulate login – store a flag
        if (email && password) {
            localStorage.setItem('isLoggedIn', 'true');
            document.getElementById('login-message').textContent = 'Login successful! Redirecting...';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            alert('Please enter email and password.');
        }
    });
}

// ========== Check if user is logged in (optional) ==========
// (We don't enforce login, just simulation)

// ========== Initialise ==========
updateCartCount();
if (document.querySelector('.cart-page')) {
    displayCartItems();
}

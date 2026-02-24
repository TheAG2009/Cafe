// ========== Global Variables ==========
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let loggedInUser = localStorage.getItem('loggedInUser') || null; // store name

// ========== Update Cart Count in Navigation ==========
function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countEl.textContent = totalItems;
    }
}

// ========== Menu Items Data (Indian Veg) ==========
const menuItems = [
    { id: 1, name: 'Masala Chai', description: 'Spiced tea with ginger', price: 20, image: 'https://images.unsplash.com/photo-1579632652768-453cb5f7f6b9?w=400' },
    { id: 2, name: 'Filter Coffee', description: 'South Indian style coffee', price: 25, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400' },
    { id: 3, name: 'Samosa', description: 'Crispy pastry with spiced potatoes', price: 15, image: 'https://images.unsplash.com/photo-1601050690597-df0568f7a1f1?w=400' },
    { id: 4, name: 'Vada Pav', description: 'Mumbai style burger', price: 20, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400' },
    { id: 5, name: 'Paneer Tikka Sandwich', description: 'Grilled sandwich with paneer', price: 50, image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400' },
    { id: 6, name: 'Gulab Jamun (2 pcs)', description: 'Soft milk solids in sugar syrup', price: 30, image: 'https://images.unsplash.com/photo-1589119908995-c6837a148b2b?w=400' },
    { id: 7, name: 'Veg Biryani', description: 'Aromatic rice with mixed veggies', price: 80, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400' },
    { id: 8, name: 'Mango Lassi', description: 'Sweet yogurt mango drink', price: 40, image: 'https://images.unsplash.com/photo-1621266046798-7f150ae6a19e?w=400' },
    { id: 9, name: 'Onion Pakoda', description: 'Crispy onion fritters', price: 30, image: 'https://images.unsplash.com/photo-1606491956398-7b2b5e5b7f0a?w=400' }
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
                <p class="price">₹${item.price}</p>
                <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
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
    // Show a small animation instead of alert
    const btn = event.target;
    btn.textContent = '✓ Added';
    setTimeout(() => btn.textContent = 'Add to Cart', 1000);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
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
        totalSpan.textContent = '0';
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
                <p>₹${item.price} each</p>
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

    totalSpan.textContent = total;

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

// ========== Checkout & Payment ==========
if (document.getElementById('checkout-btn')) {
    const checkoutBtn = document.getElementById('checkout-btn');
    const paymentSection = document.getElementById('payment-section');
    const qrSection = document.getElementById('qr-section');
    const cashMessage = document.getElementById('cash-message');
    const thankyouMsg = document.getElementById('thankyou-message');
    const paymentBtns = document.querySelectorAll('.payment-btn');

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        // Show payment options, hide checkout button initially?
        paymentSection.style.display = 'block';
        checkoutBtn.style.display = 'none';
    });

    paymentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const method = e.target.dataset.method;
            // Hide both sections first
            qrSection.style.display = 'none';
            cashMessage.style.display = 'none';

            if (method === 'cash') {
                cashMessage.style.display = 'block';
                thankyouMsg.textContent = ''; // clear
                // Clear cart after a moment
                setTimeout(() => {
                    cart = [];
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    displayCartItems();
                    paymentSection.style.display = 'none';
                    checkoutBtn.style.display = 'block';
                    cashMessage.style.display = 'none';
                    alert('Thank you! Please pay at the counter.');
                }, 2000);
            } else {
                // UPI methods (gpay or phonepe) – show QR
                qrSection.style.display = 'block';
                // You can customize QR data based on method if needed
                const qrImg = qrSection.querySelector('img');
                // For demo, static QR (you can replace with actual UPI ID)
                qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=agscafe@okhdfcbank&pn=AG%27s%20CAFE&am=' + (document.getElementById('cart-total').textContent) + '&cu=INR';
                thankyouMsg.textContent = 'Thank you! After payment, your order will be prepared.';
                // Clear cart after 5 seconds (simulate payment)
                setTimeout(() => {
                    cart = [];
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartCount();
                    displayCartItems();
                    paymentSection.style.display = 'none';
                    checkoutBtn.style.display = 'block';
                    qrSection.style.display = 'none';
                    alert('Payment successful! Thank you.');
                }, 5000);
            }
        });
    });
}

// ========== Login Simulation & UI Update ==========
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simulate login – store user's name (extract from email)
        if (email && password) {
            const name = email.split('@')[0]; // crude name
            localStorage.setItem('loggedInUser', name);
            document.getElementById('login-message').textContent = 'Login successful! Redirecting...';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            alert('Please enter email and password.');
        }
    });
}

// ========== Update UI Based on Login State ==========
function updateUIForLogin() {
    const user = localStorage.getItem('loggedInUser');
    const loginLink = document.getElementById('login-link');
    const userGreeting = document.getElementById('user-greeting');
    const heroLogin = document.getElementById('hero-login');
    const heroOrder = document.getElementById('hero-order');

    if (user) {
        // Hide login link, show greeting
        if (loginLink) loginLink.style.display = 'none';
        if (userGreeting) {
            userGreeting.style.display = 'block';
            userGreeting.textContent = `Welcome, ${user}!`;
        }
        // On home page, show "Order Now" instead of "Login to Order"
        if (heroLogin) heroLogin.style.display = 'none';
        if (heroOrder) heroOrder.style.display = 'inline-block';
    } else {
        if (loginLink) loginLink.style.display = 'inline';
        if (userGreeting) userGreeting.style.display = 'none';
        if (heroLogin) heroLogin.style.display = 'inline-block';
        if (heroOrder) heroOrder.style.display = 'none';
    }
}

// ========== Initialise ==========
updateCartCount();
updateUIForLogin();
if (document.querySelector('.cart-page')) {
    displayCartItems();
}

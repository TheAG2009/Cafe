// ========== Global Variables ==========
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let loggedInUser = localStorage.getItem('loggedInUser') || null;

// ========== Update Cart Count ==========
function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        countEl.textContent = totalItems;
    }
}

// ========== Menu Items Data (50+ Items with REAL Images) ==========
const menuItems = [
    // ----- Dosa Varieties -----
    { id: 1, name: 'Masala Dosa', description: 'Crispy dosa with potato filling', price: 70, image: 'https://images.unsplash.com/photo-1589301760015-d2a2edb43ee0?w=400' },
    { id: 2, name: 'Mysore Masala Dosa', description: 'Dosa with red chutney', price: 80, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400' },
    { id: 3, name: 'Cheese Dosa', description: 'Dosa loaded with cheese', price: 90, image: 'https://images.unsplash.com/photo-1645112411342-4665a10d3e58?w=400' },
    { id: 4, name: 'Onion Dosa', description: 'Dosa with caramelized onions', price: 75, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400' },
    { id: 5, name: 'Rava Dosa', description: 'Crispy semolina dosa', price: 80, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400' },
    { id: 6, name: 'Set Dosa', description: 'Soft spongy dosa (2 pcs)', price: 70, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400' },
    
    // ----- Idli & Vada -----
    { id: 7, name: 'Idli', description: 'Soft rice cakes (2 pcs)', price: 40, image: 'https://images.unsplash.com/photo-1589301760015-d2a2edb43ee0?w=400' },
    { id: 8, name: 'Rava Idli', description: 'Semolina idlis', price: 50, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400' },
    { id: 9, name: 'Medu Vada', description: 'Crispy lentil donuts (2 pcs)', price: 50, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400' },
    { id: 10, name: 'Sambar Vada', description: 'Vada dipped in sambar', price: 60, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400' },
    
    // ----- Chaat -----
    { id: 11, name: 'Pani Puri', description: '6 pcs with spicy water', price: 40, image: 'https://images.unsplash.com/photo-1606491956397-5c5b2ab6f6a2?w=400' },
    { id: 12, name: 'Bhel Puri', description: 'Puffed rice snack', price: 45, image: 'https://images.unsplash.com/photo-1606491956397-5c5b2ab6f6a2?w=400' },
    { id: 13, name: 'Sev Puri', description: 'Crispy puris with chutney', price: 50, image: 'https://images.unsplash.com/photo-1606491956397-5c5b2ab6f6a2?w=400' },
    { id: 14, name: 'Dahi Puri', description: 'Puri with curd and chutney', price: 55, image: 'https://images.unsplash.com/photo-1606491956397-5c5b2ab6f6a2?w=400' },
    { id: 15, name: 'Samosa', description: 'Crispy potato samosa (2 pcs)', price: 30, image: 'https://images.unsplash.com/photo-1601050690597-df0568f7a1f1?w=400' },
    { id: 16, name: 'Vada Pav', description: 'Mumbai style burger', price: 25, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400' },
    
    // ----- South Indian Rice -----
    { id: 17, name: 'Puliyogare', description: 'Tamarind rice', price: 60, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400' },
    { id: 18, name: 'Tomato Rice', description: 'Rice with tomato masala', price: 65, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400' },
    { id: 19, name: 'Coconut Rice', description: 'Rice with fresh coconut', price: 60, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400' },
    { id: 20, name: 'Lemon Rice', description: 'Tangy lemon rice', price: 55, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400' },
    { id: 21, name: 'Curd Rice', description: 'South Indian comfort food', price: 50, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400' },
    
    // ----- Chinese -----
    { id: 22, name: 'Veg Noodles', description: 'Hakka noodles with veggies', price: 80, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
    { id: 23, name: 'Schezwan Noodles', description: 'Spicy noodles', price: 90, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
    { id: 24, name: 'Veg Fried Rice', description: 'Classic fried rice', price: 80, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
    { id: 25, name: 'Schezwan Rice', description: 'Spicy fried rice', price: 90, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
    { id: 26, name: 'Gobi Manchurian', description: 'Cauliflower in manchurian sauce', price: 85, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
    { id: 27, name: 'Chilli Paneer', description: 'Crispy paneer in chilli sauce', price: 95, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400' },
    
    // ----- Punjabi -----
    { id: 28, name: 'Chole Bhature', description: 'Spicy chickpeas with fried bread', price: 100, image: 'https://images.unsplash.com/photo-1626132647523-66bc1f5f3c9e?w=400' },
    { id: 29, name: 'Paneer Tikka', description: 'Grilled paneer with spices', price: 110, image: 'https://images.unsplash.com/photo-1567188040755-1c7e66e82b0b?w=400' },
    { id: 30, name: 'Dal Makhani', description: 'Creamy black lentils', price: 90, image: 'https://images.unsplash.com/photo-1626132647523-66bc1f5f3c9e?w=400' },
    { id: 31, name: 'Butter Naan', description: 'Soft naan with butter', price: 35, image: 'https://images.unsplash.com/photo-1626132647523-66bc1f5f3c9e?w=400' },
    
    // ----- Gujarati -----
    { id: 32, name: 'Khaman Dhokla', description: 'Soft steamed snack', price: 50, image: 'https://images.unsplash.com/photo-1589301760015-d2a2edb43ee0?w=400' },
    { id: 33, name: 'Khandvi', description: 'Rolled gram flour snack', price: 55, image: 'https://images.unsplash.com/photo-1589301760015-d2a2edb43ee0?w=400' },
    { id: 34, name: 'Thepla', description: 'Spiced fenugreek flatbread', price: 40, image: 'https://images.unsplash.com/photo-1589301760015-d2a2edb43ee0?w=400' },
    
    // ----- Maharashtrian -----
    { id: 35, name: 'Misal Pav', description: 'Sprouted curry with pav', price: 70, image: 'https://images.unsplash.com/photo-1589301760015-d2a2edb43ee0?w=400' },
    { id: 36, name: 'Pav Bhaji', description: 'Buttered pav with mixed veg', price: 80, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400' },
    { id: 37, name: 'Sabudana Khichdi', description: 'Tapioca pearls with peanuts', price: 60, image: 'https://images.unsplash.com/photo-1589301760015-d2a2edb43ee0?w=400' },
    
    // ----- Desserts -----
    { id: 38, name: 'Gulab Jamun', description: 'Soft milk solids in syrup (2 pcs)', price: 35, image: 'https://images.unsplash.com/photo-1589119908995-c6837a148b2b?w=400' },
    { id: 39, name: 'Jalebi', description: 'Crispy spiral sweet (4 pcs)', price: 40, image: 'https://images.unsplash.com/photo-1589119908995-c6837a148b2b?w=400' },
    { id: 40, name: 'Rava Kesari', description: 'Semolina dessert', price: 45, image: 'https://images.unsplash.com/photo-1589119908995-c6837a148b2b?w=400' },
    { id: 41, name: 'Ice Cream', description: 'Vanilla/Strawberry/Chocolate', price: 50, image: 'https://images.unsplash.com/photo-1589119908995-c6837a148b2b?w=400' },
    
    // ----- Shakes -----
    { id: 42, name: 'KitKat Shake', description: 'Chocolate shake with KitKat', price: 90, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400' },
    { id: 43, name: 'Oreo Shake', description: 'Oreo cookie milkshake', price: 95, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400' },
    { id: 44, name: 'Mango Shake', description: 'Fresh mango milkshake', price: 80, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400' },
    { id: 45, name: 'Strawberry Shake', description: 'Strawberry milkshake', price: 80, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400' },
    
    // ----- Coffee & Tea -----
    { id: 46, name: 'Filter Coffee', description: 'South Indian style coffee', price: 25, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400' },
    { id: 47, name: 'Masala Chai', description: 'Spiced tea with ginger', price: 20, image: 'https://images.unsplash.com/photo-1579632652768-453cb5f7f6b9?w=400' },
    { id: 48, name: 'Cold Coffee', description: 'Chilled coffee with ice cream', price: 60, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400' },
    { id: 49, name: 'Green Tea', description: 'Healthy green tea', price: 25, image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400' },
    { id: 50, name: 'Badam Milk', description: 'Rich almond milk', price: 40, image: 'https://images.unsplash.com/photo-1579632652768-453cb5f7f6b9?w=400' }
];

// ========== Load Menu Items ==========
document.addEventListener('DOMContentLoaded', function() {
    // Load menu on menu.html
    if (document.querySelector('.menu-page')) {
        const menuContainer = document.getElementById('menu-items');
        if (menuContainer) {
            menuContainer.innerHTML = ''; // Clear existing
            menuItems.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'menu-item';
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="price">₹${item.price}</p>
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                `;
                menuContainer.appendChild(itemDiv);
            });

            // Add to cart buttons - WITH LOGIN POPUP CHECK
            document.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const id = parseInt(e.target.dataset.id);
                    const item = menuItems.find(i => i.id === id);
                    
                    // Check if user is logged in
                    const user = localStorage.getItem('loggedInUser');
                    
                    if (!user) {
                        // Show login popup
                        showLoginPopup(item);
                    } else {
                        // User logged in, add to cart directly
                        addToCart(item);
                        e.target.textContent = '✓ Added';
                        setTimeout(() => e.target.textContent = 'Add to Cart', 1000);
                    }
                });
            });
        }
    }

    // Update UI for login state
    updateUIForLogin();
    updateCartCount();
    
    // Load cart on cart page
    if (document.querySelector('.cart-page')) {
        displayCartItems();
    }
});

// ========== Login Popup Function ==========
function showLoginPopup(item) {
    // Check if popup already exists
    let popup = document.getElementById('login-popup');
    
    if (!popup) {
        // Create popup
        popup = document.createElement('div');
        popup.id = 'login-popup';
        popup.className = 'login-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <div class="popup-header">
                    <h3>Login Required</h3>
                    <button class="close-popup">&times;</button>
                </div>
                <div class="popup-body">
                    <p>Please login to add items to cart and order.</p>
                    <div class="popup-buttons">
                        <button class="btn popup-login">Login Now</button>
                        <button class="btn popup-cancel">Cancel</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
        
        // Add event listeners
        const closeBtn = popup.querySelector('.close-popup');
        const cancelBtn = popup.querySelector('.popup-cancel');
        const loginBtn = popup.querySelector('.popup-login');
        
        closeBtn.addEventListener('click', () => {
            popup.remove();
        });
        
        cancelBtn.addEventListener('click', () => {
            popup.remove();
        });
        
        loginBtn.addEventListener('click', () => {
            // Store the item in session storage to add after login
            sessionStorage.setItem('pendingItem', JSON.stringify(item));
            window.location.href = 'login.html';
        });
    }
    
    // Show popup
    popup.style.display = 'flex';
}

// ========== Check for pending item after login ==========
function checkPendingItem() {
    const pendingItem = sessionStorage.getItem('pendingItem');
    if (pendingItem) {
        const item = JSON.parse(pendingItem);
        addToCart(item);
        sessionStorage.removeItem('pendingItem');
        
        // Show success message
        alert(`${item.name} added to cart!`);
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

// ========== Display Cart Items ==========
function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const totalSpan = document.getElementById('cart-total');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align:center;">Your cart is empty.</p>';
        if (totalSpan) totalSpan.textContent = '0';
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

    if (totalSpan) totalSpan.textContent = total;

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
        
        // Check if user is logged in before checkout
        const user = localStorage.getItem('loggedInUser');
        if (!user) {
            alert('Please login to checkout!');
            window.location.href = 'login.html';
            return;
        }
        
        paymentSection.style.display = 'block';
        checkoutBtn.style.display = 'none';
    });

    paymentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const method = e.target.dataset.method;
            qrSection.style.display = 'none';
            cashMessage.style.display = 'none';

            if (method === 'cash') {
                cashMessage.style.display = 'block';
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
                qrSection.style.display = 'block';
                const total = document.getElementById('cart-total').textContent;
                const qrImg = qrSection.querySelector('img');
                qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=agscafe@okhdfcbank&pn=AG%27s%20CAFE&am=${total}&cu=INR`;
                thankyouMsg.textContent = 'Thank you! After payment, your order will be prepared.';
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

// ========== Login Simulation ==========
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            const name = email.split('@')[0];
            localStorage.setItem('loggedInUser', name);
            document.getElementById('login-message').textContent = 'Login successful! Redirecting...';
            
            // Check if there's a pending item
            setTimeout(() => {
                const pendingItem = sessionStorage.getItem('pendingItem');
                if (pendingItem) {
                    window.location.href = 'menu.html';
                } else {
                    window.location.href = 'index.html';
                }
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

    if (user) {
        if (loginLink) loginLink.style.display = 'none';
        if (userGreeting) {
            userGreeting.style.display = 'block';
            userGreeting.textContent = `Welcome, ${user}!`;
        }
    } else {
        if (loginLink) loginLink.style.display = 'inline';
        if (userGreeting) userGreeting.style.display = 'none';
    }
}

// ========== Check for pending item on menu page load ==========
if (document.querySelector('.menu-page')) {
    checkPendingItem();
}

// ========== Initialise ==========
updateCartCount();
updateUIForLogin();

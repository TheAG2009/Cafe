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

// ========== Menu Items Data (Expanded Indian Veg Menu) ==========
const menuItems = [
    // ----- Dosa Varieties -----
    { id: 1, name: 'Ghee Podi Masala Dosa', description: 'Crispy dosa with ghee and spicy podi masala', price: 85, image: 'https://picsum.photos/seed/ghee-podi-masala-dosa/400/200' },
    { id: 2, name: 'Mysore Masala Dosa', description: 'Dosa spread with red chutney and potato filling', price: 80, image: 'https://picsum.photos/seed/mysore-masala-dosa/400/200' },
    { id: 3, name: 'Cheese Garlic Dosa', description: 'Dosa loaded with cheese and garlic chutney', price: 95, image: 'https://picsum.photos/seed/cheese-garlic-dosa/400/200' },
    { id: 4, name: 'Spring Roll Dosa', description: 'Dosa rolled with spring onion and schezwan sauce', price: 90, image: 'https://picsum.photos/seed/spring-roll-dosa/400/200' },
    { id: 5, name: 'Chocolate Dosa', description: 'Sweet dosa with chocolate and nuts', price: 70, image: 'https://picsum.photos/seed/chocolate-dosa/400/200' },
    { id: 6, name: 'Ragi Sada Dosa', description: 'Healthy ragi dosa served with chutney', price: 65, image: 'https://picsum.photos/seed/ragi-sada-dosa/400/200' },
    { id: 7, name: 'Set Dosa (Sagu)', description: 'Soft spongy dosa with vegetable sagu', price: 75, image: 'https://picsum.photos/seed/set-dosa/400/200' },

    // ----- Idli & Vada Variations -----
    { id: 8, name: 'Sambar Vada Dip', description: 'Crispy vada served with sambar', price: 50, image: 'https://picsum.photos/seed/sambar-vada/400/200' },
    { id: 9, name: 'Rava Idli', description: 'Soft semolina idlis with chutney', price: 55, image: 'https://picsum.photos/seed/rava-idli/400/200' },
    { id: 10, name: 'Kanchipuram Idli', description: 'Spiced idli from Kanchipuram', price: 60, image: 'https://picsum.photos/seed/kanchipuram-idli/400/200' },
    { id: 11, name: 'Malgapudi Vada', description: 'Soft vada with malgapudi powder', price: 50, image: 'https://picsum.photos/seed/malgapudi-vada/400/200' },
    { id: 12, name: 'Curd Vada', description: 'Vada soaked in spiced curd', price: 65, image: 'https://picsum.photos/seed/curd-vada/400/200' },
    { id: 13, name: 'Fried Mini Idli', description: 'Baby idlis tossed in chutney powder', price: 60, image: 'https://picsum.photos/seed/fried-mini-idli/400/200' },

    // ----- Quick Bites & Chaat -----
    { id: 14, name: 'Dahi Puri', description: 'Crispy puris filled with curd and chutney', price: 45, image: 'https://picsum.photos/seed/dahi-puri/400/200' },
    { id: 15, name: 'Sev Puri', description: 'Puri topped with sev and chutneys', price: 40, image: 'https://picsum.photos/seed/sev-puri/400/200' },
    { id: 16, name: 'Samosa Pav', description: 'Samosa served with soft pav', price: 35, image: 'https://picsum.photos/seed/samosa-pav/400/200' },
    { id: 17, name: 'Vada Pav', description: 'Mumbai style vada in pav', price: 25, image: 'https://picsum.photos/seed/vada-pav/400/200' },
    { id: 18, name: 'Cheese Chilli Toast', description: 'Toasted bread with cheese and chillies', price: 55, image: 'https://picsum.photos/seed/cheese-chilli-toast/400/200' },
    { id: 19, name: 'Bun Maska', description: 'Soft bun with butter', price: 30, image: 'https://picsum.photos/seed/bun-maska/400/200' },
    { id: 20, name: 'Corn Bhel', description: 'Corn mixed with chaat masala and sev', price: 40, image: 'https://picsum.photos/seed/corn-bhel/400/200' },

    // ----- South Indian Rice & Mains -----
    { id: 21, name: 'Puliogare (Tamarind Rice)', description: 'Tangy tamarind flavored rice', price: 60, image: 'https://picsum.photos/seed/puliogare/400/200' },
    { id: 22, name: 'Pongal', description: 'Comforting rice and lentil dish', price: 70, image: 'https://picsum.photos/seed/pongal/400/200' },
    { id: 23, name: 'Tomato Bath', description: 'Rice cooked in tomato masala', price: 65, image: 'https://picsum.photos/seed/tomato-bath/400/200' },
    { id: 24, name: 'Coconut Rice', description: 'Rice flavored with fresh coconut', price: 60, image: 'https://picsum.photos/seed/coconut-rice/400/200' },
    { id: 25, name: 'Mini Tiffin (Combo Meal)', description: 'Dosa, vada, idli, pongal combo', price: 120, image: 'https://picsum.photos/seed/mini-tiffin/400/200' },

    // ----- Indo-Chinese Starters -----
    { id: 26, name: 'Paneer Chilli Dry', description: 'Crispy paneer in spicy chilli sauce', price: 90, image: 'https://picsum.photos/seed/paneer-chilli/400/200' },
    { id: 27, name: 'Gobi Manchurian', description: 'Cauliflower florets in manchurian sauce', price: 80, image: 'https://picsum.photos/seed/gobi-manchurian/400/200' },
    { id: 28, name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with veggies', price: 85, image: 'https://picsum.photos/seed/veg-hakka-noodles/400/200' },
    { id: 29, name: 'Schezwan Fried Rice', description: 'Spicy fried rice with schezwan sauce', price: 90, image: 'https://picsum.photos/seed/schezwan-fried-rice/400/200' },
    { id: 30, name: 'Honey Chilli Potato', description: 'Crispy potato strips in honey chilli glaze', price: 75, image: 'https://picsum.photos/seed/honey-chilli-potato/400/200' },

    // ----- Punjabi Specials -----
    { id: 31, name: 'Paneer Tikka', description: 'Grilled paneer with spices', price: 95, image: 'https://picsum.photos/seed/paneer-tikka/400/200' },
    { id: 32, name: 'Chole Bhature', description: 'Spicy chickpeas with fried bread', price: 100, image: 'https://picsum.photos/seed/chole-bhature/400/200' },
    { id: 33, name: 'Amritsari Kulcha', description: 'Stuffed kulcha with chole', price: 90, image: 'https://picsum.photos/seed/amritsari-kulcha/400/200' },
    { id: 34, name: 'Dal Makhani', description: 'Creamy black lentils', price: 85, image: 'https://picsum.photos/seed/dal-makhani/400/200' },
    { id: 35, name: 'Butter Naan', description: 'Soft naan brushed with butter', price: 30, image: 'https://picsum.photos/seed/butter-naan/400/200' },

    // ----- Gujarati Snacks -----
    { id: 36, name: 'Khaman Dhokla', description: 'Soft steamed chickpea snack', price: 50, image: 'https://picsum.photos/seed/khaman-dhokla/400/200' },
    { id: 37, name: 'Khandvi', description: 'Rolled gram flour snack', price: 55, image: 'https://picsum.photos/seed/khandvi/400/200' },
    { id: 38, name: 'Fafda-Jalebi', description: 'Crispy fafda with sweet jalebi', price: 60, image: 'https://picsum.photos/seed/fafda-jalebi/400/200' },
    { id: 39, name: 'Thepla', description: 'Spiced fenugreek flatbread', price: 40, image: 'https://picsum.photos/seed/thepla/400/200' },
    { id: 40, name: 'Handvo', description: 'Savory rice and lentil cake', price: 55, image: 'https://picsum.photos/seed/handvo/400/200' },

    // ----- Maharashtrian Specials -----
    { id: 41, name: 'Misal Pav', description: 'Sprouted curry with pav', price: 70, image: 'https://picsum.photos/seed/misal-pav/400/200' },
    { id: 42, name: 'Pav Bhaji', description: 'Buttered pav with mixed veg bhaji', price: 80, image: 'https://picsum.photos/seed/pav-bhaji/400/200' },
    { id: 43, name: 'Sabudana Khichdi', description: 'Tapioca pearls with peanuts', price: 60, image: 'https://picsum.photos/seed/sabudana-khichdi/400/200' },
    { id: 44, name: 'Thalipeeth', description: 'Multigrain spiced flatbread', price: 50, image: 'https://picsum.photos/seed/thalipeeth/400/200' },

    // ----- Desserts & Shakes -----
    { id: 45, name: 'Gulab Jamun (2 pcs)', description: 'Soft milk solids in sugar syrup', price: 35, image: 'https://picsum.photos/seed/gulab-jamun/400/200' },
    { id: 46, name: 'Rava Kesari', description: 'Semolina sweet dessert', price: 40, image: 'https://picsum.photos/seed/rava-kesari/400/200' },
    { id: 47, name: 'Fruit Salad with Ice Cream', description: 'Fresh fruits with vanilla ice cream', price: 70, image: 'https://picsum.photos/seed/fruit-salad/400/200' },
    { id: 48, name: 'KitKat Shake', description: 'Chocolate shake with KitKat', price: 85, image: 'https://picsum.photos/seed/kitkat-shake/400/200' },
    { id: 49, name: 'Oreo Freakshake', description: 'Overloaded Oreo milkshake', price: 95, image: 'https://picsum.photos/seed/oreo-freakshake/400/200' },
    { id: 50, name: 'Badam Milk', description: 'Rich almond flavored milk', price: 50, image: 'https://picsum.photos/seed/badam-milk/400/200' }
];

// ========== Load Menu Items on menu.html ==========
if (document.querySelector('.menu-page')) {
    const menuContainer = document.getElementById('menu-items');
    if (menuContainer) {
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
    // Visual feedback
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
                // UPI QR code with amount (using a sample UPI ID)
                qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=agscafe@okhdfcbank&pn=AG%27s%20CAFE&am=${total}&cu=INR`;
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

// ========== Login Simulation & UI Update ==========
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            const name = email.split('@')[0];
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
        if (loginLink) loginLink.style.display = 'none';
        if (userGreeting) {
            userGreeting.style.display = 'block';
            userGreeting.textContent = `Welcome, ${user}!`;
        }
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
}// ========== Global Variables ==========
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

// ========== Menu Items Data (Expanded Indian Veg Menu) ==========
const menuItems = [
    // ----- Dosa Varieties -----
    { id: 1, name: 'Ghee Podi Masala Dosa', description: 'Crispy dosa with ghee and spicy podi masala', price: 85, image: 'https://picsum.photos/seed/ghee-podi-masala-dosa/400/200' },
    { id: 2, name: 'Mysore Masala Dosa', description: 'Dosa spread with red chutney and potato filling', price: 80, image: 'https://picsum.photos/seed/mysore-masala-dosa/400/200' },
    { id: 3, name: 'Cheese Garlic Dosa', description: 'Dosa loaded with cheese and garlic chutney', price: 95, image: 'https://picsum.photos/seed/cheese-garlic-dosa/400/200' },
    { id: 4, name: 'Spring Roll Dosa', description: 'Dosa rolled with spring onion and schezwan sauce', price: 90, image: 'https://picsum.photos/seed/spring-roll-dosa/400/200' },
    { id: 5, name: 'Chocolate Dosa', description: 'Sweet dosa with chocolate and nuts', price: 70, image: 'https://picsum.photos/seed/chocolate-dosa/400/200' },
    { id: 6, name: 'Ragi Sada Dosa', description: 'Healthy ragi dosa served with chutney', price: 65, image: 'https://picsum.photos/seed/ragi-sada-dosa/400/200' },
    { id: 7, name: 'Set Dosa (Sagu)', description: 'Soft spongy dosa with vegetable sagu', price: 75, image: 'https://picsum.photos/seed/set-dosa/400/200' },

    // ----- Idli & Vada Variations -----
    { id: 8, name: 'Sambar Vada Dip', description: 'Crispy vada served with sambar', price: 50, image: 'https://picsum.photos/seed/sambar-vada/400/200' },
    { id: 9, name: 'Rava Idli', description: 'Soft semolina idlis with chutney', price: 55, image: 'https://picsum.photos/seed/rava-idli/400/200' },
    { id: 10, name: 'Kanchipuram Idli', description: 'Spiced idli from Kanchipuram', price: 60, image: 'https://picsum.photos/seed/kanchipuram-idli/400/200' },
    { id: 11, name: 'Malgapudi Vada', description: 'Soft vada with malgapudi powder', price: 50, image: 'https://picsum.photos/seed/malgapudi-vada/400/200' },
    { id: 12, name: 'Curd Vada', description: 'Vada soaked in spiced curd', price: 65, image: 'https://picsum.photos/seed/curd-vada/400/200' },
    { id: 13, name: 'Fried Mini Idli', description: 'Baby idlis tossed in chutney powder', price: 60, image: 'https://picsum.photos/seed/fried-mini-idli/400/200' },

    // ----- Quick Bites & Chaat -----
    { id: 14, name: 'Dahi Puri', description: 'Crispy puris filled with curd and chutney', price: 45, image: 'https://picsum.photos/seed/dahi-puri/400/200' },
    { id: 15, name: 'Sev Puri', description: 'Puri topped with sev and chutneys', price: 40, image: 'https://picsum.photos/seed/sev-puri/400/200' },
    { id: 16, name: 'Samosa Pav', description: 'Samosa served with soft pav', price: 35, image: 'https://picsum.photos/seed/samosa-pav/400/200' },
    { id: 17, name: 'Vada Pav', description: 'Mumbai style vada in pav', price: 25, image: 'https://picsum.photos/seed/vada-pav/400/200' },
    { id: 18, name: 'Cheese Chilli Toast', description: 'Toasted bread with cheese and chillies', price: 55, image: 'https://picsum.photos/seed/cheese-chilli-toast/400/200' },
    { id: 19, name: 'Bun Maska', description: 'Soft bun with butter', price: 30, image: 'https://picsum.photos/seed/bun-maska/400/200' },
    { id: 20, name: 'Corn Bhel', description: 'Corn mixed with chaat masala and sev', price: 40, image: 'https://picsum.photos/seed/corn-bhel/400/200' },

    // ----- South Indian Rice & Mains -----
    { id: 21, name: 'Puliogare (Tamarind Rice)', description: 'Tangy tamarind flavored rice', price: 60, image: 'https://picsum.photos/seed/puliogare/400/200' },
    { id: 22, name: 'Pongal', description: 'Comforting rice and lentil dish', price: 70, image: 'https://picsum.photos/seed/pongal/400/200' },
    { id: 23, name: 'Tomato Bath', description: 'Rice cooked in tomato masala', price: 65, image: 'https://picsum.photos/seed/tomato-bath/400/200' },
    { id: 24, name: 'Coconut Rice', description: 'Rice flavored with fresh coconut', price: 60, image: 'https://picsum.photos/seed/coconut-rice/400/200' },
    { id: 25, name: 'Mini Tiffin (Combo Meal)', description: 'Dosa, vada, idli, pongal combo', price: 120, image: 'https://picsum.photos/seed/mini-tiffin/400/200' },

    // ----- Indo-Chinese Starters -----
    { id: 26, name: 'Paneer Chilli Dry', description: 'Crispy paneer in spicy chilli sauce', price: 90, image: 'https://picsum.photos/seed/paneer-chilli/400/200' },
    { id: 27, name: 'Gobi Manchurian', description: 'Cauliflower florets in manchurian sauce', price: 80, image: 'https://picsum.photos/seed/gobi-manchurian/400/200' },
    { id: 28, name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with veggies', price: 85, image: 'https://picsum.photos/seed/veg-hakka-noodles/400/200' },
    { id: 29, name: 'Schezwan Fried Rice', description: 'Spicy fried rice with schezwan sauce', price: 90, image: 'https://picsum.photos/seed/schezwan-fried-rice/400/200' },
    { id: 30, name: 'Honey Chilli Potato', description: 'Crispy potato strips in honey chilli glaze', price: 75, image: 'https://picsum.photos/seed/honey-chilli-potato/400/200' },

    // ----- Punjabi Specials -----
    { id: 31, name: 'Paneer Tikka', description: 'Grilled paneer with spices', price: 95, image: 'https://picsum.photos/seed/paneer-tikka/400/200' },
    { id: 32, name: 'Chole Bhature', description: 'Spicy chickpeas with fried bread', price: 100, image: 'https://picsum.photos/seed/chole-bhature/400/200' },
    { id: 33, name: 'Amritsari Kulcha', description: 'Stuffed kulcha with chole', price: 90, image: 'https://picsum.photos/seed/amritsari-kulcha/400/200' },
    { id: 34, name: 'Dal Makhani', description: 'Creamy black lentils', price: 85, image: 'https://picsum.photos/seed/dal-makhani/400/200' },
    { id: 35, name: 'Butter Naan', description: 'Soft naan brushed with butter', price: 30, image: 'https://picsum.photos/seed/butter-naan/400/200' },

    // ----- Gujarati Snacks -----
    { id: 36, name: 'Khaman Dhokla', description: 'Soft steamed chickpea snack', price: 50, image: 'https://picsum.photos/seed/khaman-dhokla/400/200' },
    { id: 37, name: 'Khandvi', description: 'Rolled gram flour snack', price: 55, image: 'https://picsum.photos/seed/khandvi/400/200' },
    { id: 38, name: 'Fafda-Jalebi', description: 'Crispy fafda with sweet jalebi', price: 60, image: 'https://picsum.photos/seed/fafda-jalebi/400/200' },
    { id: 39, name: 'Thepla', description: 'Spiced fenugreek flatbread', price: 40, image: 'https://picsum.photos/seed/thepla/400/200' },
    { id: 40, name: 'Handvo', description: 'Savory rice and lentil cake', price: 55, image: 'https://picsum.photos/seed/handvo/400/200' },

    // ----- Maharashtrian Specials -----
    { id: 41, name: 'Misal Pav', description: 'Sprouted curry with pav', price: 70, image: 'https://picsum.photos/seed/misal-pav/400/200' },
    { id: 42, name: 'Pav Bhaji', description: 'Buttered pav with mixed veg bhaji', price: 80, image: 'https://picsum.photos/seed/pav-bhaji/400/200' },
    { id: 43, name: 'Sabudana Khichdi', description: 'Tapioca pearls with peanuts', price: 60, image: 'https://picsum.photos/seed/sabudana-khichdi/400/200' },
    { id: 44, name: 'Thalipeeth', description: 'Multigrain spiced flatbread', price: 50, image: 'https://picsum.photos/seed/thalipeeth/400/200' },

    // ----- Desserts & Shakes -----
    { id: 45, name: 'Gulab Jamun (2 pcs)', description: 'Soft milk solids in sugar syrup', price: 35, image: 'https://picsum.photos/seed/gulab-jamun/400/200' },
    { id: 46, name: 'Rava Kesari', description: 'Semolina sweet dessert', price: 40, image: 'https://picsum.photos/seed/rava-kesari/400/200' },
    { id: 47, name: 'Fruit Salad with Ice Cream', description: 'Fresh fruits with vanilla ice cream', price: 70, image: 'https://picsum.photos/seed/fruit-salad/400/200' },
    { id: 48, name: 'KitKat Shake', description: 'Chocolate shake with KitKat', price: 85, image: 'https://picsum.photos/seed/kitkat-shake/400/200' },
    { id: 49, name: 'Oreo Freakshake', description: 'Overloaded Oreo milkshake', price: 95, image: 'https://picsum.photos/seed/oreo-freakshake/400/200' },
    { id: 50, name: 'Badam Milk', description: 'Rich almond flavored milk', price: 50, image: 'https://picsum.photos/seed/badam-milk/400/200' }
];

// ========== Load Menu Items on menu.html ==========
if (document.querySelector('.menu-page')) {
    const menuContainer = document.getElementById('menu-items');
    if (menuContainer) {
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
    // Visual feedback
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
                // UPI QR code with amount (using a sample UPI ID)
                qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=agscafe@okhdfcbank&pn=AG%27s%20CAFE&am=${total}&cu=INR`;
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

// ========== Login Simulation & UI Update ==========
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            const name = email.split('@')[0];
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
        if (loginLink) loginLink.style.display = 'none';
        if (userGreeting) {
            userGreeting.style.display = 'block';
            userGreeting.textContent = `Welcome, ${user}!`;
        }
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

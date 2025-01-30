// Product Data
const products = [
    {
        id: 1,
        name: "Rose Milk",
        price: 39.99,
        description: "Rose milk is a refreshing, aromatic drink made with milk, rose syrup, and sugar, enjoyed chilled.",
        image: "./img/rose-milk.webp" 
    },
    {
        id: 2,
        name: "Cold coffee",
        price: 149.99,
        description: "Cold coffee is a chilled, creamy beverage made by blending coffee, milk, sugar, and ice for a refreshing taste.",
        image: "./img/cold-coffee.jpeg" 
    },
    {
        id: 3,
        name: "Cappuccino",
        price: 69.99,
        description: "Cappuccino is a rich and frothy espresso-based coffee made with steamed milk and a thick layer of milk foam.",
        image: "./img/Cappuccino.jpeg" 
    },
    {
        id: 4,
        name: "Cortado",
        price: 249.99,
        description: "Cortado is a balanced espresso-based coffee made with equal parts espresso and warm, lightly steamed milk.",
        image: "./img/Cortado.jpeg" 
    },
    {
        id: 5,
        name: "Latte",
        price: 99.99,
        description: "Latte is a creamy espresso-based coffee made with a shot of espresso and steamed milk, topped with a light layer of foam.",
        image: "./img/Latte.jpg" 
    },
    {
        id: 6,
        name: "Packed Cappuccino",
        price: 49.99,
        description: "Packed cappuccino is a ready-to-drink, pre-packaged coffee beverage that combines espresso, milk, and foam for a convenient, creamy coffee experience.",
        image: "./img/Gallery\ img\ 3.png" 
    },
    {
        id: 7,
        name: "Tea",
        price: 24.99,
        description: "Tea is a soothing beverage made by steeping tea leaves, herbs, or spices in hot water, enjoyed plain or with milk and sweeteners.",
        image: "./img/chai.jpg" 
    },
    {
        id: 8,
        name: "Match Coffee",
        price: 349.99,
        description: "Matcha Coffee is a unique fusion of earthy matcha green tea and bold espresso, creating a balanced, energizing beverage with a rich, creamy texture.",
        image: "./img/matcha.jpeg" 
    }
];

function displayProducts() {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${product.image}');"></div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price"> ₹${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}


// Call the function to display products when the page loads
document.addEventListener('DOMContentLoaded', displayProducts);


// Shopping Cart
let cart = [];


// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartModal = document.getElementById('cart-modal');
const checkoutModal = document.getElementById('checkout-modal');
const closeBtn = document.querySelector('.close');
const closeCheckoutBtn = document.querySelector('.close-checkout');
const cartItems = document.getElementById('cart-items');
const checkoutItems = document.getElementById('checkout-items');
const cartTotal = document.getElementById('cart-total');
const checkoutTotal = document.getElementById('checkout-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutForm = document.getElementById('checkout-form');


// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}


// Update Cart
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <h4>${item.name}</h4>
            <p> ₹${item.price.toFixed(2)} x ${item.quantity}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    // Update checkout items display
    if (checkoutItems) {
        checkoutItems.innerHTML = cart.map(item => `
            <div class="checkout-item">
                <p>${item.name} x ${item.quantity} -  ₹${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `).join('');
    }

    // Update totals
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    if (checkoutTotal) {
        checkoutTotal.textContent = total.toFixed(2);
    }
}


// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}


// Cart Modal
document.querySelector('.cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

closeCheckoutBtn.addEventListener('click', () => {
    checkoutModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (e.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
});


// Proceed to Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
    updateCart();
});


// Handle Order Submission
checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(checkoutForm);
    const customerData = Object.fromEntries(formData);
    
    // Prepare order details
    const orderDetails = cart.map(item => 
        `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Prepare email content
    const emailContent = `
        New Order from Cozy Coffee Corner

        Customer Details:
        Name: ${customerData.name}
        Email: ${customerData.email}
        Phone: ${customerData.phone}
        
        Delivery Address:
        ${customerData.address}
        
        Order Details:
        ${orderDetails}
        
        Total Amount: $${total.toFixed(2)}
    `;
 
    try {
        // Send email using SMTP.js
        await Email.send({
            SecureToken: "SMTP_SECURE_TOKEN", // Replace with your SMTP.js secure token
            To: 'tanjoredegreecoffee@yahoo.in',
            From: "your-cafe@email.com",
            Subject: "New Order - Cozy Coffee Corner",
            Body: emailContent
        });

        alert('Thank you for your order! We will process it shortly.');
        cart = [];
        updateCart();
        checkoutModal.style.display = 'none';
        checkoutForm.reset();
    } catch (error) {
        console.error('Error sending email:', error);
        alert('There was an error processing your order. Please try again.');
    }
});


// Initialize
displayProducts();
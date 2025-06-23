// Keranjang Belanja JabarUMKM Hub
const CART_KEY = 'jabarumkm_cart';

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}
function setCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
function addToCart(product) {
    let cart = getCart();
    const idx = cart.findIndex(item => item.id === product.id);
    if (idx > -1) {
        cart[idx].qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    setCart(cart);
    updateCartBadge();
    showPopup('Produk ditambahkan ke keranjang!');
}
function removeFromCart(id) {
    let cart = getCart().filter(item => item.id !== id);
    setCart(cart);
    updateCartBadge();
    renderCartModal();
}
function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((a, b) => a + b.qty, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
}
function showPopup(msg) {
    const popup = document.getElementById('popup-confirm');
    const msgEl = document.getElementById('popup-confirm-msg');
    if (popup && msgEl) {
        msgEl.textContent = msg;
        popup.style.opacity = '1';
        popup.style.pointerEvents = 'auto';
        setTimeout(() => {
            popup.style.opacity = '0';
            popup.style.pointerEvents = 'none';
        }, 1800);
    }
}
function renderCartModal() {
    const modal = document.getElementById('cart-modal');
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    let cart = getCart();
    if (!modal || !itemsEl || !totalEl) return;
    if (cart.length === 0) {
        itemsEl.innerHTML = '<div class="text-center text-gray-500 py-8">Keranjang kosong.</div>';
        totalEl.textContent = 'Rp 0';
        return;
    }
    let total = 0;
    itemsEl.innerHTML = cart.map(item => {
        const price = parseInt(item.price.replace(/\D/g, '')) * item.qty;
        total += price;
        return `<div class="flex items-center gap-4 border-b py-3">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover">
            <div class="flex-1">
                <div class="font-bold text-primary">${item.name}</div>
                <div class="text-sm text-gray-500">${item.qty} x ${item.price}</div>
            </div>
            <div class="font-bold text-accent">Rp ${price.toLocaleString('id-ID')}</div>
            <button onclick="removeFromCart('${item.id}')" class="ml-2 text-red-500 hover:text-red-700 text-xl">&times;</button>
        </div>`;
    }).join('');
    totalEl.textContent = 'Rp ' + total.toLocaleString('id-ID');
}
function openCartModal() {
    renderCartModal();
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}
function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}
function checkoutCart() {
    let cart = getCart();
    if (cart.length === 0) {
        showPopup('Keranjang kosong!');
        return;
    }
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        checkoutModal.classList.remove('hidden');
        checkoutModal.classList.add('flex');
    }
}
// Drawer hamburger menu
function openDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) { drawer.classList.remove('hidden'); drawer.classList.add('flex'); }
}
function closeDrawer() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) { drawer.classList.add('hidden'); drawer.classList.remove('flex'); }
}
// Event binding
window.removeFromCart = removeFromCart;
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    const cartBtn = document.getElementById('cart-btn');
    const closeBtn = document.getElementById('close-cart-modal');
    const checkoutBtn = document.getElementById('checkout-btn');
    if (cartBtn) cartBtn.onclick = openCartModal;
    if (closeBtn) closeBtn.onclick = closeCartModal;
    if (checkoutBtn) checkoutBtn.onclick = checkoutCart;
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeDrawerBtn = document.getElementById('close-drawer');
    const cartBtnMobile = document.getElementById('cart-btn-mobile');
    if (hamburgerBtn) hamburgerBtn.onclick = openDrawer;
    if (closeDrawerBtn) closeDrawerBtn.onclick = closeDrawer;
    if (cartBtnMobile) cartBtnMobile.onclick = function() { closeDrawer(); openCartModal(); };
    // Checkout modal
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutModal = document.getElementById('close-checkout-modal');
    const checkoutForm = document.getElementById('checkout-form');
    if (closeCheckoutModal) closeCheckoutModal.onclick = function() { checkoutModal.classList.add('hidden'); checkoutModal.classList.remove('flex'); };
    if (checkoutForm) {
        checkoutForm.onsubmit = function(e) {
            e.preventDefault();
            // Simulasi loading
            const btn = checkoutForm.querySelector('button[type=submit]');
            btn.disabled = true;
            btn.textContent = 'Mengirim...';
            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = 'Kirim Tagihan';
                checkoutModal.classList.add('hidden');
                checkoutModal.classList.remove('flex');
                setCart([]);
                updateCartBadge();
                showPopup('Tagihan telah dikirim ke email Anda!');
            }, 1800);
        };
    }
}); 
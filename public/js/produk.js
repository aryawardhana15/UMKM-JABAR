document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const elements = {
        namaDaerah: document.getElementById('nama-daerah'),
        productGrid: document.getElementById('product-grid'),
        noProductMessage: document.getElementById('no-product-message'),
        loadingSkeleton: document.getElementById('loading-skeleton'),
        filterDaerah: document.getElementById('filter-daerah'),
        searchProduct: document.getElementById('search-product'),
        sortProduct: document.getElementById('sort-product'),
        loadMoreBtn: document.getElementById('load-more-btn')
    };

    // State Management
    const state = {
        daerah: new URLSearchParams(window.location.search).get('daerah') || '',
        search: '',
        sort: 'popular',
        page: 1,
        perPage: 8,
        wishlist: JSON.parse(localStorage.getItem('wishlist')) || []
    };

    let currentModal = null;

    // Tambahkan di luar fungsi agar bisa diakses di closeModal
    let escapeListener = null;

    // Initialize UI
    initFilters();
    renderProducts();

    // Event Listeners
    elements.filterDaerah.addEventListener('change', handleFilterChange);
    elements.searchProduct.addEventListener('input', debounce(handleSearch, 300));
    elements.sortProduct.addEventListener('change', handleSortChange);
    elements.loadMoreBtn?.addEventListener('click', handleLoadMore);

    // Main Functions
    function initFilters() {
        elements.filterDaerah.value = state.daerah;
        elements.namaDaerah.textContent = state.daerah 
            ? state.daerah.charAt(0).toUpperCase() + state.daerah.slice(1) 
            : 'Semua';

        [...new Set(products.map(p => p.daerah))]
            .sort()
            .forEach(d => {
                const opt = document.createElement('option');
                opt.value = d;
                opt.textContent = d.charAt(0).toUpperCase() + d.slice(1);
                elements.filterDaerah.appendChild(opt);
            });
    }

    async function renderProducts(append = false) {
        if (!append) {
            showLoading();
            elements.productGrid.innerHTML = '';
        }
        hideNoProductsMessage();

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 400));

        const filtered = filterProducts();
        const sorted = sortProducts(filtered);
        const paginated = paginateProducts(sorted);

        hideLoading();

        if (filtered.length === 0) {
            showNoProductsMessage();
            return;
        }

        if (!append) {
            elements.productGrid.innerHTML = '';
        }

        displayProducts(paginated);
        updateLoadMoreButton(filtered.length);

        if (window.AOS) AOS.refresh();
    }

    function createProductCard(product, idx) {
        const isWishlisted = state.wishlist.includes(product.id);
        
        return `
        <div class="product-card group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border-2 border-gray-100 hover:border-primary/20"
             data-aos="fade-up" data-aos-delay="${idx * 50}">
            
            <!-- Image with badges -->
            <div class="relative overflow-hidden aspect-[4/3]">
                <img src="${product.image || getRandomProductImage()}" 
                     alt="${product.name}" 
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                
                <!-- Badges -->
                <div class="absolute top-3 left-3 flex flex-col gap-2">
                    ${createBadge(product)}
                    ${createDiscountBadge(product)}
                </div>
                
                <!-- Wishlist Button -->
                <button class="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm hover:bg-pink-100 transition-colors wishlist-btn ${isWishlisted ? 'text-pink-500' : 'text-gray-400'}"
                        data-product-id="${product.id}">
                    <i class="${isWishlisted ? 'fas' : 'far'} fa-heart transition-all"></i>
                </button>
                
                <!-- Quick View Overlay -->
                <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button class="quick-view-btn bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-md transition-all transform translate-y-2 group-hover:translate-y-0"
                            data-product-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            
            <!-- Product Info -->
            <div class="p-4">
                <h3 class="font-semibold text-lg text-gray-900 mb-1 line-clamp-2 hover:text-primary transition-colors cursor-pointer product-title">
                    ${product.name}
                </h3>
                
                <!-- Price -->
                <div class="flex items-center gap-2 mb-2">
                    <p class="text-xl font-bold text-primary">${formatPrice(product.price)}</p>
                    ${product.originalPrice ? `
                    <p class="text-sm text-gray-400 line-through">${formatPrice(product.originalPrice)}</p>
                    ` : ''}
                </div>
                
                <!-- Rating & Sold -->
                <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center">
                        <div class="flex mr-1 text-amber-400">
                            ${renderStars(product.rating || 0)}
                        </div>
                        <span class="text-xs text-gray-500 ml-1">${product.rating || 0}</span>
                    </div>
                
                </div>
                
                <!-- Action Buttons -->
                <div class="flex gap-2">
                    <button class="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white py-2 px-4 rounded-lg text-sm font-bold transition-all hover:shadow-lg transform hover:-translate-y-0.5 add-to-cart-btn"
                            data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart mr-2"></i> 
                    </button>
                    <button class="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors quick-view-btn"
                            data-product-id="${product.id}">
                        <i class="fas fa-expand"></i>
                    </button>
                </div>
            </div>
            
            <!-- Floating "New" ribbon -->
            ${product.sold < 50 ? `
            <div class="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full rotate-12 shadow-md">
                NEW!
            </div>
            ` : ''}
        </div>`;
    }

    // Helper Functions
    function getRandomProductImage() {
        const images = [
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
            'https://images.unsplash.com/photo-1445205170230-053b83016050',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136'
        ];
        return `${images[Math.floor(Math.random() * images.length)]}?w=400&h=300&fit=crop`;
    }

    function createBadge(product) {
        if (product.sold > 1000) {
            return `<span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">🔥 Terlaris</span>`;
        }
        if (product.rating >= 4.9) {
            return `<span class="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">⭐ Best</span>`;
        }
        return '';
    }

    function createDiscountBadge(product) {
        if (!product.originalPrice) return '';
        
        const discount = calculateDiscount(product.price, product.originalPrice);
        if (discount > 0) {
            return `<span class="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">${discount}% OFF</span>`;
        }
        return '';
    }

    function calculateDiscount(price, originalPrice) {
        const priceNum = parseInt((price || '0').replace(/\D/g, ''));
        const originalNum = parseInt((originalPrice || '0').replace(/\D/g, ''));
        return originalNum > 0 ? Math.round((1 - priceNum/originalNum) * 100) : 0;
    }

    function formatPrice(price) {
        if (!price) return 'Rp 0';
        return price.includes('Rp') ? price : `Rp ${price}`;
    }

    function renderStars(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        return [
            ...Array(full).fill('<i class="fas fa-star"></i>'),
            ...(half ? ['<i class="fas fa-star-half-alt"></i>'] : []),
            ...Array(5 - full - (half ? 1 : 0)).fill('<i class="far fa-star"></i>')
        ].join('');
    }

    // Modal Functions
    function showQuickViewModal(product) {
        // Remove existing modal if any
        if (currentModal) {
            closeModal();
        }

        currentModal = document.createElement('div');
        currentModal.className = 'fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeIn';
        currentModal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
                <div class="relative p-6">
                    <button class="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors close-modal-btn"
                            aria-label="Close modal">
                        <i class="fas fa-times text-gray-600 text-lg"></i>
                    </button>
                    
                    <div class="grid md:grid-cols-2 gap-8">
                        <div class="bg-gray-50 rounded-xl p-4">
                            <div class="swiper product-images-swiper h-64 md:h-80">
                                <div class="swiper-wrapper">
                                    ${[product.image || getRandomProductImage(), ...(product.additionalImages || [])]
                                        .map(img => `
                                        <div class="swiper-slide">
                                            <img src="${img}" alt="${product.name}" 
                                                class="w-full h-full object-contain">
                                        </div>
                                        `).join('')}
                                </div>
                                <div class="swiper-pagination"></div>
                            </div>
                        </div>
                        
                        <div class="py-2">
                            <h2 class="text-2xl font-bold text-gray-900 mb-2">${product.name}</h2>
                            
                            <div class="flex items-center gap-3 mb-4">
                                <p class="text-3xl font-bold text-primary">${formatPrice(product.price)}</p>
                                ${product.originalPrice ? `
                                <div>
                                    <p class="text-sm text-gray-400 line-through">${formatPrice(product.originalPrice)}</p>
                                    <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                        ${calculateDiscount(product.price, product.originalPrice)}% OFF
                                    </span>
                                </div>
                                ` : ''}
                            </div>
                            
                            <div class="flex items-center gap-4 mb-6">
                                <div class="flex items-center">
                                    <div class="flex text-amber-400 mr-1">
                                        ${renderStars(product.rating || 0)}
                                    </div>
                                    <span class="text-sm text-gray-600">${product.rating || 0}/5</span>
                                </div>
                                <span class="text-sm text-gray-500">${product.sold || 0} terjual</span>
                                <span class="text-sm text-gray-500">${product.stock || '100+'} stok tersedia</span>
                            </div>
                            
                            <div class="mb-6">
                                <h3 class="font-semibold text-lg mb-3 text-gray-800">Deskripsi Produk</h3>
                                <p class="text-gray-600 whitespace-pre-line">${product.description || 'Tidak ada deskripsi tersedia'}</p>
                            </div>
                            
                            ${product.variants ? `
                            <div class="mb-6">
                                <h3 class="font-semibold text-lg mb-3 text-gray-800">Varian:</h3>
                                <div class="flex flex-wrap gap-2">
                                    ${product.variants.map(v => `
                                    <button class="variant-btn px-3 py-1 border rounded-full text-sm hover:bg-primary hover:text-white transition-colors"
                                            data-sku="${v.sku}" data-price="${v.price}">
                                        ${v.name}
                                    </button>
                                    `).join('')}
                                </div>
                            </div>
                            ` : ''}
                            
                            <div class="mb-6">
                                <h3 class="font-semibold text-lg mb-3 text-gray-800">Jumlah:</h3>
                                <div class="flex items-center gap-3">
                                    <button class="quantity-btn w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full">
                                        <i class="fas fa-minus text-xs"></i>
                                    </button>
                                    <span class="quantity-display w-10 text-center font-medium">1</span>
                                    <button class="quantity-btn w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full">
                                        <i class="fas fa-plus text-xs"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="flex gap-3">
                                <button class="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white py-3 px-6 rounded-lg font-bold transition-all hover:shadow-lg add-to-cart-btn-modal"
                                        data-product-id="${product.id}">
                                    <i class="fas fa-shopping-cart mr-2"></i> Tambah ke Keranjang
                                </button>
                                <button class="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors wishlist-btn-modal"
                                        data-product-id="${product.id}">
                                    <i class="${state.wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart ${state.wishlist.includes(product.id) ? 'text-pink-500' : 'text-gray-600'}"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(currentModal);
        
        // Initialize Swiper if available
        if (window.Swiper) {
            new Swiper('.product-images-swiper', {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            });
        }

        // Initialize modal event listeners
        initModalEvents();
    }

    function initModalEvents() {
        if (!currentModal) return;

        // Close button
        const closeBtn = currentModal.querySelector('.close-modal-btn');
        closeBtn.addEventListener('click', closeModal);

        // Close when clicking outside
        currentModal.addEventListener('click', (e) => {
            if (e.target === currentModal) {
                closeModal();
            }
        });

        // Close with Escape key
        escapeListener = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
        document.addEventListener('keydown', escapeListener);

        // Add to Cart from Modal
        currentModal.querySelector('.add-to-cart-btn-modal')?.addEventListener('click', () => {
            const productId = currentModal.querySelector('.add-to-cart-btn-modal').getAttribute('data-product-id');
            const quantity = parseInt(currentModal.querySelector('.quantity-display').textContent) || 1;
            const variant = currentModal.querySelector('.variant-btn.active')?.getAttribute('data-sku');
            
            const product = products.find(p => p.id === productId);
            if (product) {
                addToCart({
                    ...product,
                    qty: quantity,
                    variant,
                    selectedPrice: variant ? currentModal.querySelector('.variant-btn.active').getAttribute('data-price') : product.price
                });
                
                showSuccessAlert('Produk berhasil ditambahkan ke keranjang!');
                closeModal();
            }
        });

        // Wishlist from Modal
        currentModal.querySelector('.wishlist-btn-modal')?.addEventListener('click', () => {
            const productId = currentModal.querySelector('.wishlist-btn-modal').getAttribute('data-product-id');
            toggleWishlist(productId, currentModal.querySelector('.wishlist-btn-modal i'));
        });

        // Quantity Controls
        currentModal.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const display = currentModal.querySelector('.quantity-display');
                let quantity = parseInt(display.textContent) || 1;
                
                if (btn.querySelector('.fa-minus')) {
                    if (quantity > 1) {
                        quantity--;
                    }
                } else {
                    quantity++;
                }
                
                display.textContent = quantity;
            });
        });

        // Variant Selection
        currentModal.querySelectorAll('.variant-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentModal.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
                btn.classList.add('active', 'bg-primary', 'text-white');
                
                // Update displayed price
                const newPrice = btn.getAttribute('data-price');
                currentModal.querySelector('.text-primary').textContent = formatPrice(newPrice);
            });
        });
    }

    function closeModal() {
        if (currentModal) {
            currentModal.classList.add('animate-fadeOut');
            const innerDiv = currentModal.firstElementChild;
            if (innerDiv) innerDiv.classList.add('animate-scaleOut');
            // Hapus event listener Escape
            if (escapeListener) {
                document.removeEventListener('keydown', escapeListener);
                escapeListener = null;
            }
            setTimeout(() => {
                currentModal.remove();
                currentModal = null;
            }, 300);
        }
    }

    function showSuccessAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center animate-slideInRight';
        alert.innerHTML = `
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.replace('animate-slideInRight', 'animate-slideOutRight');
            setTimeout(() => alert.remove(), 300);
        }, 3000);
    }

    // Event Handlers
    function handleFilterChange(e) {
        state.daerah = e.target.value;
        state.page = 1;
        elements.namaDaerah.textContent = state.daerah 
            ? state.daerah.charAt(0).toUpperCase() + state.daerah.slice(1) 
            : 'Semua';
        renderProducts();
    }

    function handleSearch(e) {
        state.search = e.target.value;
        state.page = 1;
        renderProducts();
    }

    function handleSortChange(e) {
        state.sort = e.target.value;
        state.page = 1;
        renderProducts();
    }

    function handleLoadMore() {
        state.page++;
        renderProducts(true);
    }

    // Utility Functions
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    function showLoading() {
        elements.loadingSkeleton?.classList.remove('hidden');
        elements.noProductMessage?.classList.add('hidden');
    }

    function hideLoading() {
        elements.loadingSkeleton?.classList.add('hidden');
    }

    function showNoProductsMessage() {
        elements.noProductMessage?.classList.remove('hidden');
    }

    function hideNoProductsMessage() {
        elements.noProductMessage?.classList.add('hidden');
    }

    function filterProducts() {
        let filtered = [...products];
        
        if (state.daerah) {
            filtered = filtered.filter(p => p.daerah === state.daerah);
        }
        
        if (state.search) {
            const searchLower = state.search.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchLower) || 
                (p.description && p.description.toLowerCase().includes(searchLower)) ||
                (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchLower)))
            );
        }
        
        return filtered;
    }

    function sortProducts(products) {
        switch(state.sort) {
            case 'popular': return [...products].sort((a, b) => b.sold - a.sold);
            case 'newest': return [...products].reverse();
            case 'price-asc': return [...products].sort((a, b) => getPriceNumber(a.price) - getPriceNumber(b.price));
            case 'price-desc': return [...products].sort((a, b) => getPriceNumber(b.price) - getPriceNumber(a.price));
            default: return products;
        }
    }

    function getPriceNumber(priceStr) {
        return parseInt((priceStr || '0').replace(/\D/g, ''));
    }

    function paginateProducts(products) {
        const end = state.page * state.perPage;
        return products.slice(0, end);
    }

    function displayProducts(products) {
        elements.productGrid.innerHTML += products.map((p, i) => createProductCard(p, i)).join('');
        initProductCardEvents();
    }

    function updateLoadMoreButton(totalProducts) {
        if (elements.loadMoreBtn) {
            const end = state.page * state.perPage;
            elements.loadMoreBtn.style.display = end >= totalProducts ? 'none' : 'flex';
        }
    }

    function initProductCardEvents() {
        // Wishlist Buttons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = btn.getAttribute('data-product-id');
                toggleWishlist(productId, btn.querySelector('i'));
            });
        });
        
        // Quick View Buttons
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = btn.getAttribute('data-product-id');
                const product = products.find(p => p.id === productId);
                if (product) showQuickViewModal(product);
            });
        });
        
        // Add to Cart Buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = btn.getAttribute('data-product-id');
                const product = products.find(p => p.id === productId);
                if (product) {
                    addToCart({ ...product, qty: 1 });
                    if (window.updateCartBadge) window.updateCartBadge();
                    if (window.renderCartModal) window.renderCartModal();
                    showSuccessAlert('Produk berhasil ditambahkan ke keranjang!');
                    // Button animation
                    btn.innerHTML = '<i class="fas fa-check mr-2"></i> Ditambahkan';
                    btn.classList.add('bg-green-500', 'hover:bg-green-600');
                    btn.classList.remove('bg-gradient-to-r', 'from-primary', 'to-secondary', 'hover:from-primary-dark', 'hover:to-secondary-dark');
                    setTimeout(() => {
                        btn.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i> Beli';
                        btn.classList.remove('bg-green-500', 'hover:bg-green-600');
                        btn.classList.add('bg-gradient-to-r', 'from-primary', 'to-secondary', 'hover:from-primary-dark', 'hover:to-secondary-dark');
                    }, 2000);
                }
            });
        });
    }

    function toggleWishlist(productId, iconElement) {
        const index = state.wishlist.indexOf(productId);
        
        if (index === -1) {
            // Add to wishlist
            state.wishlist.push(productId);
            iconElement.classList.replace('far', 'fas');
            iconElement.classList.add('text-pink-500');
            showSuccessAlert('Ditambahkan ke wishlist!');
        } else {
            // Remove from wishlist
            state.wishlist.splice(index, 1);
            iconElement.classList.replace('fas', 'far');
            iconElement.classList.remove('text-pink-500');
            showSuccessAlert('Dihapus dari wishlist!');
        }
        
        // Save to localStorage
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    }

    // This function should be implemented separately
    function addToCart(product) {
        if (window.addToCart) {
            window.addToCart(product);
        }
    }
});
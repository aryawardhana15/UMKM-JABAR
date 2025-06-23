document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const daerahId = urlParams.get('daerah');

    const namaDaerahEl = document.getElementById('nama-daerah');
    const productGridEl = document.getElementById('product-grid');
    const noProductMessageEl = document.getElementById('no-product-message');
    const loadingSkeletonEl = document.getElementById('loading-skeleton');
    const filterDaerahEl = document.getElementById('filter-daerah');
    const searchProductEl = document.getElementById('search-product');
    const sortProductEl = document.getElementById('sort-product');

    // --- Populate filter daerah ---
    const daerahList = [...new Set(products.map(p => p.daerah))];
    daerahList.sort();
    daerahList.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = d.charAt(0).toUpperCase() + d.slice(1);
        filterDaerahEl.appendChild(opt);
    });

    // --- State ---
    let state = {
        daerah: daerahId || '',
        search: '',
        sort: 'popular',
    };

    // --- UI Binding ---
    if (daerahId) {
        filterDaerahEl.value = daerahId;
        namaDaerahEl.textContent = daerahId.charAt(0).toUpperCase() + daerahId.slice(1);
    } else {
        namaDaerahEl.textContent = 'Semua';
    }

    filterDaerahEl.addEventListener('change', e => {
        state.daerah = e.target.value;
        namaDaerahEl.textContent = state.daerah ? (state.daerah.charAt(0).toUpperCase() + state.daerah.slice(1)) : 'Semua';
        renderProducts();
    });
    searchProductEl.addEventListener('input', e => {
        state.search = e.target.value;
        renderProducts();
    });
    sortProductEl.addEventListener('change', e => {
        state.sort = e.target.value;
        renderProducts();
    });

    // --- Render Produk ---
    function renderProducts() {
        loadingSkeletonEl.style.display = 'grid';
        productGridEl.innerHTML = '';
        noProductMessageEl.style.display = 'none';
        setTimeout(() => {
            let filtered = products.slice();
            if (state.daerah) filtered = filtered.filter(p => p.daerah === state.daerah);
            if (state.search) filtered = filtered.filter(p => p.name.toLowerCase().includes(state.search.toLowerCase()) || p.description.toLowerCase().includes(state.search.toLowerCase()));
            // Sorting
            if (state.sort === 'popular') filtered.sort((a,b) => b.sold - a.sold);
            if (state.sort === 'newest') filtered = filtered.reverse();
            if (state.sort === 'price-asc') filtered.sort((a,b) => parseInt(a.price.replace(/\D/g,'')) - parseInt(b.price.replace(/\D/g,'')));
            if (state.sort === 'price-desc') filtered.sort((a,b) => parseInt(b.price.replace(/\D/g,'')) - parseInt(a.price.replace(/\D/g,'')));
            loadingSkeletonEl.style.display = 'none';
            if (filtered.length === 0) {
                noProductMessageEl.style.display = 'block';
                return;
            }
            filtered.forEach((product, idx) => {
                productGridEl.innerHTML += productCard(product, idx);
            });
            if (window.AOS) AOS.refresh();
        }, 400); // Simulasi loading
    }

    // --- Kartu Produk ---
    function productCard(product, idx) {
        let badge = '';
        if (product.sold > 1000) badge = '<span class="badge badge-popular produk-badge">Terlaris</span>';
        else if (product.rating >= 4.9) badge = '<span class="badge badge-best produk-badge">Best Seller</span>';
        else if (product.sold < 200) badge = '<span class="badge badge-new produk-badge">Baru</span>';
        // Dua produk terdepan diberi class featured
        const featuredClass = (idx === 0 || idx === 1) ? 'produk-card-featured' : '';
        const badgePos = (product.sold % 2 === 0) ? 'left-4' : 'right-4';
        const imgSrc = product.image ? product.image : 'assets/img/default-product.jpg';
        return `
        <div class="produk-card group relative ${featuredClass}" data-aos="fade-up">
            <div class="relative">
                <img src="${imgSrc}" alt="${product.name}" class="produk-img group-hover:scale-105 transition-transform duration-500" loading="lazy">
                <div class="absolute top-4 ${badgePos}">${badge}</div>
                <div class="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-all duration-300 rounded-2xl flex flex-col justify-end p-4 pointer-events-none">
                    <div class="text-white text-lg font-bold drop-shadow-lg mb-2">${product.name}</div>
                    <div class="text-white text-base font-semibold mb-1">${product.price}</div>
                </div>
            </div>
            <div class="produk-info">
                <div class="produk-title">${product.name}</div>
                <div class="produk-price">${product.price}</div>
                <div class="produk-rating">${renderStars(product.rating)}<span class="text-gray-500 text-xs ml-1">(${product.rating})</span><span class="text-gray-400 text-xs ml-2">${product.sold} terjual</span></div>
                <div class="produk-desc">${product.description}</div>
                <div class="produk-action">
                    <button class="beli-btn bg-gradient-to-r from-primary to-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 transform w-full" data-id="${product.id}">Beli Sekarang</button>
                </div>
            </div>
        </div>`;
    }
    function renderStars(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        let html = '';
        for (let i=0;i<full;i++) html += '<span class="star">★</span>';
        if (half) html += '<span class="star">☆</span>';
        for (let i=full+(half?1:0);i<5;i++) html += '<span class="text-gray-300">★</span>';
        return html;
    }

    // --- Init ---
    renderProducts();

    // Delegasi event untuk tombol Beli Sekarang
    productGridEl.addEventListener('click', function(e) {
        if (e.target.classList.contains('beli-btn')) {
            const id = e.target.getAttribute('data-id');
            const product = products.find(p => p.id === id);
            if (product && typeof addToCart === 'function') {
                addToCart(product);
            }
        }
    });
}); 
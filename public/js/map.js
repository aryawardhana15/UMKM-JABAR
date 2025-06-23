// Enhanced Map JavaScript untuk JabarUMKM Hub

const jabarRegions = {
    'bandung': { name: 'Bandung', description: 'Kota Kembang dengan berbagai produk UMKM berkualitas.', icon: '🌸' },
    'garut': { name: 'Garut', description: 'Kota Dodol dengan produk tradisional yang lezat.', icon: '🍪' },
    'cirebon': { name: 'Cirebon', description: 'Kota Udang dengan kuliner dan kerajinan khas.', icon: '🍤' },
    'tasikmalaya': { name: 'Tasikmalaya', description: 'Kota Santri dengan kerajinan bambu berkualitas.', icon: '🎋' },
    'sukabumi': { name: 'Sukabumi', description: 'Kota Santri dengan produk alam yang melimpah.', icon: '🍃' },
    'cimahi': { name: 'Cimahi', description: 'Kota dengan berbagai produk kreatif.', icon: '🎨' },
    'banjar': { name: 'Banjar', description: 'Kota dengan produk tradisional yang unik.', icon: '🏺' },
    'bekasi': { name: 'Bekasi', description: 'Kota dengan produk modern dan tradisional.', icon: '🏭' },
    'bogor': { name: 'Bogor', description: 'Kota Hujan dengan produk pertanian berkualitas.', icon: '🌧️' },
    'cikarang': { name: 'Cikarang', description: 'Kota industri dengan produk kreatif.', icon: '⚙️' },
    'depok': { name: 'Depok', description: 'Kota dengan produk kuliner yang beragam.', icon: '🍽️' },
    'karawang': { name: 'Karawang', description: 'Kota dengan produk pertanian dan kerajinan.', icon: '🌾' },
    'purwakarta': { name: 'Purwakarta', description: 'Kota dengan produk kerajinan tangan berkualitas.', icon: '🎋' },
    'subang': { name: 'Subang', description: 'Kota dengan produk pertanian dan kerajinan.', icon: '🍍' },
    'sumedang': { name: 'Sumedang', description: 'Kota dengan produk kuliner yang terkenal.', icon: '🧈' },
    'indramayu': { name: 'Indramayu', description: 'Kota dengan produk pertanian dan kerajinan.', icon: '🥭' },
    'majalengka': { name: 'Majalengka', description: 'Kota dengan produk kerajinan dan kuliner.', icon: '🎋' },
    'kuningan': { name: 'Kuningan', description: 'Kota dengan produk pertanian dan kerajinan.', icon: '🌾' },
    'ciamis': { name: 'Ciamis', description: 'Kota dengan produk kerajinan dan kuliner.', icon: '🎋' },
    'pangandaran': { name: 'Pangandaran', description: 'Kota pantai dengan produk laut dan kerajinan.', icon: '🐟' }
};

function initMap() {
    const mapContainer = document.getElementById('jabar-map');
    if (mapContainer) {
        loadSVGMap(mapContainer);
    }
}

async function loadSVGMap(container) {
    try {
        const response = await fetch('./assets/svg/jabar-map.svg');
        if (!response.ok) throw new Error(`Gagal memuat peta SVG: ${response.statusText}`);
        const svgContent = await response.text();
        container.innerHTML = svgContent;
        addMapEventListeners();
    } catch (error) {
        console.error('Error saat memuat peta SVG:', error);
    }
}

function addMapEventListeners() {
    const regions = document.querySelectorAll('#jabar-map [data-region-id]');
    regions.forEach(region => {
        const regionId = region.dataset.regionId;
        if (regionId && jabarRegions[regionId]) {
            region.addEventListener('click', () => openModal(regionId));
        }
    });

    const modal = document.getElementById('region-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    if (modal && closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal();
        });
    }
}

function openModal(regionId) {
    const data = jabarRegions[regionId];
    const modal = document.getElementById('region-modal');
    const content = document.getElementById('region-modal-content');

    document.getElementById('modal-region-icon').textContent = data.icon;
    document.getElementById('modal-region-name').textContent = data.name;
    document.getElementById('modal-region-description').textContent = data.description;
    const modalLink = document.getElementById('modal-region-link');
    modalLink.href = `produk.html?daerah=${regionId}`;
    modalLink.onclick = function(e) {
        e.preventDefault();
        window.location.href = `produk.html?daerah=${regionId}`;
    };
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
        content.style.opacity = '1';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('region-modal');
    const content = document.getElementById('region-modal-content');

    modal.style.opacity = '0';
    content.style.transform = 'scale(0.95)';
    content.style.opacity = '0';
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    initMap();
});

// Track Region Visit
function trackRegionVisit(regionId) {
    const userData = JSON.parse(localStorage.getItem('jabarumkm_user_data') || '{}');
    
    if (!userData.visitedRegions) {
        userData.visitedRegions = [];
    }
    
    if (!userData.visitedRegions.includes(regionId)) {
        userData.visitedRegions.push(regionId);
        localStorage.setItem('jabarumkm_user_data', JSON.stringify(userData));
        
        // Check for new badges
        if (window.JabarUMKM && window.JabarUMKM.checkForNewBadges) {
            window.JabarUMKM.checkForNewBadges(userData);
        }
    }
}

// Show Region Tooltip
function showRegionTooltip(regionElement) {
    const regionId = regionElement.id;
    const regionData = jabarRegions[regionId];
    
    if (!regionData) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute bg-gray-900 text-white text-sm rounded-lg px-3 py-2 z-10 pointer-events-none';
    tooltip.textContent = `${regionData.icon} ${regionData.name}`;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = regionElement.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    // Store tooltip reference
    regionElement._tooltip = tooltip;
}

// Hide Region Tooltip
function hideRegionTooltip() {
    const tooltips = document.querySelectorAll('.absolute.bg-gray-900');
    tooltips.forEach(tooltip => tooltip.remove());
}

// Load Visited Regions
function loadVisitedRegions() {
    const userData = JSON.parse(localStorage.getItem('jabarumkm_user_data') || '{}');
    const visitedRegions = userData.visitedRegions || [];
    
    // Reset all regions first
    document.querySelectorAll('.map-region').forEach(r => r.classList.remove('visited'));

    visitedRegions.forEach(regionId => {
        const regionElement = document.getElementById(regionId);
        if (regionElement) {
            regionElement.classList.add('visited');
        }
    });
}

// Export functions
typeof window !== 'undefined' && (window.MapFunctions = {
    initMap,
    trackRegionVisit,
    loadVisitedRegions
}); 
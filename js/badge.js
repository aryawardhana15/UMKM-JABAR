// Enhanced Badge System JavaScript untuk JabarUMKM Hub

// Badge Data dengan Enhanced Information
const BADGES = {
    'first_visit': {
        id: 'first_visit',
        name: 'First Visit',
        description: 'Kunjungan pertama Anda ke JabarUMKM Hub',
        icon: '🎉',
        category: 'special',
        condition: () => true, // Always unlocked
        progress: () => ({ current: 1, total: 1 }),
        unlockedDate: '2024-01-01'
    },
    'explorer': {
        id: 'explorer',
        name: 'Eksplorator',
        description: 'Mengunjungi 3 kabupaten/kota berbeda',
        icon: '🗺️',
        category: 'exploration',
        condition: (userData) => userData.visitedRegions.length >= 3,
        progress: (userData) => ({ 
            current: userData.visitedRegions.length, 
            total: 3 
        }),
        unlockedDate: '2024-01-05'
    },
    'handmade_lover': {
        id: 'handmade_lover',
        name: 'Handmade Lover',
        description: 'Melihat 5 produk handmade',
        icon: '🧵',
        category: 'product',
        condition: (userData) => userData.productInteractions.filter(p => p.category === 'handmade').length >= 5,
        progress: (userData) => ({ 
            current: userData.productInteractions.filter(p => p.category === 'handmade').length, 
            total: 5 
        })
    },
    'halal_hunter': {
        id: 'halal_hunter',
        name: 'Halal Hunter',
        description: 'Melihat 3 produk halal',
        icon: '✅',
        category: 'product',
        condition: (userData) => userData.productInteractions.filter(p => p.isHalal === true).length >= 3,
        progress: (userData) => ({ 
            current: userData.productInteractions.filter(p => p.isHalal === true).length, 
            total: 3 
        })
    },
    'culinary_explorer': {
        id: 'culinary_explorer',
        name: 'Culinary Explorer',
        description: 'Mencoba 10 produk kuliner',
        icon: '🍽️',
        category: 'product',
        condition: (userData) => userData.productInteractions.filter(p => p.category === 'kuliner').length >= 10,
        progress: (userData) => ({ 
            current: userData.productInteractions.filter(p => p.category === 'kuliner').length, 
            total: 10 
        })
    },
    'craft_master': {
        id: 'craft_master',
        name: 'Craft Master',
        description: 'Melihat 8 produk kerajinan',
        icon: '🎨',
        category: 'product',
        condition: (userData) => userData.productInteractions.filter(p => p.category === 'kerajinan').length >= 8,
        progress: (userData) => ({ 
            current: userData.productInteractions.filter(p => p.category === 'kerajinan').length, 
            total: 8 
        })
    },
    'regional_expert': {
        id: 'regional_expert',
        name: 'Regional Expert',
        description: 'Mengunjungi 10 kabupaten/kota',
        icon: '🏛️',
        category: 'exploration',
        condition: (userData) => userData.visitedRegions.length >= 10,
        progress: (userData) => ({ 
            current: userData.visitedRegions.length, 
            total: 10 
        })
    },
    'completionist': {
        id: 'completionist',
        name: 'Completionist',
        description: 'Membuka semua badge',
        icon: '👑',
        category: 'special',
        condition: (userData) => userData.unlockedBadges.length >= Object.keys(BADGES).length - 1,
        progress: (userData) => ({ 
            current: userData.unlockedBadges.length, 
            total: Object.keys(BADGES).length 
        })
    },
    'chatbot_friend': {
        id: 'chatbot_friend',
        name: 'Chatbot Friend',
        description: 'Menggunakan chatbot 5 kali',
        icon: '🤖',
        category: 'special',
        condition: (userData) => (userData.chatbotUses || 0) >= 5,
        progress: (userData) => ({ 
            current: userData.chatbotUses || 0, 
            total: 5 
        })
    },
    'map_explorer': {
        id: 'map_explorer',
        name: 'Map Explorer',
        description: 'Mengklik 5 daerah di peta',
        icon: '🗺️',
        category: 'exploration',
        condition: (userData) => (userData.mapClicks || 0) >= 5,
        progress: (userData) => ({ 
            current: userData.mapClicks || 0, 
            total: 5 
        })
    },
    'product_reviewer': {
        id: 'product_reviewer',
        name: 'Product Reviewer',
        description: 'Melihat detail 15 produk',
        icon: '📝',
        category: 'product',
        condition: (userData) => userData.productInteractions.length >= 15,
        progress: (userData) => ({ 
            current: userData.productInteractions.length, 
            total: 15 
        })
    },
    'daily_visitor': {
        id: 'daily_visitor',
        name: 'Daily Visitor',
        description: 'Mengunjungi website 7 hari berturut-turut',
        icon: '📅',
        category: 'special',
        condition: (userData) => {
            const visits = userData.dailyVisits || [];
            const today = new Date().toDateString();
            const last7Days = [];
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                last7Days.push(date.toDateString());
            }
            return last7Days.every(date => visits.includes(date));
        },
        progress: (userData) => {
            const visits = userData.dailyVisits || [];
            const today = new Date().toDateString();
            const last7Days = [];
            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                last7Days.push(date.toDateString());
            }
            const consecutiveDays = last7Days.filter(date => visits.includes(date)).length;
            return { current: consecutiveDays, total: 7 };
        }
    }
};

// Enhanced User Data Management
class BadgeManager {
    constructor() {
        this.initializeUserData();
        this.setupEventListeners();
        this.updateBadgeDisplay();
        this.updateStats();
    }

    initializeUserData() {
        if (!localStorage.getItem('jabarumkm_user_data')) {
            const initialData = {
                visitedRegions: [],
                productInteractions: [],
                unlockedBadges: ['first_visit'],
                totalVisits: 1,
                chatbotUses: 0,
                mapClicks: 0,
                dailyVisits: [new Date().toDateString()],
                lastVisit: new Date().toISOString(),
                achievements: []
            };
            localStorage.setItem('jabarumkm_user_data', JSON.stringify(initialData));
        }
        
        // Track daily visit
        this.trackDailyVisit();
    }

    trackDailyVisit() {
        const userData = this.getUserData();
        const today = new Date().toDateString();
        
        if (!userData.dailyVisits) {
            userData.dailyVisits = [];
        }
        
        if (!userData.dailyVisits.includes(today)) {
            userData.dailyVisits.push(today);
        }
        
        userData.totalVisits++;
        userData.lastVisit = new Date().toISOString();
        
        this.saveUserData(userData);
    }

    getUserData() {
        return JSON.parse(localStorage.getItem('jabarumkm_user_data'));
    }

    saveUserData(userData) {
        localStorage.setItem('jabarumkm_user_data', JSON.stringify(userData));
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilter(e.target);
            });
        });

        // Badge item clicks
        document.querySelectorAll('.badge-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.showBadgeDetails(e.currentTarget);
            });
        });

        // Close badge popup
        const closeBtn = document.getElementById('close-badge');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.hideBadgePopup();
            });
        }
    }

    handleFilter(button) {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active', 'bg-gradient-to-r', 'from-primary', 'to-accent', 'text-white');
            btn.classList.add('bg-gray-100', 'text-gray-700');
        });

        // Add active class to clicked button
        button.classList.remove('bg-gray-100', 'text-gray-700');
        button.classList.add('active', 'bg-gradient-to-r', 'from-primary', 'to-accent', 'text-white');

        const filter = button.getAttribute('data-filter');
        this.filterBadges(filter);
    }

    filterBadges(category) {
        const badges = document.querySelectorAll('.badge-item');
        
        badges.forEach(badge => {
            const badgeCategory = badge.getAttribute('data-category');
            
            if (category === 'all' || badgeCategory === category) {
                badge.style.display = 'block';
                badge.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                badge.style.display = 'none';
            }
        });
    }

    showBadgeDetails(badgeElement) {
        const badgeId = badgeElement.getAttribute('data-badge-id');
        const badge = BADGES[badgeId];
        const userData = this.getUserData();
        
        if (!badge) return;

        const isUnlocked = userData.unlockedBadges.includes(badgeId);
        const progress = badge.progress ? badge.progress(userData) : { current: 0, total: 1 };
        
        // Create enhanced badge detail modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm';
        modal.innerHTML = `
            <div class="bg-white rounded-3xl p-8 max-w-md mx-4 text-center transform scale-95 transition-all duration-500 shadow-2xl">
                <div class="text-8xl mb-6 ${isUnlocked ? 'animate-bounce' : 'filter grayscale'}">${badge.icon}</div>
                <h3 class="text-2xl font-bold text-primary mb-4">${badge.name}</h3>
                <p class="text-gray-600 mb-6 text-lg">${badge.description}</p>
                
                ${!isUnlocked ? `
                    <div class="mb-6">
                        <div class="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progress</span>
                            <span>${progress.current}/${progress.total}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-3">
                            <div class="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500" 
                                 style="width: ${(progress.current / progress.total) * 100}%"></div>
                        </div>
                    </div>
                ` : `
                    <div class="mb-6">
                        <div class="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                            ✅ Badge Terbuka
                        </div>
                    </div>
                `}
                
                <button class="close-modal bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 transform">
                    ${isUnlocked ? 'Keren! 🎉' : 'Mengerti'}
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Add entrance animation
        setTimeout(() => {
            modal.querySelector('.bg-white').classList.remove('scale-95');
        }, 100);

        // Close modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                modal.remove();
            }
        });
    }

    updateBadgeDisplay() {
        const userData = this.getUserData();
        
        Object.keys(BADGES).forEach(badgeId => {
            const badge = BADGES[badgeId];
            const badgeElement = document.querySelector(`[data-badge-id="${badgeId}"]`);
            
            if (!badgeElement) return;
            
            const isUnlocked = userData.unlockedBadges.includes(badgeId);
            const progress = badge.progress ? badge.progress(userData) : { current: 0, total: 1 };
            
            // Update badge appearance
            if (isUnlocked) {
                badgeElement.classList.remove('locked', 'opacity-60');
                badgeElement.classList.add('unlocked');
                
                const statusBadge = badgeElement.querySelector('.absolute.top-4.right-4');
                if (statusBadge) {
                    statusBadge.className = 'absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold';
                    statusBadge.textContent = '✅ Terbuka';
                }
                
                const icon = badgeElement.querySelector('.text-8xl');
                if (icon) {
                    icon.classList.remove('filter', 'grayscale');
                }
            } else {
                badgeElement.classList.add('locked', 'opacity-60');
                badgeElement.classList.remove('unlocked');
                
                const statusBadge = badgeElement.querySelector('.absolute.top-4.right-4');
                if (statusBadge) {
                    statusBadge.className = 'absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold';
                    statusBadge.textContent = '🔒 Terkunci';
                }
                
                const icon = badgeElement.querySelector('.text-8xl');
                if (icon) {
                    icon.classList.add('filter', 'grayscale');
                }
                
                // Update progress bar
                const progressBar = badgeElement.querySelector('.bg-accent.h-2');
                if (progressBar) {
                    const percentage = (progress.current / progress.total) * 100;
                    progressBar.style.width = `${percentage}%`;
                }
                
                // Update progress text
                const progressText = badgeElement.querySelector('.text-xs.text-gray-500');
                if (progressText) {
                    progressText.textContent = `Progress: ${progress.current}/${progress.total}`;
                }
            }
        });
    }

    updateStats() {
        const userData = this.getUserData();
        const totalBadges = Object.keys(BADGES).length;
        const unlockedBadges = userData.unlockedBadges.length;
        const progressPercentage = Math.round((unlockedBadges / totalBadges) * 100);
        
        // Animate stats counters
        this.animateCounter('total-badges', totalBadges);
        this.animateCounter('unlocked-badges', unlockedBadges);
        this.animateCounter('progress-percentage', progressPercentage, '%');
    }

    animateCounter(elementId, target, suffix = '') {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            const current = Math.min(start + increment, target);
            element.textContent = Math.floor(current) + suffix;
            
            if (current < target) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        updateCounter();
    }

    // Enhanced badge unlocking with animations
    unlockBadge(badgeId) {
        const userData = this.getUserData();
        const badge = BADGES[badgeId];
        
        if (!badge || userData.unlockedBadges.includes(badgeId)) return;
        
        userData.unlockedBadges.push(badgeId);
        userData.achievements.push({
            badgeId: badgeId,
            unlockedAt: new Date().toISOString(),
            name: badge.name
        });
        
        this.saveUserData(userData);
        
        // Show enhanced unlock animation
        this.showUnlockAnimation(badge);
        
        // Update display
        this.updateBadgeDisplay();
        this.updateStats();
    }

    showUnlockAnimation(badge) {
        // Create enhanced unlock popup
        const popup = document.createElement('div');
        popup.className = 'fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm';
        popup.innerHTML = `
            <div class="bg-white rounded-3xl p-8 max-w-sm mx-4 text-center transform scale-95 transition-all duration-500 shadow-2xl">
                <div class="text-8xl mb-6 animate-bounce">${badge.icon}</div>
                <h3 class="text-2xl font-bold text-primary mb-4">Badge Baru!</h3>
                <p class="text-gray-600 mb-6 text-lg">${badge.description}</p>
                <button class="close-unlock bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 transform">
                    Keren! 🎉
                </button>
            </div>
        `;

        document.body.appendChild(popup);
        
        // Add entrance animation
        setTimeout(() => {
            popup.querySelector('.bg-white').classList.remove('scale-95');
        }, 100);

        // Create enhanced confetti
        this.createEnhancedConfetti();

        // Close popup
        popup.addEventListener('click', (e) => {
            if (e.target === popup || e.target.classList.contains('close-unlock')) {
                popup.remove();
            }
        });
    }

    createEnhancedConfetti() {
        const colors = ['#F9C74F', '#A05A2C', '#6B8E23', '#FF6B6B', '#4ECDC4', '#9B59B6'];
        const shapes = ['circle', 'square', 'triangle', 'star'];
        
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                if (shape === 'circle') {
                    confetti.style.borderRadius = '50%';
                } else if (shape === 'triangle') {
                    confetti.style.width = '0';
                    confetti.style.height = '0';
                    confetti.style.borderLeft = '8px solid transparent';
                    confetti.style.borderRight = '8px solid transparent';
                    confetti.style.borderBottom = '16px solid ' + confetti.style.backgroundColor;
                    confetti.style.backgroundColor = 'transparent';
                } else if (shape === 'star') {
                    confetti.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
                }
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 4000);
            }, i * 30);
        }
    }

    // Track various interactions
    trackProductInteraction(region, category, isHalal) {
        const userData = this.getUserData();
        
        if (!userData.visitedRegions.includes(region)) {
            userData.visitedRegions.push(region);
        }
        
        userData.productInteractions.push({
            region: region,
            category: category,
            isHalal: isHalal,
            timestamp: new Date().toISOString()
        });
        
        this.saveUserData(userData);
        this.checkForNewBadges();
    }

    trackChatbotUse() {
        const userData = this.getUserData();
        userData.chatbotUses = (userData.chatbotUses || 0) + 1;
        this.saveUserData(userData);
        this.checkForNewBadges();
    }

    trackMapClick() {
        const userData = this.getUserData();
        userData.mapClicks = (userData.mapClicks || 0) + 1;
        this.saveUserData(userData);
        this.checkForNewBadges();
    }

    checkForNewBadges() {
        const userData = this.getUserData();
        
        Object.keys(BADGES).forEach(badgeId => {
            const badge = BADGES[badgeId];
            if (badge.condition(userData) && !userData.unlockedBadges.includes(badgeId)) {
                this.unlockBadge(badgeId);
            }
        });
    }

    hideBadgePopup() {
        const popup = document.getElementById('badge-popup');
        if (popup) {
            popup.classList.add('hidden');
            popup.querySelector('.bg-white').classList.remove('badge-popup-enter');
        }
    }
}

// Initialize Badge Manager
document.addEventListener('DOMContentLoaded', function() {
    window.badgeManager = new BadgeManager();
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true
        });
    }
});

// Export for use in other modules
window.BadgeSystem = {
    BADGES,
    BadgeManager
}; 
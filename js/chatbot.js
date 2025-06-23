// Enhanced Chatbot JavaScript untuk JabarUMKM Hub

class EnhancedChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.currentContext = null;
        this.userName = this.getUserName();
        this.setupEventListeners();
        this.initializeChat();
    }

    getUserName() {
        const userData = JSON.parse(localStorage.getItem('jabarumkm_user_data') || '{}');
        return userData.userName || 'Pengunjung';
    }

    setupEventListeners() {
        const chatbotBtn = document.getElementById('chatbot-btn');
        const chatbotModal = document.getElementById('chatbot-modal');
        const closeChatbot = document.getElementById('close-chatbot');
        const sendChat = document.getElementById('send-chat');
        const chatInput = document.getElementById('chat-input');

        if (chatbotBtn) {
            chatbotBtn.addEventListener('click', () => this.toggleChat());
        }

        if (closeChatbot) {
            closeChatbot.addEventListener('click', () => this.closeChat());
        }

        if (sendChat) {
            sendChat.addEventListener('click', () => this.sendMessage());
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });

            chatInput.addEventListener('focus', () => {
                chatInput.parentElement.classList.add('ring-1', 'ring-primary/20');
            });

            chatInput.addEventListener('blur', () => {
                chatInput.parentElement.classList.remove('ring-1', 'ring-primary/20');
            });
        }

        // Prevent modal from closing when clicking inside
        const chatbotContent = document.getElementById('chatbot-content');
        if (chatbotContent) {
            chatbotContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    initializeChat() {
        this.addBotMessage(`Halo ${this.userName}! 👋 Saya siap membantu Anda menemukan produk UMKM Jawa Barat yang berkualitas! 

Apa yang ingin Anda ketahui? Saya bisa membantu dengan:
• 🛍️ Mencari produk berdasarkan kategori
• 🗺️ Informasi daerah dan budaya
• 🏆 Sistem badge dan pencapaian
• 📚 Tips dan informasi UMKM

Silakan tanyakan apa saja! 😊`);
    }

    toggleChat() {
        if (!this.isOpen) {
            this.openChat();
        } else {
            this.closeChat();
        }
    }

    openChat() {
        const chatbotModal = document.getElementById('chatbot-modal');
        if (chatbotModal) {
            chatbotModal.classList.remove('hidden');
            chatbotModal.classList.add('show');
            this.isOpen = true;
            
            // Focus on input
            const chatInput = document.getElementById('chat-input');
            if (chatInput) {
                setTimeout(() => chatInput.focus(), 300);
            }
        }
    }

    closeChat() {
        const chatbotModal = document.getElementById('chatbot-modal');
        if (chatbotModal) {
            chatbotModal.classList.remove('show');
            chatbotModal.classList.add('hidden');
            this.isOpen = false;
        }
    }

    sendMessage() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value.trim();

        if (message) {
            this.addUserMessage(message);
            chatInput.value = '';
            
            // Add typing indicator
            this.showTypingIndicator();
            
            // Process message with delay for realistic feel
            setTimeout(() => {
                this.hideTypingIndicator();
                this.processMessage(message);
            }, 1000 + Math.random() * 1000);
        }
    }

    addUserMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex justify-end mb-3';
        messageDiv.innerHTML = `
            <div class="bg-gradient-to-r from-primary to-accent text-white rounded-xl py-2 px-3 max-w-[240px] shadow-sm">
                <p class="text-sm">${this.escapeHtml(message)}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        this.messages.push({ type: 'user', content: message, timestamp: new Date() });
    }

    addBotMessage(message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex justify-start mb-3 chat-message-in';
        messageDiv.innerHTML = `
            <div class="bg-gray-100 rounded-xl py-2 px-3 max-w-[240px] shadow-sm">
                <p class="text-sm">${this.formatMessage(message)}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        this.messages.push({ type: 'bot', content: message, timestamp: new Date() });
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'flex justify-start mb-4 typing-indicator';
        typingDiv.innerHTML = `
            <div class="bg-gray-100 rounded-2xl p-4 shadow-lg">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Enhanced keyword matching with context awareness
        if (this.currentContext === 'product_search') {
            this.handleProductSearch(message);
            return;
        }
        
        if (this.currentContext === 'region_info') {
            this.handleRegionInfo(message);
            return;
        }

        // Main conversation flow
        if (lowerMessage.includes('produk') || lowerMessage.includes('barang') || lowerMessage.includes('makanan')) {
            this.handleProductQuery(lowerMessage);
        } else if (lowerMessage.includes('daerah') || lowerMessage.includes('kota') || lowerMessage.includes('kabupaten')) {
            this.handleRegionQuery(lowerMessage);
        } else if (lowerMessage.includes('badge') || lowerMessage.includes('pencapaian') || lowerMessage.includes('achievement')) {
            this.handleBadgeQuery(lowerMessage);
        } else if (lowerMessage.includes('halal') || lowerMessage.includes('islam')) {
            this.handleHalalQuery(lowerMessage);
        } else if (lowerMessage.includes('harga') || lowerMessage.includes('murah') || lowerMessage.includes('mahal')) {
            this.handlePriceQuery(lowerMessage);
        } else if (lowerMessage.includes('kerajinan') || lowerMessage.includes('handmade') || lowerMessage.includes('batik')) {
            this.handleCraftQuery(lowerMessage);
        } else if (lowerMessage.includes('kuliner') || lowerMessage.includes('makanan') || lowerMessage.includes('minuman')) {
            this.handleCulinaryQuery(lowerMessage);
        } else if (lowerMessage.includes('bantuan') || lowerMessage.includes('help') || lowerMessage.includes('tolong')) {
            this.showHelp();
        } else if (lowerMessage.includes('terima kasih') || lowerMessage.includes('thanks')) {
            this.addBotMessage(`Sama-sama ${this.userName}! 😊 Senang bisa membantu Anda menjelajahi kekayaan UMKM Jawa Barat. Ada yang ingin ditanyakan lagi?`);
        } else {
            this.handleGeneralQuery(lowerMessage);
        }
    }

    handleProductQuery(message) {
        const responses = [
            `🛍️ Produk UMKM Jawa Barat sangat beragam! Ada kategori:
• 🍽️ Kuliner (makanan & minuman)
• 🧵 Kerajinan tangan
• 🎨 Batik & tekstil
• 🌿 Produk herbal
• 🏺 Keramik & tembikar

Kategori mana yang ingin Anda lihat? 😊`,
            `Produk favorit pengunjung kami:
• 🍪 Dodol Garut - Manis legit khas
• 🧵 Batik Bandung - Elegan & modern
• 🍤 Emping Melinjo - Renyah & sehat
• 🎋 Kerajinan Bambu - Ramah lingkungan

Mau lihat produk dari daerah mana? 🗺️`
        ];
        
        this.addBotMessage(responses[Math.floor(Math.random() * responses.length)]);
        this.currentContext = 'product_search';
    }

    handleRegionQuery(message) {
        const regions = {
            'bandung': 'Bandung terkenal dengan batik modern, kuliner Sunda, dan kerajinan tangan. Produk unggulan: Batik Bandung, Dodol Garut, dan kerajinan bambu.',
            'garut': 'Garut dikenal dengan dodol tradisional, emping melinjo, dan kerajinan tangan. Produk unggulan: Dodol Garut, Emping Melinjo, dan batik Garut.',
            'cirebon': 'Cirebon kaya akan kuliner tradisional dan kerajinan. Produk unggulan: Emping Melinjo, Batik Cirebon, dan kerajinan tembikar.',
            'tasikmalaya': 'Tasikmalaya terkenal dengan kerajinan bambu dan batik. Produk unggulan: Kerajinan Bambu, Batik Tasikmalaya, dan produk herbal.'
        };

        let foundRegion = false;
        for (const [region, info] of Object.entries(regions)) {
            if (message.includes(region)) {
                this.addBotMessage(`🗺️ **${region.charAt(0).toUpperCase() + region.slice(1)}**\n\n${info}\n\nMau lihat produk dari daerah lain? 😊`);
                foundRegion = true;
                break;
            }
        }

        if (!foundRegion) {
            this.addBotMessage(`🗺️ Jawa Barat memiliki 19 kabupaten/kota dengan kekayaan budaya yang beragam! 

Daerah populer:
• Bandung - Kota kreatif & kuliner
• Garut - Dodol & kerajinan tradisional
• Cirebon - Batik & kuliner khas
• Tasikmalaya - Kerajinan bambu & herbal

Daerah mana yang ingin Anda ketahui? 🤔`);
        }
        
        this.currentContext = 'region_info';
    }

    handleBadgeQuery(message) {
        const userData = JSON.parse(localStorage.getItem('jabarumkm_user_data') || '{}');
        const unlockedCount = userData.unlockedBadges ? userData.unlockedBadges.length : 0;
        
        this.addBotMessage(`🏆 **Sistem Badge JabarUMKM Hub**

Anda telah membuka **${unlockedCount} badge**! 🎉

Badge yang tersedia:
• 🎉 First Visit - Kunjungan pertama
• 🗺️ Eksplorator - Kunjungi 3 daerah
• 🧵 Handmade Lover - Lihat 5 produk handmade
• ✅ Halal Hunter - Lihat 3 produk halal
• 🍽️ Culinary Explorer - Coba 10 produk kuliner
• 🎨 Craft Master - Lihat 8 produk kerajinan
• 👑 Completionist - Buka semua badge

Mau lihat detail badge? Kunjungi halaman Badge! 📍`);
    }

    handleHalalQuery(message) {
        this.addBotMessage(`✅ **Produk Halal di JabarUMKM Hub**

Kami memastikan semua produk makanan dan minuman sudah bersertifikat halal! 

Produk halal populer:
• 🍪 Dodol Garut - Sertifikat halal MUI
• 🍤 Emping Melinjo - 100% halal
• 🍰 Kue tradisional - Diproduksi sesuai syariah
• 🥤 Minuman herbal - Bahan alami halal

Setiap produk halal ditandai dengan ✅ di halaman produk. Ada yang ingin ditanyakan tentang produk halal? 😊`);
    }

    handlePriceQuery(message) {
        this.addBotMessage(`💰 **Harga Produk UMKM Jawa Barat**

Harga produk bervariasi sesuai kualitas dan kompleksitas:
• 🍪 Makanan tradisional: Rp 15.000 - 50.000
• 🧵 Kerajinan tangan: Rp 50.000 - 500.000
• 🎨 Batik premium: Rp 150.000 - 1.000.000
• 🌿 Produk herbal: Rp 25.000 - 100.000

Semua harga sudah termasuk ongkos kirim dan packing aman! 📦

Mau lihat produk dengan harga tertentu? 😊`);
    }

    handleCraftQuery(message) {
        this.addBotMessage(`🎨 **Kerajinan Tangan Jawa Barat**

Kerajinan tangan kami sangat beragam dan berkualitas tinggi:

• 🧵 **Batik** - Motif tradisional & modern
• 🎋 **Kerajinan Bambu** - Ramah lingkungan
• 🏺 **Keramik & Tembikar** - Seni tanah liat
• 🧶 **Tenun** - Kain tradisional
• 🎭 **Wayang** - Seni pertunjukan
• 💎 **Aksesoris** - Perhiasan handmade

Setiap kerajinan dibuat dengan teknik tradisional dan bahan berkualitas. Mau lihat kerajinan dari daerah mana? 😊`);
    }

    handleCulinaryQuery(message) {
        this.addBotMessage(`🍽️ **Kuliner Khas Jawa Barat**

Jawa Barat kaya akan kuliner tradisional yang lezat:

• 🍪 **Dodol Garut** - Manis legit khas
• 🍤 **Emping Melinjo** - Renyah & sehat
• 🍰 **Kue tradisional** - Berbagai jenis
• 🥤 **Minuman herbal** - Jamu & teh
• 🍖 **Makanan Sunda** - Nasi liwet, sate
• 🍡 **Jajanan pasar** - Kue basah & kering

Semua makanan dibuat dengan resep turun temurun dan bahan segar. Mau coba yang mana? 😋`);
    }

    handleGeneralQuery(message) {
        const responses = [
            `Hmm, saya belum paham pertanyaan Anda. 😅 Coba tanyakan tentang:
• 🛍️ Produk UMKM
• 🗺️ Informasi daerah
• 🏆 Sistem badge
• 🍽️ Kuliner khas
• 🎨 Kerajinan tangan

Atau ketik "bantuan" untuk melihat menu lengkap! 😊`,
            `Maaf, saya belum mengerti. 🤔 Mungkin Anda bisa tanyakan:
• Produk apa saja yang tersedia?
• Daerah mana yang populer?
• Bagaimana sistem badge bekerja?
• Ada produk halal tidak?

Ketik "bantuan" untuk panduan lengkap! 📚`,
            `Wah, pertanyaan menarik! 😄 Tapi saya lebih ahli di bidang:
• 🛍️ Produk UMKM Jawa Barat
• 🗺️ Informasi daerah & budaya
• 🏆 Badge & pencapaian
• 🍽️ Kuliner tradisional

Ada yang ingin ditanyakan tentang topik tersebut? 🤗`
        ];
        
        this.addBotMessage(responses[Math.floor(Math.random() * responses.length)]);
    }

    showHelp() {
        this.addBotMessage(`📚 **Panduan JabarUMKM Hub**

Saya siap membantu Anda! Berikut yang bisa saya bantu:

🛍️ **Produk & Kategori**
• "Tunjukkan produk kuliner"
• "Ada kerajinan apa saja?"
• "Produk halal mana saja?"

🗺️ **Informasi Daerah**
• "Ceritakan tentang Bandung"
• "Produk unggulan Garut"
• "Budaya Cirebon"

🏆 **Badge & Pencapaian**
• "Bagaimana sistem badge?"
• "Badge apa saja yang ada?"
• "Progress badge saya"

💰 **Harga & Pembelian**
• "Berapa harga produk?"
• "Ada diskon tidak?"
• "Cara membeli produk?"

🎯 **Tips & Rekomendasi**
• "Produk terpopuler"
• "Rekomendasi untuk hadiah"
• "Produk terbaru"

Ketik pertanyaan Anda dan saya akan membantu! 😊`);
    }

    handleProductSearch(message) {
        const categories = {
            'kuliner': '🍽️ Produk kuliner populer:\n• Dodol Garut - Rp 25.000\n• Emping Melinjo - Rp 15.000\n• Kue tradisional - Rp 20.000\n• Minuman herbal - Rp 30.000',
            'kerajinan': '🎨 Kerajinan tangan unik:\n• Batik Bandung - Rp 150.000\n• Kerajinan Bambu - Rp 50.000\n• Tenun tradisional - Rp 200.000\n• Aksesoris handmade - Rp 75.000',
            'batik': '🧵 Koleksi batik eksklusif:\n• Batik Bandung - Rp 150.000\n• Batik Garut - Rp 120.000\n• Batik Cirebon - Rp 180.000\n• Batik Tasikmalaya - Rp 100.000'
        };

        let foundCategory = false;
        for (const [category, info] of Object.entries(categories)) {
            if (message.includes(category)) {
                this.addBotMessage(`${info}\n\nMau lihat produk lain atau ada yang ingin ditanyakan? 😊`);
                foundCategory = true;
                break;
            }
        }

        if (!foundCategory) {
            this.addBotMessage(`Mau lihat produk kategori apa? 😊\n• 🍽️ Kuliner\n• 🎨 Kerajinan\n• 🧵 Batik\n• 🌿 Herbal`);
        }
        
        this.currentContext = null;
    }

    handleRegionInfo(message) {
        this.addBotMessage(`Mau tahu tentang daerah lain? 😊\n• Bandung - Kota kreatif\n• Garut - Dodol tradisional\n• Cirebon - Batik khas\n• Tasikmalaya - Kerajinan bambu\n\nAtau ada yang ingin ditanyakan? 🤔`);
        this.currentContext = null;
    }

    trackChatbotUse() {
        const userData = JSON.parse(localStorage.getItem('jabarumkm_user_data') || '{}');
        userData.chatbotUses = (userData.chatbotUses || 0) + 1;
        localStorage.setItem('jabarumkm_user_data', JSON.stringify(userData));
        
        // Check for badge unlock
        if (window.badgeManager) {
            window.badgeManager.checkForNewBadges();
        }
    }

    formatMessage(message) {
        // Convert markdown-like syntax to HTML
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Enhanced features
    addQuickReplies() {
        const quickReplies = [
            '🛍️ Lihat Produk',
            '🗺️ Info Daerah',
            '🏆 Sistem Badge',
            '🍽️ Kuliner Khas',
            '🎨 Kerajinan'
        ];

        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.className = 'flex flex-wrap gap-2 mt-4';
        
        quickReplies.forEach(reply => {
            const button = document.createElement('button');
            button.className = 'bg-gray-200 hover:bg-primary hover:text-white text-gray-700 text-xs px-3 py-2 rounded-full transition-all duration-300 transform hover:scale-105';
            button.textContent = reply;
            button.addEventListener('click', () => {
                this.addUserMessage(reply);
                setTimeout(() => this.processMessage(reply), 500);
            });
            quickRepliesDiv.appendChild(button);
        });

        return quickRepliesDiv;
    }
}

// Initialize Enhanced Chatbot
document.addEventListener('DOMContentLoaded', () => {
    // PERBAIKAN: Periksa keberadaan elemen chatbot sebelum menginisialisasi.
    // Ini mencegah error di halaman yang tidak memiliki markup HTML chatbot.
    const chatbotContainer = document.getElementById('chatbot-container');
    
    if (chatbotContainer) {
        new EnhancedChatbot();
    }
});

// Export for use in other modules
window.ChatbotSystem = {
    EnhancedChatbot
}; 
// Command Palette JavaScript untuk JabarUMKM Hub

class CommandPalette {
    constructor() {
        this.isOpen = false;
        this.selectedIndex = 0;
        this.results = [];
        this.commands = [
            { name: 'Beranda', url: 'index.html', icon: '🏠', category: 'Navigasi' },
            { name: 'Tentang Kami', url: 'tentang.html', icon: 'ℹ️', category: 'Navigasi' },
            { name: 'Badge Koleksi', url: 'badge.html', icon: '🏆', category: 'Navigasi' },
            { name: 'Kontak', url: 'kontak.html', icon: '📞', category: 'Navigasi' },
            { name: 'Daerah Bandung', url: 'daerah-bandung.html', icon: '🌸', category: 'Daerah' },
            { name: 'Daerah Garut', url: 'daerah-garut.html', icon: '🍪', category: 'Daerah' },
            { name: 'Peta Interaktif', url: '#peta', icon: '🗺️', category: 'Fitur' },
            { name: 'Produk Unggulan', url: '#produk-unggulan', icon: '⭐', category: 'Fitur' },
            { name: 'Chatbot', url: '#chatbot', icon: '🤖', category: 'Fitur' },
            { name: 'FAQ', url: 'tentang.html#faq', icon: '❓', category: 'Fitur' }
        ];
        
        this.init();
    }
    
    init() {
        this.palette = document.getElementById('command-palette');
        this.content = document.getElementById('command-palette-content');
        this.input = document.getElementById('command-palette-input');
        this.resultsContainer = document.getElementById('command-palette-results');
        
        if (!this.palette || !this.content || !this.input || !this.resultsContainer) {
            console.error('Command palette elements not found');
            return;
        }
        
        this.bindEvents();
    }
    
    bindEvents() {
        // Desktop trigger
        const desktopTrigger = document.getElementById('command-palette-trigger-desktop');
        if (desktopTrigger) {
            desktopTrigger.addEventListener('click', () => this.open());
        }
        
        // Mobile trigger
        const mobileTrigger = document.getElementById('command-palette-trigger-mobile');
        if (mobileTrigger) {
            mobileTrigger.addEventListener('click', () => this.open());
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.open();
            }
            
            if (this.isOpen) {
                this.handleKeydown(e);
            }
        });
        
        // Input events
        this.input.addEventListener('input', () => this.search());
        this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Click outside to close
        this.palette.addEventListener('click', (e) => {
            if (e.target === this.palette) {
                this.close();
            }
        });
    }
    
    open() {
        this.isOpen = true;
        this.palette.classList.remove('hidden');
        this.palette.classList.add('flex');
        
        // Focus input
        setTimeout(() => {
            this.input.focus();
            this.search();
        }, 100);
        
        // Animate content
        setTimeout(() => {
            this.content.classList.remove('opacity-0', 'scale-95');
            this.content.classList.add('opacity-100', 'scale-100');
        }, 150);
    }
    
    close() {
        this.isOpen = false;
        this.palette.classList.add('hidden');
        this.palette.classList.remove('flex');
        this.content.classList.add('opacity-0', 'scale-95');
        this.content.classList.remove('opacity-100', 'scale-100');
        this.input.value = '';
        this.results = [];
        this.selectedIndex = 0;
        this.renderResults();
    }
    
    search() {
        const query = this.input.value.toLowerCase();
        
        if (query.length === 0) {
            this.results = this.commands;
        } else {
            this.results = this.commands.filter(command => 
                command.name.toLowerCase().includes(query) ||
                command.category.toLowerCase().includes(query)
            );
        }
        
        this.selectedIndex = 0;
        this.renderResults();
    }
    
    renderResults() {
        if (this.results.length === 0) {
            this.resultsContainer.innerHTML = `
                <div class="p-4 text-center text-gray-500">
                    <div class="text-4xl mb-2">🔍</div>
                    <p>Tidak ada hasil ditemukan</p>
                </div>
            `;
            return;
        }
        
        const resultsHTML = this.results.map((result, index) => `
            <div class="command-result ${index === this.selectedIndex ? 'bg-primary/10 border-primary' : 'hover:bg-gray-50'} border-l-4 border-transparent p-3 cursor-pointer transition-all duration-200" data-index="${index}">
                <div class="flex items-center space-x-3">
                    <span class="text-2xl">${result.icon}</span>
                    <div class="flex-1">
                        <div class="font-semibold text-gray-900">${result.name}</div>
                        <div class="text-sm text-gray-500">${result.category}</div>
                    </div>
                    <div class="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">${result.url.startsWith('#') ? 'Scroll' : 'Navigate'}</div>
                </div>
            </div>
        `).join('');
        
        this.resultsContainer.innerHTML = resultsHTML;
        
        // Add click events
        this.resultsContainer.querySelectorAll('.command-result').forEach((element, index) => {
            element.addEventListener('click', () => this.selectResult(index));
        });
    }
    
    handleKeydown(e) {
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                this.close();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, this.results.length - 1);
                this.renderResults();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
                this.renderResults();
                break;
            case 'Enter':
                e.preventDefault();
                if (this.results.length > 0) {
                    this.selectResult(this.selectedIndex);
                }
                break;
        }
    }
    
    selectResult(index) {
        if (index >= 0 && index < this.results.length) {
            const result = this.results[index];
            
            if (result.url.startsWith('#')) {
                // Scroll to element
                const element = document.querySelector(result.url);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Navigate to page
                window.location.href = result.url;
            }
            
            this.close();
        }
    }
}

// Initialize Command Palette when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new CommandPalette();
});

// Export for global access
window.CommandPalette = CommandPalette;

// Command Palette Baru
let COMMANDS = [
  { label: 'Beranda', url: 'index.html', icon: '🏠', category: 'Navigasi' },
  { label: 'Tentang', url: 'tentang.html', icon: 'ℹ️', category: 'Navigasi' },
  { label: 'Badge', url: 'badge.html', icon: '🏆', category: 'Navigasi' },
  { label: 'Kontak', url: 'kontak.html', icon: '📞', category: 'Navigasi' },
  { label: 'Produk', url: 'produk.html', icon: '🛍️', category: 'Navigasi' },
  // Fitur-fitur utama web
  { label: 'Peta Interaktif', url: '#peta', icon: '🗺️', category: 'Fitur' },
  { label: 'Produk Unggulan', url: '#produk-unggulan', icon: '⭐', category: 'Fitur' },
  { label: 'Chatbot', url: '#chatbot', icon: '🤖', category: 'Fitur' },
  { label: 'FAQ', url: 'tentang.html#faq', icon: '❓', category: 'Fitur' },
];

// Tambahkan produk dari window.products jika ada
if (window.products && Array.isArray(window.products)) {
  window.products.forEach(product => {
    COMMANDS.push({
      label: product.name,
      url: 'produk.html', // atau detail produk jika ada
      icon: '🛒',
      category: 'Produk',
      price: product.price,
      daerah: product.daerah,
      description: product.description
    });
  });
}

class CommandPalette {
  constructor() {
    this.palette = document.getElementById('command-palette');
    this.input = document.getElementById('command-palette-input');
    this.results = document.getElementById('command-palette-results');
    this.triggerDesktop = document.getElementById('command-palette-trigger-desktop');
    this.triggerMobile = document.getElementById('command-palette-trigger-mobile');
    this.activeIndex = 0;
    this.filtered = [...COMMANDS];
    this.isOpen = false;
    this.init();
  }

  init() {
    if (this.triggerDesktop) this.triggerDesktop.addEventListener('click', () => this.open());
    if (this.triggerMobile) this.triggerMobile.addEventListener('click', () => this.open());
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.open();
      }
      if (this.isOpen && e.key === 'Escape') this.close();
    });
    if (this.input) {
      this.input.addEventListener('input', (e) => this.search(e.target.value));
      this.input.addEventListener('keydown', (e) => this.handleKey(e));
    }
    if (this.palette) {
      this.palette.addEventListener('click', (e) => {
        if (e.target === this.palette) this.close();
      });
    }
    this.renderResults();
  }

  open() {
    this.isOpen = true;
    this.palette.classList.remove('hidden');
    this.palette.classList.add('flex');
    this.palette.classList.add('open');
    setTimeout(() => {
      this.palette.querySelector('#command-palette-content').classList.remove('opacity-0', 'scale-95');
      this.palette.querySelector('#command-palette-content').classList.add('opacity-100', 'scale-100');
      this.input.focus();
      this.search(this.input.value);
    }, 50);
  }

  close() {
    this.isOpen = false;
    this.palette.querySelector('#command-palette-content').classList.add('opacity-0', 'scale-95');
    this.palette.querySelector('#command-palette-content').classList.remove('opacity-100', 'scale-100');
    this.palette.classList.remove('open');
    setTimeout(() => {
      this.palette.classList.remove('flex');
      this.palette.classList.add('hidden');
      this.input.value = '';
      this.search('');
    }, 200);
  }

  search(query) {
    const q = query.toLowerCase();
    this.filtered = COMMANDS.filter(cmd => {
      return (
        cmd.label.toLowerCase().includes(q) ||
        (cmd.category && cmd.category.toLowerCase().includes(q)) ||
        (cmd.daerah && cmd.daerah.toLowerCase().includes(q)) ||
        (cmd.description && cmd.description.toLowerCase().includes(q))
      );
    });
    this.activeIndex = 0;
    this.renderResults();
  }

  handleKey(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.activeIndex = (this.activeIndex + 1) % this.filtered.length;
      this.renderResults();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.activeIndex = (this.activeIndex - 1 + this.filtered.length) % this.filtered.length;
      this.renderResults();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.filtered[this.activeIndex]) {
        window.location.href = this.filtered[this.activeIndex].url;
        this.close();
      }
    }
  }

  renderResults() {
    if (!this.results) return;
    if (this.filtered.length === 0) {
      this.results.innerHTML = '<div class="p-4 text-center text-gray-400">Tidak ada hasil</div>';
      return;
    }
    this.results.innerHTML = this.filtered.map((cmd, i) => {
      let extra = '';
      if (cmd.category === 'Produk') {
        extra = `<div class="text-xs text-gray-500 mt-1">${cmd.price ? cmd.price : ''} ${cmd.daerah ? '• ' + cmd.daerah.charAt(0).toUpperCase() + cmd.daerah.slice(1) : ''}</div>`;
      } else {
        extra = `<div class="text-xs text-gray-400 mt-1">${cmd.category || ''}</div>`;
      }
      return `
        <div class="flex flex-col px-4 py-3 cursor-pointer rounded-lg transition-all ${i === this.activeIndex ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-gray-100'}" data-index="${i}" tabindex="0">
          <div class="flex items-center gap-3">
            <span class="text-xl">${cmd.icon}</span>
            <span>${cmd.label}</span>
          </div>
          ${extra}
        </div>
      `;
    }).join('');
    Array.from(this.results.children).forEach((el, i) => {
      el.onclick = () => {
        window.location.href = this.filtered[i].url;
        this.close();
      };
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('command-palette')) {
    new CommandPalette();
  }
}); 
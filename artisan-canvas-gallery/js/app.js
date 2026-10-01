// Main Application Controller
let artStudio;
let cartManager;

// Global Toast System
function showToast(title, message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const iconColor = type === "error" ? "text-rose-400" : type === "info" ? "text-sky-400" : "text-amber-400";
  const iconClass = type === "error" ? "fa-circle-xmark" : type === "info" ? "fa-circle-info" : "fa-circle-check";

  toast.className = `flex items-center gap-3 p-4 rounded-xl bg-neutral-900 border border-neutral-700/80 shadow-2xl text-neutral-100 transform transition-all duration-300 translate-y-4 opacity-0 max-w-sm pointer-events-auto`;
  toast.innerHTML = `
    <i class="fa-solid ${iconClass} text-lg ${iconColor} shrink-0"></i>
    <div class="flex-1 min-w-0">
      <div class="font-semibold text-sm leading-tight">${title}</div>
      <div class="text-xs text-neutral-400 mt-0.5 leading-snug">${message}</div>
    </div>
    <button class="text-neutral-500 hover:text-neutral-300 text-sm p-1 ml-1" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  }, 10);

  setTimeout(() => {
    toast.classList.add("translate-y-4", "opacity-0");
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

// Gallery Manager
class GalleryManager {
  constructor() {
    this.catalog = [...PAINTINGS_CATALOG];
    this.currentFilter = "All";
    this.searchQuery = "";
    this.sortBy = "featured";
    this.selectedPaletteColor = null;

    this.init();
  }

  init() {
    this.renderCategoryPills();
    this.renderGalleryGrid();
    this.attachEvents();
  }

  renderCategoryPills() {
    const categories = ["All", ...new Set(PAINTINGS_CATALOG.map(p => p.category))];
    const container = document.getElementById("gallery-categories-pills");
    if (!container) return;

    container.innerHTML = categories.map(cat => `
      <button class="gallery-category-btn px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all border ${cat === this.currentFilter ? 'bg-amber-500 text-neutral-950 border-amber-500 shadow-md shadow-amber-500/20' : 'bg-neutral-900/60 text-neutral-300 border-neutral-700/80 hover:border-neutral-500'}"
              data-category="${cat}">
        ${cat}
      </button>
    `).join("");

    container.querySelectorAll(".gallery-category-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.currentFilter = btn.dataset.category;
        this.renderCategoryPills();
        this.renderGalleryGrid();
      });
    });
  }

  getFilteredPaintings() {
    return this.catalog.filter(painting => {
      const matchesCategory = this.currentFilter === "All" || painting.category === this.currentFilter;
      const matchesSearch = !this.searchQuery || 
        painting.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        painting.artist.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        painting.medium.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesPalette = !this.selectedPaletteColor || painting.palette.includes(this.selectedPaletteColor);

      return matchesCategory && matchesSearch && matchesPalette;
    }).sort((a, b) => {
      if (this.sortBy === "price-low") return a.basePrice - b.basePrice;
      if (this.sortBy === "price-high") return b.basePrice - a.basePrice;
      if (this.sortBy === "rating") return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }

  renderGalleryGrid() {
    const grid = document.getElementById("paintings-grid-container");
    const countBadge = document.getElementById("gallery-results-count");
    if (!grid) return;

    const filtered = this.getFilteredPaintings();

    if (countBadge) {
      countBadge.textContent = `Showing ${filtered.length} curated artworks`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <div class="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-400 text-2xl">
            <i class="fa-solid fa-paintbrush"></i>
          </div>
          <h3 class="text-lg font-bold text-neutral-200">No artworks match your search</h3>
          <p class="text-sm text-neutral-400 mt-1 max-w-sm mx-auto">Try clearing your filters or search keywords to browse our full collection.</p>
          <button onclick="galleryManager.resetFilters()" class="mt-4 px-4 py-2 bg-amber-500 text-neutral-950 text-xs font-bold rounded-full hover:bg-amber-400 transition-colors">
            Reset Filters
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between">
        <!-- Artwork Image with Hover Actions -->
        <div class="relative overflow-hidden aspect-[4/5] bg-neutral-950">
          <img src="${item.image}" alt="${item.title}" 
               loading="lazy"
               class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105">
          
          <!-- Category & Badge -->
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-neutral-950/80 backdrop-blur-md text-amber-300 border border-amber-400/30">
              ${item.category}
            </span>
            ${item.featured ? '<span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-neutral-950">Featured</span>' : ''}
          </div>

          <!-- Color Palette Swatches -->
          <div class="absolute bottom-3 left-3 flex items-center gap-1.5 p-1 rounded-full bg-neutral-950/60 backdrop-blur-md border border-white/10 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
            ${item.palette.map(color => `
              <span class="w-3.5 h-3.5 rounded-full border border-black/40" style="background-color: ${color};" title="Palette: ${color}"></span>
            `).join("")}
          </div>

          <!-- Quick Action Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 p-4">
            <button onclick="artStudio.setPainting('${item.id}')" 
                    class="px-4 py-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs tracking-wide shadow-lg hover:bg-amber-400 transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-2">
              <i class="fa-solid fa-sliders"></i>
              Customize in 3D
            </button>
            <button onclick="galleryManager.openQuickView('${item.id}')" 
                    class="w-9 h-9 rounded-xl bg-neutral-800/90 backdrop-blur-md text-neutral-100 hover:text-amber-400 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all border border-neutral-700"
                    title="Quick Details">
              <i class="fa-regular fa-eye"></i>
            </button>
          </div>
        </div>

        <!-- Painting Info -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs text-neutral-400 mb-1">
              <span>By <strong class="text-neutral-200 font-medium">${item.artist}</strong></span>
              <span class="flex items-center gap-1 text-amber-400 font-semibold">
                <i class="fa-solid fa-star text-[10px]"></i> ${item.rating}
              </span>
            </div>
            
            <h3 class="font-serif-heading font-semibold text-lg text-neutral-100 group-hover:text-amber-300 transition-colors leading-snug">
              ${item.title}
            </h3>
            
            <p class="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed">
              ${item.description}
            </p>
          </div>

          <!-- Bottom Price & CTA -->
          <div class="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between">
            <div>
              <span class="text-[10px] text-neutral-400 block uppercase tracking-wider">Starts From</span>
              <span class="text-lg font-bold text-amber-400">$${item.basePrice}</span>
              <span class="text-xs text-neutral-500 line-through ml-1">$${Math.round(item.basePrice * 1.25)}</span>
            </div>

            <button onclick="artStudio.setPainting('${item.id}')"
                    class="px-3.5 py-1.5 rounded-lg border border-amber-500/40 text-amber-400 text-xs font-semibold hover:bg-amber-500 hover:text-neutral-950 transition-all flex items-center gap-1.5">
              <span>Configure</span>
              <i class="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  resetFilters() {
    this.currentFilter = "All";
    this.searchQuery = "";
    this.selectedPaletteColor = null;
    const searchInput = document.getElementById("gallery-search-input");
    if (searchInput) searchInput.value = "";
    this.renderCategoryPills();
    this.renderGalleryGrid();
  }

  openQuickView(paintingId) {
    const item = this.catalog.find(p => p.id === paintingId);
    if (!item) return;

    const modal = document.getElementById("quickview-modal");
    if (!modal) return;

    document.getElementById("quickview-image").src = item.image;
    document.getElementById("quickview-title").textContent = item.title;
    document.getElementById("quickview-artist").textContent = "By " + item.artist;
    document.getElementById("quickview-medium").textContent = item.medium;
    document.getElementById("quickview-year").textContent = item.year;
    document.getElementById("quickview-description").textContent = item.description;
    document.getElementById("quickview-story").textContent = item.story;
    document.getElementById("quickview-price").textContent = `$${item.basePrice}`;

    const customizeBtn = document.getElementById("quickview-customize-btn");
    customizeBtn.onclick = () => {
      this.closeQuickView();
      artStudio.setPainting(item.id);
    };

    modal.classList.remove("hidden");
    setTimeout(() => modal.classList.remove("opacity-0"), 10);
    document.body.style.overflow = "hidden";
  }

  closeQuickView() {
    const modal = document.getElementById("quickview-modal");
    if (modal) {
      modal.classList.add("opacity-0");
      setTimeout(() => {
        modal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }, 300);
    }
  }

  attachEvents() {
    // Search input with debounce
    const searchInput = document.getElementById("gallery-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim();
        this.renderGalleryGrid();
      });
    }

    // Sort select
    const sortSelect = document.getElementById("gallery-sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.sortBy = e.target.value;
        this.renderGalleryGrid();
      });
    }

    // Close Quick View
    const closeBtn = document.getElementById("close-quickview-modal");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeQuickView());

    // Commission Request Form
    const commissionForm = document.getElementById("commission-request-form");
    if (commissionForm) {
      commissionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Commission Received!", "Our lead studio curator will contact you within 24 hours with custom sketches.");
        commissionForm.reset();
      });
    }
  }
}

let galleryManager;

// App Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  artStudio = new ArtCustomizer();
  cartManager = new CartManager();
  galleryManager = new GalleryManager();

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // FAQ Accordion toggles
  document.querySelectorAll(".faq-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector(".faq-chevron");
      content.classList.toggle("hidden");
      if (icon) {
        icon.classList.toggle("rotate-180");
      }
    });
  });
});

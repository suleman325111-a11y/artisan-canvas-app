// Interactive Art Customizer Engine
class ArtCustomizer {
  constructor() {
    this.currentPainting = PAINTINGS_CATALOG[0];
    this.selectedSize = CUSTOMIZER_CONFIG.sizes[1]; // default 24"x36"
    this.selectedMaterial = CUSTOMIZER_CONFIG.materials[0]; // Stretched Canvas
    this.selectedFrame = CUSTOMIZER_CONFIG.frames[1]; // Gold Frame
    this.selectedMat = CUSTOMIZER_CONFIG.mats[0]; // None
    this.selectedRoom = CUSTOMIZER_CONFIG.rooms[0]; // Living Room
    this.currentAmbience = "daylight"; // 'daylight', 'spotlight', 'evening'
    this.customUploadedImage = null;

    this.init();
  }

  init() {
    this.renderCustomizerControls();
    this.attachEventListeners();
    this.updatePreview();
  }

  setPainting(paintingId) {
    const found = PAINTINGS_CATALOG.find(p => p.id === paintingId);
    if (found) {
      this.currentPainting = found;
      this.customUploadedImage = null;
      this.updateHeaderInfo();
      this.updatePreview();
      
      // Scroll smoothly to customizer studio if called from gallery
      const studioElement = document.getElementById("customizer-studio");
      if (studioElement) {
        studioElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  setCustomImage(dataUrl, fileName) {
    this.customUploadedImage = dataUrl;
    this.currentPainting = {
      id: "custom-upload-" + Date.now(),
      title: fileName || "Your Bespoke Masterpiece",
      artist: "Custom Art Commission",
      category: "Personalized",
      medium: "Custom High-Res Archival Print",
      year: "2026",
      basePrice: 175,
      rating: 5.0,
      reviewsCount: 1,
      image: dataUrl,
      description: "Custom artwork uploaded by customer, prepared for premium gallery printing.",
      aspectRatio: "portrait",
      palette: ["#E05A47", "#D4AF37", "#1A1F36"]
    };
    this.updateHeaderInfo();
    this.updatePreview();
    showToast("Success", "Your photo was loaded into the 3D Customizer!");
  }

  calculatePricing() {
    const base = this.currentPainting.basePrice;
    const sizeDelta = this.selectedSize.priceDelta;
    const matMultiplier = this.selectedMaterial.priceMultiplier;
    
    const printSubtotal = Math.round((base + sizeDelta) * matMultiplier);
    const frameCost = this.selectedFrame.price;
    const matCost = (this.selectedFrame.matAllowed && this.selectedMat) ? this.selectedMat.price : 0;
    
    const total = printSubtotal + frameCost + matCost;
    
    return {
      base,
      sizeDelta,
      printSubtotal,
      frameCost,
      matCost,
      total,
      savings: Math.round(total * 0.2) // Show original comparison
    };
  }

  updateHeaderInfo() {
    const titleEl = document.getElementById("customizer-painting-title");
    const artistEl = document.getElementById("customizer-painting-artist");
    const mediumEl = document.getElementById("customizer-painting-medium");
    const badgeEl = document.getElementById("customizer-custom-badge");

    if (titleEl) titleEl.textContent = this.currentPainting.title;
    if (artistEl) artistEl.textContent = "By " + this.currentPainting.artist;
    if (mediumEl) mediumEl.textContent = this.currentPainting.medium;
    if (badgeEl) {
      badgeEl.classList.toggle("hidden", !this.customUploadedImage);
    }
  }

  renderCustomizerControls() {
    this.renderSizes();
    this.renderMaterials();
    this.renderFrames();
    this.renderMats();
    this.renderRooms();
  }

  renderSizes() {
    const container = document.getElementById("size-options-container");
    if (!container) return;

    container.innerHTML = CUSTOMIZER_CONFIG.sizes.map(size => {
      const isSelected = size.id === this.selectedSize.id;
      return `
        <div class="customizer-card p-3 rounded-xl border border-neutral-700 bg-neutral-900/60 ${isSelected ? 'active' : ''}" 
             data-size-id="${size.id}" onclick="artStudio.selectSize('${size.id}')">
          <div class="flex items-center justify-between mb-1">
            <span class="font-medium text-sm text-neutral-100">${size.name}</span>
            ${size.popular ? '<span class="text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded-full">POPULAR</span>' : ''}
          </div>
          <div class="text-xs text-neutral-400 mb-1">${size.dimensions}</div>
          <div class="text-xs font-semibold text-amber-300">
            ${size.priceDelta > 0 ? `+$${size.priceDelta}` : 'Included'}
          </div>
        </div>
      `;
    }).join("");
  }

  renderMaterials() {
    const container = document.getElementById("material-options-container");
    if (!container) return;

    container.innerHTML = CUSTOMIZER_CONFIG.materials.map(mat => {
      const isSelected = mat.id === this.selectedMaterial.id;
      return `
        <div class="customizer-card p-3.5 rounded-xl border border-neutral-700 bg-neutral-900/60 ${isSelected ? 'active' : ''}"
             data-material-id="${mat.id}" onclick="artStudio.selectMaterial('${mat.id}')">
          <div class="flex items-start justify-between">
            <div>
              <div class="font-semibold text-sm text-neutral-100 flex items-center gap-2">
                ${mat.name}
                <span class="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">${mat.badge}</span>
              </div>
              <p class="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">${mat.description}</p>
            </div>
            <div class="text-right shrink-0 ml-3">
              <span class="text-xs font-bold text-amber-300">
                ${mat.priceMultiplier > 1 ? `+${Math.round((mat.priceMultiplier - 1) * 100)}%` : mat.priceMultiplier < 1 ? `-${Math.round((1 - mat.priceMultiplier) * 100)}%` : 'Base'}
              </span>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  renderFrames() {
    const container = document.getElementById("frame-options-container");
    if (!container) return;

    container.innerHTML = CUSTOMIZER_CONFIG.frames.map(frame => {
      const isSelected = frame.id === this.selectedFrame.id;
      return `
        <div class="customizer-card p-3 rounded-xl border border-neutral-700 bg-neutral-900/60 ${isSelected ? 'active' : ''}"
             data-frame-id="${frame.id}" onclick="artStudio.selectFrame('${frame.id}')">
          <div class="flex items-center gap-3">
            <span class="swatch-circle shrink-0 border border-neutral-500 shadow-md" style="background-color: ${frame.swatchColor};"></span>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-neutral-100 truncate">${frame.name}</div>
              <div class="text-xs text-neutral-400 truncate">${frame.price > 0 ? `+$${frame.price}` : 'Free'}</div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  renderMats() {
    const container = document.getElementById("mat-options-container");
    const matSection = document.getElementById("matting-section-wrapper");
    if (!container) return;

    // If frame is frameless gallery wrap, matting is disabled
    if (!this.selectedFrame.matAllowed) {
      if (matSection) matSection.classList.add("opacity-40", "pointer-events-none");
    } else {
      if (matSection) matSection.classList.remove("opacity-40", "pointer-events-none");
    }

    container.innerHTML = CUSTOMIZER_CONFIG.mats.map(mat => {
      const isSelected = this.selectedMat && mat.id === this.selectedMat.id;
      return `
        <div class="customizer-card p-3 rounded-xl border border-neutral-700 bg-neutral-900/60 ${isSelected ? 'active' : ''}"
             data-mat-id="${mat.id}" onclick="artStudio.selectMat('${mat.id}')">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-neutral-200">${mat.name}</span>
            <span class="text-xs text-amber-300 font-semibold">${mat.price > 0 ? `+$${mat.price}` : 'None'}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  renderRooms() {
    const container = document.getElementById("room-picker-container");
    if (!container) return;

    container.innerHTML = CUSTOMIZER_CONFIG.rooms.map(room => {
      const isSelected = room.id === this.selectedRoom.id;
      return `
        <button class="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${isSelected ? 'bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/30' : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'}"
                onclick="artStudio.selectRoom('${room.id}')">
          ${room.name}
        </button>
      `;
    }).join("");
  }

  selectSize(sizeId) {
    this.selectedSize = CUSTOMIZER_CONFIG.sizes.find(s => s.id === sizeId) || this.selectedSize;
    this.renderSizes();
    this.updatePreview();
  }

  selectMaterial(materialId) {
    this.selectedMaterial = CUSTOMIZER_CONFIG.materials.find(m => m.id === materialId) || this.selectedMaterial;
    this.renderMaterials();
    this.updatePreview();
  }

  selectFrame(frameId) {
    this.selectedFrame = CUSTOMIZER_CONFIG.frames.find(f => f.id === frameId) || this.selectedFrame;
    if (!this.selectedFrame.matAllowed) {
      this.selectedMat = CUSTOMIZER_CONFIG.mats[0];
    }
    this.renderFrames();
    this.renderMats();
    this.updatePreview();
  }

  selectMat(matId) {
    this.selectedMat = CUSTOMIZER_CONFIG.mats.find(m => m.id === matId) || this.selectedMat;
    this.renderMats();
    this.updatePreview();
  }

  selectRoom(roomId) {
    this.selectedRoom = CUSTOMIZER_CONFIG.rooms.find(r => r.id === roomId) || this.selectedRoom;
    this.renderRooms();
    this.updatePreview();
  }

  setAmbience(ambience) {
    this.currentAmbience = ambience;
    const buttons = document.querySelectorAll(".ambience-btn");
    buttons.forEach(btn => {
      if (btn.dataset.ambience === ambience) {
        btn.classList.add("bg-amber-500", "text-neutral-950", "font-bold");
        btn.classList.remove("text-neutral-400");
      } else {
        btn.classList.remove("bg-amber-500", "text-neutral-950", "font-bold");
        btn.classList.add("text-neutral-400");
      }
    });
    this.updatePreview();
  }

  updatePreview() {
    const roomBg = document.getElementById("mockup-room-background");
    const artWrapper = document.getElementById("mockup-artwork-wrapper");
    const matContainer = document.getElementById("mockup-mat-container");
    const artImage = document.getElementById("mockup-artwork-img");
    const ambienceOverlay = document.getElementById("mockup-ambience-overlay");
    const dimensionTag = document.getElementById("mockup-dimension-tag");
    const pricing = this.calculatePricing();

    // 1. Room Image & Position
    if (roomBg) {
      roomBg.src = this.selectedRoom.image;
    }

    // 2. Artwork image
    if (artImage) {
      const targetSrc = this.customUploadedImage || this.currentPainting.image;
      artImage.src = targetSrc;
      
      // Material texture class
      artImage.parentElement.className = `relative overflow-hidden transition-all duration-300 ${this.selectedMaterial.textureClass}`;
    }

    // 3. Scaling
    if (artWrapper) {
      const scale = this.selectedSize.scaleFactor;
      artWrapper.style.transform = `scale(${scale})`;
      
      // Frame styling
      artWrapper.className = `mockup-art-container relative transition-all duration-300 cursor-pointer select-none max-w-[280px] sm:max-w-[340px] md:max-w-[420px]`;
      
      switch (this.selectedFrame.id) {
        case "frame-gold":
          artWrapper.classList.add("frame-florentine-gold");
          break;
        case "frame-oak":
          artWrapper.classList.add("frame-natural-oak");
          break;
        case "frame-black":
          artWrapper.classList.add("frame-matte-obsidian");
          break;
        case "frame-white":
          artWrapper.classList.add("frame-nordic-white");
          break;
        case "frame-walnut":
          artWrapper.classList.add("frame-heritage-walnut");
          break;
        case "frame-none":
        default:
          artWrapper.classList.add("frame-wrap");
          break;
      }
    }

    // 4. Matting
    if (matContainer) {
      if (this.selectedFrame.matAllowed && this.selectedMat && this.selectedMat.id !== "matting-none") {
        matContainer.className = this.selectedMat.paddingClass;
      } else {
        matContainer.className = "p-0";
      }
    }

    // 5. Ambience
    if (ambienceOverlay) {
      ambienceOverlay.className = "absolute inset-0 pointer-events-none transition-all duration-500 z-10 ";
      if (this.currentAmbience === "spotlight") {
        ambienceOverlay.classList.add("ambience-spotlight");
      } else if (this.currentAmbience === "evening") {
        ambienceOverlay.classList.add("ambience-evening", "bg-amber-950/20");
      } else {
        ambienceOverlay.classList.add("ambience-daylight");
      }
    }

    // 6. Dimension tag overlay
    if (dimensionTag) {
      dimensionTag.textContent = `${this.selectedSize.name} • ${this.selectedSize.dimensions}`;
    }

    // 7. Update Pricing Breakdown
    this.updatePriceDisplay(pricing);
  }

  updatePriceDisplay(pricing) {
    const totalEl = document.getElementById("customizer-total-price");
    const strikeEl = document.getElementById("customizer-strike-price");
    const printSubtotalEl = document.getElementById("calc-print-subtotal");
    const frameCostEl = document.getElementById("calc-frame-cost");
    const matCostEl = document.getElementById("calc-mat-cost");

    if (totalEl) totalEl.textContent = `$${pricing.total}`;
    if (strikeEl) strikeEl.textContent = `$${pricing.total + pricing.savings}`;
    if (printSubtotalEl) printSubtotalEl.textContent = `$${pricing.printSubtotal}`;
    if (frameCostEl) frameCostEl.textContent = pricing.frameCost > 0 ? `+$${pricing.frameCost}` : "Included";
    if (matCostEl) matCostEl.textContent = pricing.matCost > 0 ? `+$${pricing.matCost}` : "None";
  }

  attachEventListeners() {
    // Ambience buttons
    document.querySelectorAll(".ambience-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.setAmbience(btn.dataset.ambience);
      });
    });

    // Custom Photo Upload input
    const uploadInput = document.getElementById("custom-art-file-input");
    if (uploadInput) {
      uploadInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match("image.*")) {
          showToast("Invalid File", "Please upload an image file (PNG, JPG, WebP).", "error");
          return;
        }

        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          this.setCustomImage(loadEvent.target.result, file.name.replace(/\.[^/.]+$/, ""));
        };
        reader.readAsDataURL(file);
      });
    }

    // Add to cart button
    const addToCartBtn = document.getElementById("customizer-add-to-cart-btn");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", () => {
        this.addToCart();
      });
    }
  }

  addToCart() {
    const pricing = this.calculatePricing();
    const cartItem = {
      id: `${this.currentPainting.id}-${this.selectedSize.id}-${this.selectedFrame.id}-${this.selectedMaterial.id}-${Date.now()}`,
      paintingId: this.currentPainting.id,
      title: this.currentPainting.title,
      artist: this.currentPainting.artist,
      image: this.customUploadedImage || this.currentPainting.image,
      size: this.selectedSize.name,
      dimensions: this.selectedSize.dimensions,
      material: this.selectedMaterial.name,
      frame: this.selectedFrame.name,
      mat: (this.selectedFrame.matAllowed && this.selectedMat.id !== 'matting-none') ? this.selectedMat.name : "None",
      price: pricing.total,
      quantity: 1,
      isCustomUpload: Boolean(this.customUploadedImage)
    };

    cartManager.addItem(cartItem);
    cartManager.openDrawer();
    showToast("Added to Cart", `"${cartItem.title}" configured and added!`);
  }
}

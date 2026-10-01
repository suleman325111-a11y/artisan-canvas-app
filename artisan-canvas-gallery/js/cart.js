// Cart & Checkout Management System
class CartManager {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("artisan_gallery_cart")) || [];
    this.discountPercent = 0;
    this.appliedPromoCode = "";
    this.shippingThreshold = 250;

    this.init();
  }

  init() {
    this.updateCartCount();
    this.renderCartItems();
    this.attachEvents();
  }

  save() {
    localStorage.setItem("artisan_gallery_cart", JSON.stringify(this.items));
    this.updateCartCount();
  }

  addItem(item) {
    // Check if an identical custom configuration already exists
    const existingIndex = this.items.findIndex(i => 
      i.paintingId === item.paintingId &&
      i.size === item.size &&
      i.material === item.material &&
      i.frame === item.frame &&
      i.mat === item.mat
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += 1;
    } else {
      this.items.push(item);
    }

    this.save();
    this.renderCartItems();
  }

  updateQuantity(itemId, delta) {
    const item = this.items.find(i => i.id === itemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(itemId);
      return;
    }

    this.save();
    this.renderCartItems();
  }

  removeItem(itemId) {
    this.items = this.items.filter(i => i.id !== itemId);
    this.save();
    this.renderCartItems();
    showToast("Removed", "Item removed from cart.", "info");
  }

  clearCart() {
    this.items = [];
    this.discountPercent = 0;
    this.appliedPromoCode = "";
    this.save();
    this.renderCartItems();
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getDiscountAmount() {
    return Math.round(this.getSubtotal() * (this.discountPercent / 100));
  }

  getShippingCost() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0 || subtotal >= this.shippingThreshold) return 0;
    return 25; // standard secure art crating & delivery
  }

  getTotal() {
    return Math.max(0, this.getSubtotal() - this.getDiscountAmount() + this.getShippingCost());
  }

  applyPromoCode(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    if (cleanCode === "ARTLOVE15") {
      this.discountPercent = 15;
      this.appliedPromoCode = "ARTLOVE15 (15% OFF)";
      this.renderCartItems();
      showToast("Promo Applied!", "15% discount has been applied to your order.");
      return true;
    } else if (cleanCode === "GALLERYVIP") {
      this.discountPercent = 20;
      this.appliedPromoCode = "GALLERYVIP (20% OFF)";
      this.renderCartItems();
      showToast("VIP Applied!", "20% Collector discount applied.");
      return true;
    } else {
      showToast("Invalid Promo", "Code not recognized. Try 'ARTLOVE15'", "error");
      return false;
    }
  }

  updateCartCount() {
    const totalCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(b => {
      b.textContent = totalCount;
      b.classList.toggle("hidden", totalCount === 0);
    });
  }

  renderCartItems() {
    const container = document.getElementById("cart-items-container");
    const emptyState = document.getElementById("cart-empty-state");
    const footer = document.getElementById("cart-footer");
    const subtotalEl = document.getElementById("cart-subtotal");
    const discountRow = document.getElementById("cart-discount-row");
    const discountAmountEl = document.getElementById("cart-discount-amount");
    const shippingEl = document.getElementById("cart-shipping");
    const totalEl = document.getElementById("cart-total");
    const shippingProgress = document.getElementById("free-shipping-progress");
    const shippingPrompt = document.getElementById("free-shipping-prompt");

    if (!container) return;

    if (this.items.length === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
      if (footer) footer.classList.add("hidden");
      container.innerHTML = "";
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");
    if (footer) footer.classList.remove("hidden");

    container.innerHTML = this.items.map(item => `
      <div class="flex gap-4 p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 transition-all hover:border-neutral-700">
        <div class="w-20 h-24 rounded-xl overflow-hidden shrink-0 border border-neutral-700 bg-neutral-950 relative">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
          ${item.isCustomUpload ? '<span class="absolute bottom-1 right-1 text-[9px] bg-amber-500 text-black px-1 rounded font-bold">Custom</span>' : ''}
        </div>
        <div class="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start">
              <h4 class="font-semibold text-sm text-neutral-100 truncate">${item.title}</h4>
              <button onclick="cartManager.removeItem('${item.id}')" class="text-neutral-500 hover:text-rose-400 text-sm ml-2">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
            <p class="text-xs text-neutral-400 mt-0.5 truncate">Artist: ${item.artist}</p>
            <div class="mt-2 space-y-1">
              <div class="text-[11px] text-amber-300/90 font-medium">
                ${item.size} (${item.dimensions})
              </div>
              <div class="text-[11px] text-neutral-400">
                ${item.frame} • ${item.material} ${item.mat !== 'None' ? `• ${item.mat}` : ''}
              </div>
            </div>
          </div>
          
          <div class="flex items-center justify-between pt-2 border-t border-neutral-800/80 mt-2">
            <div class="flex items-center gap-2 bg-neutral-800 rounded-lg p-1 border border-neutral-700">
              <button onclick="cartManager.updateQuantity('${item.id}', -1)" class="w-6 h-6 rounded flex items-center justify-center text-xs text-neutral-300 hover:bg-neutral-700 hover:text-white">-</button>
              <span class="text-xs font-semibold px-2">${item.quantity}</span>
              <button onclick="cartManager.updateQuantity('${item.id}', 1)" class="w-6 h-6 rounded flex items-center justify-center text-xs text-neutral-300 hover:bg-neutral-700 hover:text-white">+</button>
            </div>
            <div class="font-bold text-sm text-amber-400">
              $${item.price * item.quantity}
            </div>
          </div>
        </div>
      </div>
    `).join("");

    // Calculate figures
    const subtotal = this.getSubtotal();
    const discount = this.getDiscountAmount();
    const shipping = this.getShippingCost();
    const total = this.getTotal();

    if (subtotalEl) subtotalEl.textContent = `$${subtotal}`;
    
    if (discountRow && discountAmountEl) {
      if (discount > 0) {
        discountRow.classList.remove("hidden");
        discountAmountEl.textContent = `-$${discount} (${this.appliedPromoCode})`;
      } else {
        discountRow.classList.add("hidden");
      }
    }

    if (shippingEl) {
      shippingEl.textContent = shipping === 0 ? "FREE" : `$${shipping}`;
      if (shipping === 0) shippingEl.classList.add("text-emerald-400");
      else shippingEl.classList.remove("text-emerald-400");
    }

    if (totalEl) totalEl.textContent = `$${total}`;

    // Free shipping progress bar
    if (shippingProgress && shippingPrompt) {
      if (subtotal >= this.shippingThreshold) {
        shippingProgress.style.width = "100%";
        shippingPrompt.innerHTML = `<span class="text-emerald-400 font-semibold"><i class="fa-solid fa-circle-check mr-1"></i> You unlocked Free Insured White-Glove Delivery!</span>`;
      } else {
        const percent = Math.min(100, Math.round((subtotal / this.shippingThreshold) * 100));
        shippingProgress.style.width = `${percent}%`;
        shippingPrompt.innerHTML = `Add <span class="font-bold text-amber-400">$${this.shippingThreshold - subtotal}</span> more for Free White-Glove Shipping!`;
      }
    }
  }

  openDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-backdrop");
    if (drawer && backdrop) {
      drawer.classList.remove("translate-x-full");
      backdrop.classList.remove("hidden");
      setTimeout(() => backdrop.classList.remove("opacity-0"), 10);
      document.body.style.overflow = "hidden";
    }
  }

  closeDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-backdrop");
    if (drawer && backdrop) {
      drawer.classList.add("translate-x-full");
      backdrop.classList.add("opacity-0");
      setTimeout(() => {
        backdrop.classList.add("hidden");
        document.body.style.overflow = "auto";
      }, 300);
    }
  }

  openCheckoutModal() {
    if (this.items.length === 0) {
      showToast("Cart is Empty", "Add some paintings to your cart first.", "info");
      return;
    }
    this.closeDrawer();
    const modal = document.getElementById("checkout-modal");
    if (modal) {
      modal.classList.remove("hidden");
      setTimeout(() => modal.classList.remove("opacity-0"), 10);
      document.body.style.overflow = "hidden";
      
      const modalTotal = document.getElementById("checkout-modal-total");
      if (modalTotal) modalTotal.textContent = `$${this.getTotal()}`;
    }
  }

  closeCheckoutModal() {
    const modal = document.getElementById("checkout-modal");
    if (modal) {
      modal.classList.add("opacity-0");
      setTimeout(() => {
        modal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }, 300);
    }
  }

  processOrder(formData) {
    const orderId = "ART-" + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderId,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      customer: formData,
      items: [...this.items],
      total: this.getTotal(),
      shipping: this.getShippingCost() === 0 ? "Free White-Glove Delivery" : "$25 Insured Courier"
    };

    // Render Order Confirmation
    const checkoutBody = document.getElementById("checkout-form-container");
    const confirmationBody = document.getElementById("checkout-success-container");
    const orderNumberEl = document.getElementById("confirmation-order-id");
    const customerEmailEl = document.getElementById("confirmation-email");
    const invoiceSummaryEl = document.getElementById("confirmation-summary");

    if (checkoutBody && confirmationBody) {
      checkoutBody.classList.add("hidden");
      confirmationBody.classList.remove("hidden");

      if (orderNumberEl) orderNumberEl.textContent = orderId;
      if (customerEmailEl) customerEmailEl.textContent = formData.email;

      if (invoiceSummaryEl) {
        invoiceSummaryEl.innerHTML = `
          <div class="border-t border-b border-neutral-700 py-3 my-3 text-xs space-y-2">
            ${this.items.map(item => `
              <div class="flex justify-between">
                <span class="text-neutral-300">${item.quantity}x ${item.title} (${item.size}, ${item.frame})</span>
                <span class="font-semibold text-neutral-100">$${item.price * item.quantity}</span>
              </div>
            `).join("")}
            <div class="flex justify-between font-bold text-amber-400 text-sm pt-2 border-t border-neutral-800">
              <span>Total Paid:</span>
              <span>$${this.getTotal()}</span>
            </div>
          </div>
        `;
      }
    }

    this.clearCart();
    showToast("Order Confirmed!", `Order #${orderId} was successfully placed!`);
  }

  attachEvents() {
    // Open cart drawer triggers
    document.querySelectorAll(".open-cart-btn").forEach(btn => {
      btn.addEventListener("click", () => this.openDrawer());
    });

    // Close cart drawer triggers
    const closeDrawerBtn = document.getElementById("close-cart-drawer");
    const backdrop = document.getElementById("cart-backdrop");
    if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", () => this.closeDrawer());
    if (backdrop) backdrop.addEventListener("click", () => this.closeDrawer());

    // Promo code apply button
    const promoBtn = document.getElementById("apply-promo-btn");
    const promoInput = document.getElementById("promo-input");
    if (promoBtn && promoInput) {
      promoBtn.addEventListener("click", () => {
        this.applyPromoCode(promoInput.value);
      });
    }

    // Checkout modal triggers
    const checkoutBtn = document.getElementById("proceed-to-checkout-btn");
    const closeCheckoutBtn = document.getElementById("close-checkout-modal");
    if (checkoutBtn) checkoutBtn.addEventListener("click", () => this.openCheckoutModal());
    if (closeCheckoutBtn) closeCheckoutBtn.addEventListener("click", () => this.closeCheckoutModal());

    // Checkout Form Submission
    const checkoutForm = document.getElementById("order-checkout-form");
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = {
          name: document.getElementById("checkout-name").value,
          email: document.getElementById("checkout-email").value,
          address: document.getElementById("checkout-address").value,
          city: document.getElementById("checkout-city").value,
          country: document.getElementById("checkout-country").value,
          notes: document.getElementById("checkout-notes") ? document.getElementById("checkout-notes").value : ""
        };
        this.processOrder(formData);
      });
    }

    // Close modal on Esc
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeDrawer();
        this.closeCheckoutModal();
      }
    });
  }
}

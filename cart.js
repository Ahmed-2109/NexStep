const Cart = {
    items: Storage.get('cart') || [],
    
    add(product) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.save();
        this.updateUI();
        showToast(`${product.name} added to cart!`);
    },
    
    remove(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
        this.updateUI();
    },
    
    updateQuantity(id, amount) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.quantity += amount;
            if (item.quantity <= 0) this.remove(id);
            else this.save();
        }
        this.updateUI();
    },
    
    save() {
        Storage.save('cart', this.items);
    },
    
    updateUI() {
        const badges = document.querySelectorAll('.cart-badge');
        const count = this.items.reduce((acc, item) => acc + item.quantity, 0);
        badges.forEach(badge => badge.textContent = count);
    }
    
};
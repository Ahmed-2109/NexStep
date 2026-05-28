const Theme = {
    init() {
        const savedTheme = Storage.get('theme') || 'light';
        this.set(savedTheme);
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                this.toggle();
            }
        });
    },
    
    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        this.set(next);
    },
    
    set(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        Storage.save('theme', theme);
        this.updateIcon(theme);
    },
    
    updateIcon(theme) {
        const icons = document.querySelectorAll('.theme-toggle i');
        icons.forEach(icon => {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }
};

document.addEventListener('DOMContentLoaded', () => Theme.init());
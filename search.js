const Search = {
    init() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.search-trigger')) {
                this.open();
            }
            if (e.target.id === 'search-overlay' || e.target.closest('.close-search')) {
                this.close();
            }
        });
    },
    
    open() {
        const overlay = document.createElement('div');
        overlay.id = 'search-overlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); z-index: 2000;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        overlay.innerHTML = `
            <button class="close-search" style="position: absolute; top: 40px; right: 40px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">&times;</button>
            <div style="width: 80%; max-width: 600px;">
                <input type="text" id="search-input" placeholder="Search Nexstep..." style="width: 100%; background: none; border: none; border-bottom: 2px solid white; color: white; font-size: 2rem; padding: 10px; outline: none;">
                <div id="search-results" style="margin-top: 40px; color: white;"></div>
            </div>
        `;
        document.body.appendChild(overlay);
        document.getElementById('search-input').focus();
    },
    
    close() {
        const overlay = document.getElementById('search-overlay');
        if (overlay) overlay.remove();
    }
};

document.addEventListener('DOMContentLoaded', () => Search.init());
/* =========================================================
   GET WISHLIST DATA
========================================================= */

let wishlist =
JSON.parse(
    localStorage.getItem('wishlist')
) || [];

/* =========================================================
   RENDER WISHLIST
========================================================= */

function renderWishlist(){

    const wishlistGrid =
    document.getElementById(
        'wishlist-grid'
    );

    const wishlistCount =
    document.getElementById(
        'wishlist-count'
    );

    /* UPDATE COUNT */

    wishlistCount.textContent =
    wishlist.length;

    /* EMPTY STATE */

    if(wishlist.length === 0){

        wishlistGrid.innerHTML = `

            <div class="empty-state">

                <i class="far fa-heart"></i>

                <h2>
                    Your Wishlist Is Empty
                </h2>

                <p>
                    Save your favorite sneakers
                    and they will appear here.
                </p>

                <a href="products.html" class="shop-btn">

                    <i class="fas fa-store"></i>

                    Explore Products

                </a>

            </div>

        `;

        return;
    }

    /* SHOW PRODUCTS */

    wishlistGrid.innerHTML = "";

    wishlist.forEach(product => {

        wishlistGrid.innerHTML += `

            <div class="wishlist-card">

                <div class="wishlist-image">

                    <span class="wishlist-badge">

                        ${product.type || "Premium"}

                    </span>

                    <img
                        src="${product.image}"
                        alt="${product.name}"

                        onerror="
                        this.src='nexstep logo.jpeg'
                        "
                    >

                </div>

                <div class="wishlist-content">

                    <h3 class="wishlist-name">

                        ${product.name}

                    </h3>

                    <p class="wishlist-desc">

                        ${product.category || "Premium Sneakers"}
                        •
                        ${product.gender || "Unisex"}

                    </p>

                    <div class="wishlist-price">

                        ₹${product.price}

                    </div>

                    <div class="wishlist-actions">

                        <button
                            class="btn btn-cart"

                            onclick='addToCart(
                            ${JSON.stringify(product)
                            .replace(/"/g,"&quot;")}
                            )'
                        >

                            <i class="fas fa-cart-shopping"></i>

                            Add To Cart

                        </button>

                        <button
                            class="btn btn-remove"

                            onclick="
                            removeWishlist(${product.id})
                            "
                        >

                            <i class="fas fa-trash"></i>

                        </button>

                    </div>

                </div>

            </div>

        `;
    });
}

/* =========================================================
   REMOVE PRODUCT
========================================================= */

function removeWishlist(id){

    wishlist =
    wishlist.filter(
        item => item.id !== id
    );

    localStorage.setItem(

        'wishlist',

        JSON.stringify(wishlist)
    );

    renderWishlist();

    updateWishlistBadge();

    showPopup(
        'Removed From Wishlist'
    );
}

/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(product){

    let cart =
    JSON.parse(
        localStorage.getItem('cart')
    ) || [];

    const existing =
    cart.find(
        item => item.id === product.id
    );

    if(existing){

        existing.quantity += 1;

    }else{

        cart.push({

            ...product,

            quantity:1
        });
    }

    localStorage.setItem(

        'cart',

        JSON.stringify(cart)
    );

    updateCartBadge();

    showPopup(
        `${product.name} added to cart`
    );
}

/* =========================================================
   UPDATE WISHLIST BADGE
========================================================= */

function updateWishlistBadge(){

    const wishlist =
    JSON.parse(
        localStorage.getItem('wishlist')
    ) || [];

    const badge =
    document.querySelector(
        '.wishlist-badge'
    );

    if(badge){

        badge.textContent =
        wishlist.length;
    }
}

/* =========================================================
   UPDATE CART BADGE
========================================================= */

function updateCartBadge(){

    const cart =
    JSON.parse(
        localStorage.getItem('cart')
    ) || [];

    const total =
    cart.reduce(
        (acc,item)=>
        acc + item.quantity,
        0
    );

    const badge =
    document.querySelector(
        '.cart-badge'
    );

    if(badge){

        badge.textContent = total;
    }
}

/* =========================================================
   PREMIUM POPUP
========================================================= */

function showPopup(message){

    const popup =
    document.getElementById(
        'popup'
    );

    if(!popup) return;

    popup.innerHTML = `

        <i class="fas fa-check-circle"></i>

        ${message}

    `;

    popup.classList.add(
        'active'
    );

    setTimeout(() => {

        popup.classList.remove(
            'active'
        );

    },2500);
}

/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(

    'DOMContentLoaded',

    () => {

        renderWishlist();

        updateWishlistBadge();

        updateCartBadge();
    }
);
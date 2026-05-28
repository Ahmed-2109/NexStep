const Filter = {
    apply(category, products) {
        if (!category || category === 'all') return products;
        return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    },
    
    sortByPrice(products, order = 'asc') {
        return [...products].sort((a, b) => {
            return order === 'asc' ? a.price - b.price : b.price - a.price;
        });
    }
};
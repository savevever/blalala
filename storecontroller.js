import { createStore } from 'vuex';

export default createStore({
    state: {
        products: [],
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        selectedProduct: null
    },
    getters: {
        products: state => state.products,
        cart: state => state.cart,
        cartItemCount: state => state.cart.reduce((count, product) => count + product.quantity, 0),
        cartTotal: state => state.cart.reduce((total, product) => total + (product.price * product.quantity), 0),
        selectedProduct: state => state.selectedProduct 
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        ADD_TO_CART(state, product) {
            const item = state.cart.find(
                item => item.id === product.id
            );
            if (item) {
                item.quantity += product.quantity;
            } else {
                product.quantity = product.quantity || 1;
                state.cart.push({ ...product });
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        REMOVE_FROM_CART(state, productId) {
            state.cart = state.cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        UPDATE_QUANTITY(state, { productId, quantity }) {
            const item = state.cart.find(item => item.id === productId);
            if (item) {
                item.quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },
        SET_SELECTED_PRODUCT(state, product) { 
            state.selectedProduct = product;
        },
        LOAD_CART(state) {
            state.cart = JSON.parse(localStorage.getItem('cart')) || [];
        }
    },
    actions: {
        loadProducts({ commit }) {
            const products = [];
            for (let i = 0; i < 24; i++) {
                products.push({
                    id: i + 1,
                    // imageSource: "https://scontent.fbkk17-1.fna.fbcdn.net/v/t39.30808-6/445522735_971190521465362_3019654959300681937_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGuT2R_OrRC7t5AOdNc73k7jMSwnD1yG-KMxLCcPXIb4n9Ag8-KJnn3pQw4MEKXPzb4DYoh72_ujwUfLu9IUwzD&_nc_ohc=-P-bsMlZ-bEQ7kNvgG5x8l6&_nc_ht=scontent.fbkk17-1.fna&oh=00_AYB2XGNQBbCBYoy_0OBPAlpKk6FqhGFoRpaVciwMBIjKeA&oe=6688497E",
                    imageSource: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcPEga9g5PeWG7E0XTnnS2vJpjZDBdmwqIg&s",
                    title: "Product Title " + (i + 1),
                    price: 245,
                    soldCount: 2450 ,
                });
            }
            commit('SET_PRODUCTS', products);
        },
        addToCart({ commit }, product) {
            commit('ADD_TO_CART', product);
        },
        removeFromCart({ commit }, productId) {
            commit('REMOVE_FROM_CART', productId);
        },
        updateQuantity({ commit }, { productId, quantity }) {
            commit('UPDATE_QUANTITY', { productId, quantity });
        },
        setSelectedProduct({ commit }, product) { 
            commit('SET_SELECTED_PRODUCT', product);
        },
        loadCart({ commit }) {
            commit('LOAD_CART');
        }
    }
});

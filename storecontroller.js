import { createStore } from 'vuex';

export default createStore({
    state: {
        products: [],
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        history: JSON.parse(localStorage.getItem('history')) || [],
        selectedProduct: null,
    },
    getters: {
        products: state => state.products,
        cart: state => state.cart,
        history: state => state.history,
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
        }, ADD_TO_HISTORY(state, product) {
            state.history.push({ ...product });
            localStorage.setItem('history', JSON.stringify(state.history));
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
        },LOAD_HISTORY(state) {
            state.history = JSON.parse(localStorage.getItem('history')) || [];
        }
    },
    actions: {
        loadProducts({ commit }) {
            const products = [];
            for (let i = 0; i < 24; i++) {
                products.push({
                    id: i + 1,
                    imageSource: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcPEga9g5PeWG7E0XTnnS2vJpjZDBdmwqIg&s",
                    title: "Product Title " + (i + 1),
                    option:'size',
                    Category: ['L', 'M', 'S'],
                    price: 245,
                    soldCount: 2450 ,
                });
            }
            commit('SET_PRODUCTS', products);
        },
        addToCart({ commit }, product) {
            commit('ADD_TO_CART', product);
        },
        addToHistory({ commit }, product) {
            commit('ADD_TO_HISTORY', product);
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
        },
        loadHistory({ commit }) {
            commit('LOAD_HISTORY');
        }
    }
});

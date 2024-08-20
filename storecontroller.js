import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        products: [],
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        history: JSON.parse(localStorage.getItem('history')) || [],
        selectedProduct: null,
        users: [],
        currentUser: JSON.parse(localStorage.getItem('user')) || { id: null, name: '', role: 'user', balance: 0 },
        likedProducts: JSON.parse(localStorage.getItem('likedProducts')) || {},
        followedShops: JSON.parse(localStorage.getItem('followedShops')) || {},
        shopInfo: null,
        followerCounts: JSON.parse(localStorage.getItem('followerCounts')) || {},
        productInfo: null
    },
    getters: {
        shopInfo: state => state.shopInfo,
        products: state => state.products,
        productInfo: state => state.productInfo,
        cart: state => state.cart,
        history: state => state.history,
        cartItemCount: state => state.cart.reduce((count, product) => count + product.quantity, 0),
        cartTotal: state => state.cart.reduce((total, product) => total + (product.price * product.quantity), 0),
        selectedProduct: state => state.selectedProduct,
        user: state => userId => state.users.find(user => user.id === userId),
        currentBalance: state => state.currentUser.balance,
        likedProducts: state => state.likedProducts,
        followedShops: state => state.followedShops,
        followerCount: (state) => (shopId) => {
            // console.log('Shop ID:', shopId, 'Follower Count:', state.followerCounts[shopId]);
            return state.followerCounts[shopId] || 0;
        },
        isFollowed: state => shopId => !!state.followedShops[shopId]

    },
    mutations: {
        setShopInfo(state, shopInfo) {
            state.shopInfo = shopInfo;
        },
        setProductInfo(state, productInfo) {  
            state.productInfo = productInfo;
        },
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
        }, LOAD_HISTORY(state) {
            state.history = JSON.parse(localStorage.getItem('history')) || [];
        },
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_CURRENT_USER(state, user) {
            state.currentUser = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        REMOVE_ALL_CART_ITEMS(state) {
            state.cart = [];
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        UPDATE_BALANCE(state, { userId, amount }) {
            const user = state.users.find(user => user.id === userId);
            if (user) user.balance -= amount;
        }, TOGGLE_LIKE(state, productId) {
            if (state.likedProducts[productId]) {
                delete state.likedProducts[productId];
            } else {
                state.likedProducts[productId] = true;
            }
            localStorage.setItem('likedProducts', JSON.stringify(state.likedProducts));
        }, TOGGLE_FOLLOW_SHOP(state, shopId) {
            if (state.followedShops[shopId]) {
                delete state.followedShops[shopId];
                state.followerCounts[shopId] = Math.max(0, state.followerCounts[shopId] - 1);
            } else {
                state.followedShops[shopId] = true;
                state.followerCounts[shopId] = (state.followerCounts[shopId] || 0) + 1;
            }
            localStorage.setItem('followedShops', JSON.stringify(state.followedShops));
            localStorage.setItem('followerCounts', JSON.stringify(state.followerCounts));
        },
    },
    actions: {
        async fetchProducts({ commit }) {
            try {
                const response = await axios.get('http://localhost:8081/products');
                commit('SET_PRODUCTS', response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }, 
        async fetchShopInfo({ commit }, productId) {
            try {
                const response = await axios.get('http://localhost:8081/products');
                const products = response.data;
        
                const product = products.find(product => product.id == productId);
        
                if (product) {
                    const user = JSON.parse(localStorage.getItem('user'));
                    const shopInfo = {
                        id: product.shopId,
                        name: user.name || 'Unknown',
                        seller: user.name || 'Unknown'
                    };
        
                    commit('setShopInfo', shopInfo);
                } else {
                    console.error('Product not found');
                }
            } catch (error) {
                console.error('Error fetching shop info:', error);
            }
        },
        
        
        async loadUsers({ commit }) {
            try {
                const response = await axios.get('http://localhost:8081/users');
                commit('SET_USERS', response.data);
            } catch (error) {
                console.error('Error loading users:', error);
            }
        },
        updateShopInfo({ commit }, shopInfo) {
            commit('setShopInfo', shopInfo);
        },
        async login({ commit }, { email, password }) {
            try {
                const response = await axios.post('http://localhost:8081/users/login', { email, password });
                const user = response.data;
                commit('SET_CURRENT_USER', user);
                return user;
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        async loadProducts({ commit }) {
            try {
                const response = await axios.get('/seller/item');
                commit('SET_PRODUCTS', response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },

        processPayment({ commit, getters }, { userId, amount }) {
            const user = getters.user(userId);
            if (user && user.balance >= amount) {
                commit('UPDATE_BALANCE', { userId, amount });
                return true; // Payment success
            } else {
                return false; // Payment failure
            }
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
        },
        toggleLike({ commit }, productId) {
            commit('TOGGLE_LIKE', productId);
        }, toggleFollowShop({ commit }, shopId) {
            commit('TOGGLE_FOLLOW_SHOP', shopId);
        },
    }
});

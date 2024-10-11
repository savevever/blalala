<template>
    <div class="head">
        <div class="navbar">
            <div class="logo">
                <a href="/">Chumchon OTOP</a>
            </div>
            <nav>
                <ul id="MenuItems">
                    <li @click="redirectIfNotLoggedIn('/')"><router-link to="/">Home</router-link></li>
                    <li :class="{ disabled: userRole() === 'seller' }"
                        @click="redirectIfNotLoggedIn('/selling/FormOneSeller')">
                        <router-link v-if="userRole() !== 'seller'" to="/selling/FormOneSeller">Start
                            Selling</router-link>
                        <span v-else>Start Selling</span>
                    </li>
                    <li v-if="!isLoggedIn" @click="redirectIfNotLoggedIn('/users/login')">
                        <router-link to="/users/login">Login</router-link>
                    </li>
                    <li>
                        <div class="profile">
                            <router-link to="/users/setting" @click="redirectIfNotLoggedIn('/users/setting')">
                                <img v-if="profileImage" :src="profileImage" alt="User Profile" class="profile-image"
                                    @click="toggleMenu" />
                                <font-awesome-icon v-else :icon="['fas', 'circle-user']" id="icon"
                                    @click="toggleMenu"></font-awesome-icon>
                            </router-link>
                            <p v-if="isLoggedIn"><router-link to="/users/setting">{{ userName }}</router-link></p>
                        </div>
                    </li>
                </ul>
                <div class="search-box">
                    <i class="fa fa-search"></i>
                    <input type="search" class="search" placeholder="Search..." />
                </div>
                <div class="icon-basket" @click="redirectIfNotLoggedIn('/users/cart')">
                    <router-link to="/users/cart">
                        <div class="cart-icon">
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" id="icon-basket"></font-awesome-icon>
                            <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
                            <!-- <span v-if="cartItemCount > 0" class="cart-count">000</span> -->
                        </div>
                    </router-link>
                </div>
            </nav>
        </div>
    </div>
</template>


<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch, faCartShopping, faCircleUser } from '@fortawesome/free-solid-svg-icons'
// import jwtDecode from 'jwt-decode';
import axios from 'axios';

library.add(faSearch, faCartShopping, faCircleUser)

export default {
    data() {
        return {
            isMenuOpen: false,
            isLoggedIn: false,
            userName: '',
            profileImage: null,
            cartItemCount: 0,
        };
    }, created() {
        this.checkLoginStatus();
        this.getUserName();
        this.getProfileImage();
        this.fetchCartItemCount();
    }, components: {
        FontAwesomeIcon
    },
    methods: {
        fetchCartItemCount() {
            axios.get('http://localhost:8081/products/getCart')
                .then(response => {
                    this.cartItemCount = response.data.length;
                })
                .catch(error => {
                    console.error('Error fetching cart count:', error);
                });
        },
        userRole() {
            const user = JSON.parse(localStorage.getItem('user'));
            return user ? user.role : null;
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        checkLoginStatus() {
            const token = localStorage.getItem('token');
            this.isLoggedIn = !!token;
        }, getUserName() {
            const user = JSON.parse(localStorage.getItem('user'));
            console.log('User data:', user);
            if (user) {
                this.userName = user.name;
                console.log('User name:', this.userName);
            }
        }, logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.isLoggedIn = false;
            this.userName = '';
            window.location.href = `http://localhost:8080`;
        }, getProfileImage() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.image) {
                this.profileImage = user.image;
            }
        }, redirectIfNotLoggedIn(path) {
            if (!this.isLoggedIn) {
                this.$router.push('/users/login');
            } else {
                this.$router.push(path);
            }
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
.disabled {
    pointer-events: none;
    color: grey;
    opacity: 0.5;
}

.cart-icon {
    position: relative;
}

.cart-count {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 3px 6px;
    font-size: 12px;
}

.profile-image {
    width: 50px;
    height: 50px;
    border-radius: 30px;
    object-fit: cover;
}

.head {
    height: 40%;
    width: 100vw;
    background: #ebe3d5;
    background-position: top center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 70px;
}

.profile {
    display: flex;
    gap: 10px;
    align-items: center;
}

.profile p {
    font-size: 20px;
}

.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 50px;
}

.logo a {
    text-decoration: none;
    color: #201658;
    font-size: 25px;
    font-family: 'Poetsen One', sans-serif;
}

.logo a:hover {
    text-decoration: underline;
}

#MenuItems {
    display: flex;
    align-items: center;
}

nav {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
}

nav ul {
    display: flex;
    list-style: none;
    padding: 0;
}

nav ul li {
    margin-right: 30px;
}

nav ul li a,
nav ul li button {
    text-decoration: none;
    font-size: 18px;
    color: black;
    font-family: 'Nunito', sans-serif;
}

nav ul li button {
    border: none;
    background: transparent;
    cursor: pointer;
}

nav ul li a:hover,
nav ul li button:hover {
    color: #9b1111;
}

.search-box {
    display: flex;
    align-items: center;
    background: white;
    padding: 5px 10px;
    border-radius: 25px;
    border: 1px solid #ccc;
}

.search-box input[type="search"] {
    border: none;
    outline: none;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 25px;
}

.search-box i {
    margin-right: 5px;
    color: black;
}

#icon-basket {
    margin-left: 20px;
    color: black;
    width: 2rem;
    height: 2rem;
}

.fa-solid.fa-circle-user {
    color: black;
    cursor: pointer;

}

#icon {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
}

#icon:hover {
    color: #ce9f2b;
}

font-awesome-icon {
    width: 100px;
    height: 100px;
}
</style>
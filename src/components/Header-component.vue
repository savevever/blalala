<template>
    <div class="head">
        <div class="navbar">
            <div class="logo">
                <a href="/">Chumchon OTOP</a>
            </div>
            <nav>
                <ul id="MenuItems">
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/selling/salesPage">Start Selling</router-link></li>
                    <li><router-link to="/users/Center">Center</router-link></li>
                    <li v-if="!isLoggedIn"><router-link to="/users/login">Login</router-link></li>
                    <li v-if="isLoggedIn"><a @click="logout">Logout</a></li>
                    <li>
                        <div class="profile">
                            <router-link to="/users/setting">
                                <font-awesome-icon :icon="['fas', 'circle-user']" id="icon"
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
                <div class="icon-basket">
                    <router-link to="/users/cart">
                        <font-awesome-icon :icon="['fas', 'cart-shopping']" id="icon-basket"></font-awesome-icon>
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

library.add(faSearch, faCartShopping, faCircleUser)

export default {
    data() {
        return {
            isMenuOpen: false,
            isLoggedIn: false
        };
    }, created() {
        this.checkLoginStatus();
        this.getUserName();
    }, components: {
        FontAwesomeIcon
    },
    methods: {
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
                console.log('User name:', this.userName);  // ตรวจสอบชื่อผู้ใช้ที่ดึงมา
            }
        }, logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.isLoggedIn = false;
            this.userName = '';
            window.location.href = '/';
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
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

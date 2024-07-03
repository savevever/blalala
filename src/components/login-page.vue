<template>
    <div id="login-form" class="login-page">
        <div class="form-box">
            <div class="title">
                <h2>Log In</h2>
            </div>
            <div class="msg-box " v-if="messages.success_msg">
                <div class="msg success">{{ messages.success_msg }}</div>
            </div>
            <div class="msg-box" v-if="messages.error">
                <div class="msg">{{ messages.error }}</div>
            </div>
            <form @submit.prevent="login" class="input-group-login">
                <div class="user-box">
                    <input type="email" v-model="email" class="input-field" required />
                    <label>Email</label>
                </div>
                <div class="user-box">
                    <input type="password" v-model="password" class="input-field" required />
                    <label>Enter Password</label>
                </div>
                <div class="login-register">
                    <a href="/users/register" class="formregister">Register</a>
                </div>
                <button type="submit" class="submit-btn">Log in</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: '',
            password: '',
            messages: {
                success_msg: '',
                error: ''
            },
            isLoggedIn: false
        };
    },
    methods: {
        login() {
            axios.post('http://localhost:8081/users/login', {
                email: this.email,
                password: this.password
            })
                .then(response => {
                    const data = response.data;
                    if (response.status === 200) {
                        this.messages.success_msg = data.message;
                        this.messages.error = '';
                        this.isLoggedIn = true;
                        localStorage.setItem('isLoggedIn', true)
                        localStorage.setItem('user', JSON.stringify(data.user));
                        window.location.href = 'http://localhost:8080/';
                    } else {
                        this.messages.error = data.message;
                        this.messages.success_msg = '';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.messages.error = 'An error occurred. Please try again.';
                    this.messages.success_msg = '';
                });
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
/* .login-page {
    background-color: #ffffff;
} */

.form-box {
    width: 380px;
    height: 480px;
    margin: 2% auto;
    background: #d7d7d7;
    padding: 10px;
    border-radius: 25px;
}

.title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.msg-box {
    width: 80%;
    margin: auto;
    text-align: center;
}

.msg {
    padding: 10px;
    color: black;
    background-color: #fa7070;
    /* background-color: #2cb856; */
    font-size: 12px;
    border-radius: 10px;
}

.user-box {
    position: relative;
}

.input-field {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
}

.input-group-login .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 15px 0;
    font-size: 16px;
    color: #333333;
    transition: 0.5s;
}

.input-group-login .user-box input:focus~label,
.input-group-login .user-box input:valid~label {
    top: -25px;
    color: #6c22a6;
    font-size: 13px;
}

.submit-btn {
    width: 85%;
    padding: 10px 30px;
    cursor: pointer;
    display: block;
    margin: auto;
    background: #f8f0e5;
    border: 0;
    border-radius: 30px;
}

.submit-btn:hover {
    background: #b2a59b;
    color: white;
}

.login-register {
    text-align: center;
}

.login-register a {
    color: #044d0d;
    font-size: 16px;
    font-style: italic;
    text-decoration: none;
}

.login-register a:hover {
    text-decoration: underline;
}
.success{
    background-color: #2cb856;
}
</style>

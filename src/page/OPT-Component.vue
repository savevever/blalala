<template>
    <div class="otp-container">
        <h2>Verify OTP</h2>
        
        <!-- Step 1: Input email -->
        <div v-if="!emailEntered">
            <form @submit.prevent="enterEmail">
                <div class="input-group">
                    <label for="email">Enter Email:</label>
                    <input type="email" id="email" v-model="email" required />
                </div>
                <button type="submit">Submit Email</button>
                <p v-if="message" :class="messageType">{{ message }}</p>
            </form>
        </div>

        <!-- Step 2: Send OTP -->
        <div v-else-if="!otpSent">
            <button @click="sendOtp">Send OTP</button>
        </div>

        <!-- Step 3: Verify OTP -->
        <div v-else-if="!otpVerified">
            <form @submit.prevent="verifyOtp">
                <div class="input-group">
                    <label for="otp">Enter OTP:</label>
                    <input type="text" id="otp" v-model="otp" required />
                </div>
                <button type="submit">Verify OTP</button>
                <p v-if="message" :class="messageType">{{ message }}</p>
            </form>
        </div>

        <!-- Step 4: Update Password -->
        <div v-else>
            <form @submit.prevent="submitPassword">
                <div class="input-group">
                    <label for="password">New Password:</label>
                    <input type="password" id="password" v-model="password" required />
                </div>
                <div class="input-group">
                    <label for="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword" required />
                </div>
                <button type="submit">Submit Password</button>
                <p v-if="message" :class="messageType">{{ message }}</p>
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
            otp: '',
            password: '',
            confirmPassword: '',
            message: '',
            messageType: '',
            emailEntered: false,
            otpSent: false,
            otpVerified: false
        };
    },
    methods: {
        // Method to enter email
        enterEmail() {
            if (this.email) {
                this.emailEntered = true;
            } else {
                this.message = 'Please enter a valid email.';
                this.messageType = 'error';
            }
        },

        // Method to send OTP
        async sendOtp() {
            try {
                await axios.post('http://localhost:8081/users/forgotpassword', { email: this.email });

                this.message = 'OTP sent successfully. Please check your email.';
                this.messageType = 'success';
                this.otpSent = true;

            } catch (error) {
                this.message = error.response.data.message || 'Error sending OTP';
                this.messageType = 'error';
            }
        },

        // Method to verify OTP
        async verifyOtp() {
            try {
                const OTP = parseInt(this.otp);
                const productData = {
                    email: this.email,
                    OTP: OTP,
                };
                const response = await axios.post('http://localhost:8081/users/forgotpassword', productData);
                this.message = response.data.message;
                this.messageType = 'success';
                console.log("success");
                this.otpVerified = true;

            } catch (error) {
                this.message = error.response.data.message || 'Error verifying OTP';
                this.messageType = 'error';
            }
        },

        // Method to submit password
        async submitPassword() {
            if (this.password !== this.confirmPassword) {
                this.message = "Passwords do not match";
                this.messageType = "error";
                return;
            }

            try {
                const passwordData = {
                    email: this.email,
                    password: this.password,
                    confirmPassword: this.confirmPassword,
                };
                const response = await axios.put('http://localhost:8081/users/updatepassword', passwordData);
                
                this.message = response.data.message;
                this.messageType = 'success';

            } catch (error) {
                this.message = error.response.data.message || 'Error updating password';
                this.messageType = 'error';
            }
        }
    },
};
</script>




<style scoped>
.otp-container {
    width: 300px;
    margin: auto;
}

.input-group {
    margin-bottom: 20px;
}

.success {
    color: green;
}

.error {
    color: red;
}
</style>
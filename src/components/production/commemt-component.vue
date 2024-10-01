<template>
    <div id="container">
        <div id="comment-container">
            <h1>แสดงความคิดเห็น</h1>
            <div class="comment" v-for="(comment, index) in comments" :key="index">
                <img src="../../assets/1.png" alt="Comment Image">
                <div class="comment-right">
                    <h3>{{ comment.nameProduct }}</h3>
                    <p id="date">{{ formatDate(comment.createdAt) }}</p>
                    <p id="comment-text">{{ comment.detail }}</p>

                    <div class="star-container">
                        <div class="star-widget">
                            <!-- ตรวจสอบว่าค่า star เป็น 5 หรือไม่ -->
                            <!-- <input v-if="comment.star === '5'" type="radio" name="rate-{{ index }}" id="rate-5-{{ index }}" v-model="comment.star" value="5"> -->
                            <label v-if="comment.star === '5'" for="rate-5"><font-awesome-icon :icon="['fas', 'star']" /></label>

                            <!-- ตรวจสอบว่าค่า star เป็น 4 หรือไม่ -->
                            <!-- <input v-if="comment.star === '4'" type="radio" name="rate-{{ index }}" id="rate-4-{{ index }}" v-model="comment.star" value="4"> -->
                            <label v-if="comment.star === '4'" for="rate-4"><font-awesome-icon :icon="['fas', 'star']" /></label>

                            <!-- ตรวจสอบว่าค่า star เป็น 3 หรือไม่ -->
                            <!-- <input v-if="comment.star === '3'" type="radio" name="rate-{{ index }}" id="rate-3-{{ index }}" v-model="comment.star" value="3"> -->
                            <label v-if="comment.star === '3'" for="rate-3-{{ index }}"><font-awesome-icon :icon="['fas', 'star']" /></label>

                            <!-- ตรวจสอบว่าค่า star เป็น 2 หรือไม่ -->
                            <!-- <input v-if="comment.star === '2'" type="radio" name="rate-{{ index }}" id="rate-2-{{ index }}" v-model="comment.star" value="2"> -->
                            <label v-if="comment.star === '2'" for="rate-2-{{ index }}"><font-awesome-icon :icon="['fas', 'star']" /></label>

                            <!-- ตรวจสอบว่าค่า star เป็น 1 หรือไม่ -->
                            <!-- <input v-if="comment.star === '1'" type="radio" name="rate-{{ index }}" id="rate-1-{{ index }}" v-model="comment.star" value="1"> -->
                            <label v-if="comment.star === '1'" for="rate-1-{{ index }}"><font-awesome-icon :icon="['fas', 'star']" /></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { faImage, faStar } from '@fortawesome/free-solid-svg-icons'
library.add(faImage, faStar)
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            comments: [], 
        };
    },
    async mounted() {
        await this.loadComment();
    },
    methods: {
        async loadComment() {
            try {
                const response = await axios.get('http://localhost:8081/products/getComments', {
                    params: { shopId: this.shopId } // ส่ง shopId เป็น query parameter
                });
                this.comments = response.data; // เก็บข้อมูลคอมเมนต์ใน array
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
    },
};
</script>


<style scoped>
#container {
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
}

#comment-container {
    width: 1200px;
    /* margin-right: 60px; */
    background-color: rgb(255, 255, 255);
    margin-bottom: 30px;
    padding: 20px 50px 20px 50px;
}

.comment {
    background-color: rgb(234, 240, 238);
    display: flex;
    width: 100%;
    height: 120px;
    margin-top: 10px;
    align-items: center;
}

.comment img {
    height: 65px;
    width: 65px;
    border-radius: 40px;
    margin: 0 20px 0 20px;
}

.comment-right {
    display: flex;
    flex-direction: column;
    /* gap: 0.5rem; */
}
.comment-right p {
    margin: 0;
}
.comment-right h3 {
    margin: 0;
}
#comment-text {
    font-size: 16px;
}

#date {
    font-size: 12px;
    color: rgb(87, 86, 86);
}
</style>
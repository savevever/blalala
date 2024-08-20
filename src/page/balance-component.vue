<template>
    <div>
        <h1>โปรไฟล์ผู้ใช้</h1>
        <p>ชื่อ: {{ user.name }}</p>
        <p>ยอดเงินสมมุติ: {{ user.balance }} บาท</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            user: (state) => state.user(1) 
        })
    }
};
</script>

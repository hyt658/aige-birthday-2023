<template>
    <div id="title">
        <h1>超可爱的祝福快来看!!</h1>
        <h2>by 天海言言</h2>
    </div>
    <div id="content">
        <video controls :poster="Poster" :src="MaidVideo" alt="言言的祝福视频(?)"></video>
    </div>
    <div id="close-btn" @click="emit('closeProject')">关闭</div>
</template>


<script lang="ts" setup>
import Poster from "@/assets/video/video_poster.jpg";
import MaidVideo from "@/assets/video/maid_blessing.mp4";

const emit = defineEmits(["closeProject"]);
</script>


<style lang="scss" scoped>
#title {
    text-align: center;
    padding: 20px 0;
    background-color: #f7f7f7;
    border-bottom: 2px solid #e0e0e0;
    font-family: "zhanku";

    h1 {
        font-size: 2em;
        color: #333;
        margin-bottom: 10px;
    }

    h2 {
        font-size: 1.5em;
        color: #777;
    }
}

#content {
    text-align: center;
    padding: 30px 20px;  // 增加了上下的间距
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: "zhanku";

    video {
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
}

#close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #d1bce3;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    color: white;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: "zhanku";

    &:hover {
        background-color: #bfa2d0;
    }
}
</style>

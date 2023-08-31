<template>
    <div id="content">
        <h1>什么,是新的MC视频?!</h1>
        <h2>by hyt658</h2>
        <video controls :poster="Poster" :src="MCVideo" alt="hyt的MC视频"></video>
    </div>
    <div id="close-btn" @click="emit('closeProject')">关闭</div>
</template>


<script lang="ts" setup>
import Poster from "@/assets/video/video_poster.jpg";
import MCVideo from "@/assets/video/minecraft.mp4";

const emit = defineEmits(["closeProject"]);
</script>


<style lang="scss" scoped>
#content {
    text-align: center;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: "zhanku";

    h1 {
        font-size: 2em;
        color: #333;
    }

    h2 {
        font-size: 1.5em;
        color: #555;
        margin-bottom: 30px;
    }

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

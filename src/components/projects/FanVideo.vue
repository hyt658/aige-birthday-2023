<template>
    <div id="title">
        <h1>宠鸽会的整活节目</h1>
        <h2>（可能会被创死，但请好好看完(〜￣△￣)〜）</h2>
    </div>
    <div id="content">
        <span>请选择要看的视频（推荐全屏哦）：</span>
        <ul>
            <li @click="changeVideoSrc('1')">1</li>
            <li @click="changeVideoSrc('2')">2</li>
            <li @click="changeVideoSrc('3')">3</li>
        </ul>
        <video :src=videoSrc :alt=videoAlt></video>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const videoSrc = ref("");
const videoAlt = ref("");
const allVideos: {[key: string]: string} = {

};

function changeVideoSrc(video: string) {
    videoSrc.value = allVideos[video];
    videoAlt.value = video + "的视频";
}

</script>


<style lang="scss">
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
    padding: 15px 30px 30px;
    background-color: #fafafa;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: "zhanku";
    font-size: 1.4em;

    ul {
        list-style-type: none;
        margin-top: 10px;
        margin-bottom: 20px;
        padding-left: 0;

        li {
            color: #555;
            margin-top: 10px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 5px;
        }
    }

    video {
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
}
</style>

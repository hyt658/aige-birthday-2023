<template>
    <div id="title">
        <h1>宠鸽会的节目</h1>
        <h2>（注：清酒和言言的类似，但是有不同哦，鸽宝要仔细看！）</h2>
    </div>
    <div id="close-btn" @click="emit('closeProject')">关闭</div>
    <div id="content">
        <span>请选择要看的视频：</span>
        <ul>
            <li @click="changeVideoSrc('qingJiu')">
                <a href="#video">清酒的视频</a>
            </li>
            <li @click="changeVideoSrc('yanYan')">
                <a href="#video">言言的视频</a>
            </li>
            <li @click="changeVideoSrc('xiaMeng')">
                <a href="#video">夏梦的视频</a>
            </li>
        </ul>
        <video id="video" controls :poster="Poster" 
            :src=videoSrc :alt=videoAlt></video>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import Poster from "@/assets/video/video_poster.jpg";
import CelebrateQingJiu from "@/assets/video/celebrate_qing_jiu.mp4";
import CelebrateYanYan from "@/assets/video/celebrate_yan_yan.mp4";
import DanceXiaMeng from "@/assets/video/dance_xia_meng.mp4";

const emit = defineEmits(["closeProject"]);
const videoSrc = ref("");
const videoAlt = ref("");
const allVideos: {[key: string]: string} = {
    qingJiu: CelebrateQingJiu,
    yanYan: CelebrateYanYan,
    xiaMeng: DanceXiaMeng
};

function changeVideoSrc(video: string) {
    videoSrc.value = allVideos[video];
    videoAlt.value = video + "的视频";
}

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

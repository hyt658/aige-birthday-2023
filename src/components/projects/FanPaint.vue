<template>
    <div id="title">
        <h1>生日贺图</h1>
    </div>
    <div id="content">
        <div id="item" v-for="image in images" :key="image.id"
            @click="openImage(image.src)">
            <img :src="image.src" :alt="image.alt" />
            <div id="author">{{ image.author }}</div>
        </div>
    </div>
    <div v-if="selectedImage" id="image-modal" @click="closeImage">
        <img :src="selectedImage" />
    </div>
    <div id="close-btn" @click="emit('closeProject')">关闭</div>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import Hyt658 from "@/assets/images/fan_paint/hyt658.png";
import YanYan from "@/assets/images/fan_paint/yanyan.png";
import PaiDaGe from "@/assets/images/fan_paint/pai_da_ge.jpg";
import AiGe from "@/assets/images/fan_paint/ai_ge.jpg";
import QingJiu from "@/assets/images/fan_paint/qingjiu.png";
import DaoZhu from "@/assets/images/fan_paint/daozhu.png";

const emit = defineEmits(["closeProject"]);
const selectedImage = ref("");
const images = [
    { id: 1, src: Hyt658, alt: "hyt658的贺图", author: "hyt658" },
    { id: 2, src: YanYan, alt: "言言的贺图", author: "言言" },
    { id: 3, src: PaiDaGe, alt: "言言做的派大鸽", author: "言言" },
    { id: 4, src: AiGe, alt: "言言做的艾鸽", author: "言言" },
    { id: 5, src: QingJiu, alt: "清酒的贺图", author: "清酒" }, 
    { id: 6, src: DaoZhu, alt: "岛主的贺图", author: "岛主" }
];

function openImage(src: string) {
    selectedImage.value = src;
}

function closeImage() {
    selectedImage.value = '';
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 20px;

    #item {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        background-color: #fff;
        height: 200px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
            transition: transform 0.3s ease;
        }

        &:hover img {
            transform: scale(1.1);
        }

        #author {
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 5px;
            font-size: 0.8em;
            width: 100%;
            text-align: center;
        }
    }
}

#image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 90%;
        max-height: 90%;
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

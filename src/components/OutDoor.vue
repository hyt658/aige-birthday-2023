<template> 
    <img draggable="false" id="doorClose" src="@/assets/images/door/doorClose.jpg" 
        alt="艾鸽的房门" @click.once="openDoor" v-show="doorState !== 'open'" />
    <img draggable="false" id="doorOpen" src="@/assets/images/door/doorOpen.jpg" 
        alt="艾鸽的房门（开）" v-show="doorState !== 'close'"/> 

    <div id="dialog" class="dialog" @click.once="openDoor">
        <img draggable="false" id="dialogBox" src="@/assets/images/dialog/dialog-aige.png" />
        <div id="speak">好累啊，终于忙完了。赶紧开门回家吧！</div>
    </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import anime from "animejs";

const doorState = ref("close");
const emit = defineEmits<{(e: "changeStage"): void}>();

function openDoor(): void {
    const animationTime = 1200;

    // 允许两张图同时存在来做开门转换动画
    doorState.value = "opening";

    // 动画结束后才更改状态
    setTimeout(() => {
        doorState.value = "open";
    }, animationTime);

    // 开门（切图）和对话框动画
    anime.timeline({}).add({
        targets: "#dialog",
        opacity: 0,
        duration: animationTime,
        easing: "easeOutExpo",
    }, 0).add({
        targets: "#doorClose",
        opacity: 0,
        duration: animationTime,
        easing: "easeOutExpo",
    }, 0).add({
        targets: "#doorOpen",
        opacity: 1,
        duration: animationTime,
        easing: "easeOutExpo",
        complete: () => { enterRoom(); }
    }, 0);
}

function enterRoom(): void {
    // 进门，关灯
    anime.timeline({}).add({
        targets: "#doorOpen",
        scale: 10,
        filter: ["brightness(100%)", "brightness(0%)"],
        duration: 2000,
        easing: "easeInOutQuad",
        complete: () => {
            // 进入party阶段，1.2s作为缓冲
            setTimeout(() => { 
                emit("changeStage"); 
            }, 1200);
        }
    }, 0);
}
</script>


<style lang="scss" scoped>
#doorClose {
    position: absolute;
}

#doorOpen {
    position: absolute;
    opacity: 0;
}
</style>

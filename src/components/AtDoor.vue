<template>
    <img draggable="false" id="room" src="@/assets/images/room.jpg" alt="艾鸽的房间" v-show="dialogState >= 4" />

    <div id="aige-dialog" class="dialog" @click="confettiSuprise" v-show="dialogState <= 2">
        <img draggable="false" id="dialogBox" src="@/assets/images/dialog-aige.png" alt="艾鸽的对话框" />
        <div id="speak">嗯？好黑啊，我记得我没有把所有灯都关上呀？让我找找开关在哪...</div>
    </div>
    <div id="unknown-dialog" class="dialog" v-show="(2 <= dialogState)&&(dialogState <= 4)">
        <img draggable="false" id="dialogBox" src="@/assets/images/dialog-unknown.png" alt="未知的对话框" />
        <div id="speak">{{ message }}</div>
    </div>
    <div id="fans-dialog" class="dialog" @click="enterParty" v-show="dialogState >= 4">
        <img draggable="false" id="dialogBox" src="@/assets/images/dialog-fans.png" alt="宠鸽会的对话框" />
        <div id="speak">鸽宝，生日快乐！！</div>
    </div>
</template>
  

<script setup lang="ts">
import { ref } from "vue";
import anime from "animejs";
import confetti from "canvas-confetti"

// dialogState:
//  1. aige-dialog
//  2. aige-dialog过渡unknown-dialog
//  3. unknown-dialog
//  4. unknown-dialog过渡fans-dialog
//  5. fans-dialog
const dialogState = ref(1);
const message = ref("预备... ");
const color = defineProps<{originBackground: string}>();
const emit = defineEmits<{(e: "changeStage"): void}>();

let countDown = 3;
let allowClick = false;

function dialogAnimation(curr: string, next: string): void {
    const animationTime = 800;

    // 允许两张图同时存在来做开门转换动画
    dialogState.value += 1

    // 动画结束后更新状态
    setTimeout(() => {
        dialogState.value += 1
    }, animationTime);

    anime.timeline({}).add({
        targets: curr,
        opacity: 0,
        duration: animationTime,
        easing: "easeOutExpo",
    }, 0).add({
        targets: next,
        opacity: 1,
        duration: animationTime,
        easing: "easeOutExpo",
    }, 0);
}

function confettiSuprise() {
    let intervelEachCount = 1200;
    dialogAnimation("#aige-dialog", "#unknown-dialog");

    // 对话框开始倒数
    const clock = setInterval(() => {
        if (countDown === 0) {
            // 展示祝生快消息，放礼炮
            dialogAnimation("#unknown-dialog", "#fans-dialog");
            shootConfetti()

            // 展示后5秒内点击消息框会无效
            setTimeout(() => {
                allowClick = true;
            }, 5000);

            // 结束倒数
            clearInterval(clock);
        } else {
            message.value += `${countDown}... `;
        }
        countDown -= 1;
    }, intervelEachCount);
}

function shootConfetti() {
    const adjust_degree = 5;
    let left_angle = 60;
    let right_angke = 120;

    // 开灯，恢复背景色
    document.body.style.background = color.originBackground;

    // 发射礼炮（数组代表y轴高度的百分比）
    for (let y_loc of [0.25, 0.375, 0.5, 0.625, 0.75]) {
        // 左侧礼炮
        confetti({
            particleCount: 200,
            angle: left_angle,
            spread: 55,
            origin: { x: 0, y: y_loc }
        });

        // 右侧礼炮
        confetti({
            particleCount: 200,
            angle: right_angke,
            spread: 55,
            origin: { x: 1, y: y_loc }
        });

        left_angle -= adjust_degree;
        right_angke += adjust_degree;
    }
}

function enterParty() {
    if (allowClick) {
        // 对话框淡出
        anime.timeline({}).add({
            targets: "#fans-dialog",
            opacity: 0,
            duration: 1500,
            easing: "easeOutExpo",
            complete: () => {
                // 进入party
                emit("changeStage");
            }
        }, 0);
    }
}
</script>


<style lang="scss" scoped>
#room {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

#unknown-dialog,
#fans-dialog {
    opacity: 0;
}
</style>
  
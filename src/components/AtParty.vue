<template>
    <div id="overlay" v-show="stage < 4"></div>

    <div id="party"></div>
    <v-dialog id="projects" v-model="isProjectOpen" maxWidth="700">
        <v-card id="cards">
            <AllCredit v-if="project === 'credit'" />
            <FanPaint v-else-if="project === 'paint'" />
            <FanVideo v-else-if="project === 'television'" />
            <MaidVideo v-else-if="project === 'maid_video'" />
            <MCVideo v-else-if="project === 'minecraft'" />
            <QuestList v-else-if="project === 'quests'" @closeProject="isProjectOpen = false"
                @readyToBlowCandels="readyToBlowCandels" />
        </v-card>
    </v-dialog>

    <div id="aige-dialog" class="dialog" @click="confettiSuprise" v-show="stage <= 2">
        <img draggable="false" id="dialogBox" src="@/assets/images/dialog/dialog-aige.png" alt="艾鸽的对话框" />
        <div id="speak">嗯？好黑啊，我记得我没有把所有灯都关上呀？让我找找开关在哪...</div>
    </div>
    <div id="unknown-dialog" class="dialog" v-show="(2 <= stage)&&(stage <= 4)">
        <img draggable="false" id="dialogBox" src="@/assets/images/dialog/dialog-unknown.png" alt="未知的对话框" />
        <div id="speak">{{ message }}</div>
    </div>
    <div id="fans-dialog" class="dialog" @click="enterParty" v-show="stage >= 4">
        <img draggable="false" id="dialogBox" src="@/assets/images/dialog/dialog-fans.png" alt="宠鸽会的对话框" />
        <div id="speak">鸽宝，生日快乐！！</div>
    </div>
</template>
  

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import anime from "animejs";
import shootConfetti from "@/party/confetti"; 
import { PartyScene } from "@/party";

import AllCredit from "@/components/projects/AllCredits.vue";
import FanPaint from "@/components/projects/FanPaint.vue";
import FanVideo from "@/components/projects/FanVideo.vue";
import MaidVideo from "@/components/projects/MaidVideo.vue";
import MCVideo from "@/components/projects/MCVideo.vue";
import QuestList from "@/components/projects/QuestList.vue";

// stage (change in dialogAnimation):
//  1. aige-dialog
//  2. aige-dialog过渡unknown-dialog
//  3. unknown-dialog
//  4. unknown-dialog过渡fans-dialog
//  5. fans-dialog
const stage = ref(6);   // DEBUG
const message = ref("预备... ");
const isProjectOpen = ref(false);
const project = ref("none");

let countDown = 3;
let allowClick = false;
let partyScene: PartyScene;
let partyGame: Phaser.Game;

function dialogAnimation(curr: string, next: string): void {
    const animationTime = 800;

    // 允许两张图同时存在来做转换动画
    stage.value += 1;

    // 动画结束后更新状态
    setTimeout(() => {
        stage.value += 1;
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
            shootConfetti();

            // 展示后3.5秒内点击消息框会无效
            setTimeout(() => {
                allowClick = true;
            }, 3500);

            // 结束倒数
            clearInterval(clock);
        } else {
            message.value += `${countDown}... `;
        }
        countDown -= 1;
    }, intervelEachCount);
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
                partyGame.input.enabled = true;
            }
        }, 0);
    }
}

function readyToBlowCandels() {
    partyScene.readyToBlowCandels();
    isProjectOpen.value = false;
}

onMounted(() => {
    partyScene = new PartyScene({key: "party"});
    partyGame = new Phaser.Game({
        type: Phaser.AUTO,
        parent: "party",
        fullscreenTarget: "app",
        disableContextMenu: true,
        scale: { 
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 2531,
            height: 1488,
        },
        backgroundColor: Phaser.Display.Color.RGBStringToColor("rgb(234, 220, 255)").color,
        scene: partyScene,
        callbacks: {
            postBoot: () => {
                // 此处接收partyScene中元素点击事件
                partyScene.events.on("openProject", (clickedProject: string) => {
                    project.value = clickedProject;
                    isProjectOpen.value = true;
                });
            }
        }
    });

    // 刚开始禁止互动，等过完对话后允许
    // partyGame.input.enabled = false;   DEBUG
});

// 没有project窗口打开的时候通知Phaser恢复游戏互动
watch(isProjectOpen, (newVal) => {
    if (newVal === false) {
        partyScene.backToGame();
    }
});
</script>


<style lang="scss" scoped>
#overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 1000;
}

#unknown-dialog,
#fans-dialog {
    opacity: 0;
}
</style>
  
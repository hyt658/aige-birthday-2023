<template>
    <div id="party"></div>
</template>


<script setup lang="ts">
import Phaser from 'phaser';
import { onMounted } from 'vue';

import RoomImg from "@/assets/images/room.jpg"

class Party extends Phaser.Scene {
    preload() {
        this.load.image("room", RoomImg)
    }

    create() {
        const { width, height } = this.sys.game.canvas;
        const centerX = width / 2;
        const centerY = height / 2;

        this.add.image(centerX, centerY, "room")
    }
}

onMounted(() => {
    const party = new Party({key: "party"});

    new Phaser.Game({
        type: Phaser.AUTO,
        parent: "party",
        fullscreenTarget: "app",
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            // width: 1920,
            // height: 937,
        },
        backgroundColor: Phaser.Display.Color.RGBStringToColor("rgb(116, 116, 170)").color,
        scene: party
    });
});
</script>


<style lang="scss">

</style>

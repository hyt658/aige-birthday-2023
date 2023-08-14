<template>
    <div id="AtBgein" class="stage" v-if="currStage === 'outdoor'">
        <AtBegin @changeStage="changeStage" />
    </div>
    <div id="AtDoor" class="stage" v-else>
        <AtDoor />
    </div>
</template>


<script setup lang="ts">
import { ref } from "vue"
import AtBegin from "@/components/OutDoor.vue";
import AtDoor from "@/components/AtParty.vue";

const currStage = ref("outdoor");

function changeStage(): void {
    currStage.value = "party"
}
</script>


<style lang="scss">
@font-face {
    font-family: 'zhanku';
    src: url("@/assets/fonts/zhanku.ttf");
}

html {
    overflow: hidden;
    scrollbar-width: none;
}

body {
    margin: 0px;
    background: rgb(116, 116, 170);
    user-select: none;
}

.stage {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100vh;
    width: 100vw;
}

.dialog {
    display: flex;
    position: absolute;
    bottom: 0;
    margin-left: -20px;
    max-height: 25%;
    z-index: 2000;

    img {
        display: block;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    div {
        position: absolute;
        top: 40%; left: 10%;
        width: 85%; height: 45%;
        max-width: 100%;
        max-height: 100%;
        
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-family: "zhanku", sans-serif;
        font-size: 140%;

        border: none;
        background: transparent;
        overflow: hidden;
        user-select: none;
    }
}
</style>

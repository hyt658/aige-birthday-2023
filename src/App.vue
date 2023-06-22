<template>
    <div id="AtBgein" class="stage" v-if="currStage === 'atBegin'">
        <AtBegin @changeStage="changeStage" />
    </div>
    <div id="AtDoor" class="stage" v-else-if="currStage === 'atDoor'">
        <AtDoor @changeStage="changeStage" :originBackground="originBackground" />
    </div>
    <div id="AtParty" class="stage" v-else>
        <AtParty @changeStage="changeStage" />
    </div>
</template>


<script setup lang="ts">
import { ref } from "vue"
import AtBegin from "@/components/AtBegin.vue";
import AtDoor from "@/components/AtDoor.vue";
import AtParty from "@/components/AtParty.vue";

let idx = 0;
const stages = ["atBegin", "atDoor", "atParty"];

const currStage = ref(stages[idx]);
const originBackground = "rgb(116, 116, 170)"

function changeStage(): void {
    if (idx < 2) {
        idx += 1;
        currStage.value = stages[idx]
    }
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

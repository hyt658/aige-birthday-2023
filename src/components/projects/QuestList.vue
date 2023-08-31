<template>
<div id="QuestsList">
    <div id="title">
        <h1>要完成的任务</h1>
        <h2>完成所有任务后有特殊场景哦，记得回来查看！</h2>
    </div>
    <div id="content">
        <ul>
            <li v-for="(value, project) in questStatus" :key="project">
                <input type="checkbox" :checked="value" onclick="return false"/>
                <span>{{ questDesciption[project] }}</span>
            </li>
        </ul>
    </div>
    <div id="finish" v-if="checked">
        恭喜你完成所有任务，准备吹蜡烛吧！
    </div>
    <button id="close-btn" class="close-button" 
        @click="emit('closeProject')" v-if="!checked">关闭</button>
    <button id="blow-candel" class="close-button" 
        @click.once="emit('readyToBlowCandels')" v-else>吹蜡烛</button>
</div>
</template>


<script setup lang="ts">
import { questStatus } from "@/party";

const emit = defineEmits(["closeProject", "readyToBlowCandels"]);
const checked = Object.values(questStatus).every(value => value);
const questDesciption: {[key: string]: string} = {
    radio: "尝试更换BGM",
    paint: "查看宠鸽会的生日贺图",
    maidVideo: "观看祝福+贺词视频",
    television: "看电视",
    minecraft: "查看桌上的草方块",
    credit: "查看鸣谢名单"
};
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
    padding: 20px;
    background-color: #fff;
    font-family: "zhanku";

    ul {
        list-style-type: none;
        padding: 0;

        li {
            display: flex;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;

            &:last-child {
                border-bottom: none;
            }

            input[type="checkbox"] {
                margin-right: 10px;
            }

            span {
                font-size: 1.2em;
            }
        }
    }
}

#finish {
    text-align: center;
    font-size: 1.5em;
    font-family: "zhanku";
}

.close-button {
    font-family: "zhanku";
    display: block;
    width: calc(100% - 40px);
    margin: 20px auto;
    padding: 10px 0;
    text-align: center;
    background-color: #d1bce3;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #bfa2d0;
    }
}
</style>

<template>
<div id="QuestsList">
    <div class="title">
        <h1>要完成的事件</h1>
        <h2>完成所有事件后有特殊事件哦，记得回来查看！</h2>
    </div>
    <div class="content">
        <ul>
            <li v-for="(value, project) in questStatus" :key="project">
                <input type="checkbox" :checked="value" onclick="return false"/>
                <span>{{ questDesciption[project] }}</span>
            </li>
        </ul>
    </div>
    <button class="close-button" @click="emit('closeProject')">关闭</button>
</div>
</template>


<script setup lang="ts">
defineProps({questStatus: Object});
const emit = defineEmits(["closeProject"]);
const questDesciption: {[key: string]: string} = {
    music: "尝试更换BGM",
    paint: "查看宠鸽会的生日贺图",
    maid_video: "观看祝福+贺词视频",
    television: "看电视",
    minecraft: "查看桌上的草方块",
    credit: "查看鸣谢名单"
};

</script>


<style lang="scss" scoped>
.title {
  text-align: center;
  padding: 20px 0;
  background-color: #f7f7f7;
  border-bottom: 2px solid #e0e0e0;

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

.content {
    padding: 20px;
    background-color: #fff;

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

.close-button {
    display: block;
    width: calc(100% - 40px); // 减去左右的边距
    margin: 20px auto;
    padding: 10px 0;
    text-align: center;
    background-color: #d1bce3; // 淡紫色背景
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #bfa2d0; // 深一点的紫色
    }
}
</style>

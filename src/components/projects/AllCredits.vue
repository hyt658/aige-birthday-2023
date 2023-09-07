<template>
    <div id="title">
        <h1>特别鸣谢</h1>
        <h2>感谢一下宠鸽会成员做出的贡献！（名次不分前后）</h2>
    </div>
    <div id="close-btn" @click="emit('closeProject')">关闭</div>
    <div id="content">
        <h3>女仆祝福视频</h3>
        <p>天海盐盐</p>
        <h3>绘画板</h3>
        <p>hyt658，天海盐盐，清酒墨玉，梦醉，岛主</p>
        <h3>Minecraft</h3>
        <p>hyt658</p>
        <h3>收音机音乐</h3>
        <p>江风</p>
        <h3>电视节目</h3>
        <p>hyt658，天海盐盐，清酒墨玉，夏梦</p>
        <h3>生日歌合唱</h3>
        <p>hyt658, 夏泉一郎，天海盐盐，清酒墨玉，夏梦，熏秧，口袋尼，梦醉</p>
        <h3>本网页</h3>
        <p>hyt658</p>
    </div>
</template>


<script lang="ts" setup>
const emit = defineEmits(["closeProject"]);
</script>


<style lang="scss" scoped>
#title {
    text-align: center;
    padding: 20px 0;
    background-color: #f7f7f7;
    border-bottom: 2px solid #e0e0e0;
    font-family: "zhanku";

    h1 {
        font-size: 2.5em;
        color: #333;
        margin-bottom: 10px;
    }

    h2 {
        font-size: 1.5em;
        color: #666;
    }
}

#content {
    padding: 20px 40px 40px;
    font-family: "zhanku";

    h3 {
        font-size: 1.8em;
        color: #a569bd;
        border-bottom: 1px solid #ddd;
        margin-top: 20px;
        padding-bottom: 10px;
    }

    p {
        font-size: 1.2em;
        color: #555;
        margin-top: 20px;
        line-height: 1.5;
    }

    ul {
        list-style-type: disc;
        margin-top: 20px;
        padding-left: 40px;

        li {
        font-size: 1.2em;
        color: #555;
        margin-top: 10px;
        }
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

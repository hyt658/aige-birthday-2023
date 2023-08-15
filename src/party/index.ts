import Phaser from 'phaser';
import all_elements from "./elements";

import AigeImg from "@/assets/images/room/aige.png";
import BedImg from "@/assets/images/room/bed.png";
import CakeImg from "@/assets/images/room/cake.png";
import CalenderImg from "@/assets/images/room/calender.png";
import FufuImg from "@/assets/images/room/fufu.png";
import HBDTextImg from "@/assets/images/room/happy_birthday_text.png";
import MCImg from "@/assets/images/room/minecraft.png";
import PaintImg from "@/assets/images/room/paint.png";
import RadioImg from "@/assets/images/room/radio.png";
import RoomImg from "@/assets/images/room/room.png";
import SofaImg from "@/assets/images/room/sofa.png";
import TableImg from "@/assets/images/room/table.png";
import TVImg from "@/assets/images/room/television.png";

class PartyScene extends Phaser.Scene {
    preload() {
        this.load.image("aige", AigeImg);
        this.load.image("bed", BedImg);
        this.load.image("cake", CakeImg);
        this.load.image("calender", CalenderImg);
        this.load.image("fufu", FufuImg);
        this.load.image("HBDtext", HBDTextImg);
        this.load.image("minecraft", MCImg);
        this.load.image("paint", PaintImg);
        this.load.image("radio", RadioImg);
        this.load.image("sofa", SofaImg);
        this.load.image("table", TableImg);
        this.load.image("television", TVImg);
        this.load.image("room", RoomImg);
    }

    create() {
        // 定义元素实例字典类型
        type instance_map = {[key: string]: {
            image: Phaser.GameObjects.Image,
            posX: number,
            posY: number
        }};

        const { width, height } = this.sys.game.canvas;
        const centerX = width / 2;
        const centerY = height / 2;
        const intensityX = 0.008;
        const intensityY = 0.004;
        const all_instances: instance_map = {};

        // 填充实例字典
        Object.entries(all_elements).forEach(([key, element]) => {
            const posX = centerX + element["dx"];
            const posY = centerY + element["dy"];
            const image = this.add.image(posX, posY, key).setScale(1.05);
            all_instances[key] = { image, posX, posY };
        });      

        // 场景随鼠标移动晃动
        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            const dx = pointer.x - centerX;
            const dy = pointer.y - centerY;
            Object.entries(all_elements).forEach(([key, element]) => {
                const { image, posX, posY } = all_instances[key];
                const skew = element["skew"];
                const newX = posX - (dx * skew * intensityX);
                const newY = posY - (dy * skew * intensityY);
                image.setPosition(newX, newY);
            });
        });
    }
}

export default PartyScene;

import Phaser from 'phaser';
import elements from "./elements";

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

type Image = Phaser.GameObjects.Image
type InstanceMap = {[key: string]: {
    image: Image,
    posX: number,
    posY: number,
    interactable: boolean
}};

export const questStatus: {[key: string]: boolean} = {
    music: false,
    paint: false,
    maid_video: false,
    television: false,
    minecraft: false,
    credit: false
};

export class PartyScene extends Phaser.Scene {
    blowingCandles = false;
    instances: InstanceMap = {};

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
        const { width, height } = this.sys.game.canvas;
        const centerX = width / 2;
        const centerY = height / 2;
        const intensityX = 0.008;
        const intensityY = 0.004;

        // 填充实例字典
        Object.entries(elements).forEach(([key, element]) => {
            const posX = centerX + element["dx"];
            const posY = centerY + element["dy"];
            const image = this.add.image(posX, posY, key).setScale(1.05);
            let interactable = false;
            if ("text" in element) {
                // 可交互的元素
                interactable = true;
                this.mouseHoverEvent(image, key, element["text"], posX, posY);
                this.mouseClickEvent(image, key);
            }
            this.instances[key] = { image, posX, posY, interactable };
        });      

        // 场景随鼠标移动晃动 
        this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            if (!this.blowingCandles) {
                const dx = pointer.x - centerX;
                const dy = pointer.y - centerY;
                Object.entries(elements).forEach(([key, element]) => {
                    const { image, posX, posY } = this.instances[key];
                    const skew = element["skew"];
                    const newX = posX - (dx * skew * intensityX);
                    const newY = posY - (dy * skew * intensityY);
                    image.setPosition(newX, newY);
                });
            }
        });
        
        // 烛光
        this.lights.setAmbientColor(0x0e0e0e);
        this.lights.addLight(width*0.494, height*0.55, 1000, 0xffdd88, 2);
        this.lights.addLight(width*0.494, height*0.55, 80, 0xffffff, 2);
        this.lights.addLight(width*0.468, height*0.56, 80, 0xffffff, 2);
        this.lights.addLight(width*0.523, height*0.56, 80, 0xffffff, 2);
    }

    mouseHoverEvent(image: Image, element: string, text: string, posX: number, posY: number) {
        const label = this.add.text(posX, posY, text, {
            fontFamily: "zhanku",
            fontSize: 50,
            color: "#FFFFFF",
            stroke: "#BF99FF",
            strokeThickness: 10,
        }).setOrigin(0.5, 0.5).setVisible(false);
        
        image.setInteractive({ pixelPerfect: true }).on("pointerover", () => {
            // 鼠标悬浮查看
            const doInteract = ((element === "cake" && this.blowingCandles) || 
                (element !== "cake" && !this.blowingCandles));
            if (doInteract) {
                image.setAngle((Math.random() * 3) - 1);
                label.setAngle((Math.random() * 11) - 5).setVisible(true);
            }
        }).on("pointerout", () => {
            // 挪开鼠标回复原状
            image.setAngle(0);
            label.setVisible(false);
        });
    }

    mouseClickEvent(image: Image, element: string) {
        image.setInteractive({ pixelPerfect: true }).on("pointerdown", () => {
            if (element !== "cake" && !this.blowingCandles) {
                // 吹蜡烛前，鼠标点击非蛋糕元素后发出Phaser事件，AtParty组件可以接收事件并进行相对应操作
                const elementToProject: {[key: string]: string} = {
                    radio: "music",
                    HBDtext: "maid_video",
                    paint: "paint",
                    calender: "quests",
                    television: "television",
                    fufu: "credit",
                    minecraft: "minecraft"
                };
                const project = elementToProject[element];

                // quest本身不计入questStatus中
                if (project !== "quests") { questStatus[project] = true; } 
                // 通知AtParty组件展示相对应的project子组件
                this.events.emit("elementClicked", project);
            } else if (element === "cake" && this.blowingCandles) {
                this.blowCandels();
            }
        });
    }

    // 当完成所有quest后，在QuestList中出现吹蜡烛按钮，点击那个按钮后进入吹蜡烛模式
    readyToBlowCandels() {
        this.blowingCandles = true;
        Object.values(this.instances).forEach(({ image, posX, posY }) => {
            // 开启光照效果
            image.setPipeline("Light2D");
            // 将所有样子恢复成挪开鼠标的状态
            image.emit("pointerout");
            // 重置所有元素的位置
            image.setPosition(posX, posY);
        });
        this.lights.enable();

    }

    // 吹蜡烛的时候，只能点击蛋糕，放生日歌，许愿，最后吹蜡烛
    blowCandels() {
        this.blowingCandles = false;
        Object.values(this.instances).forEach(({ image }) => {
            // 关闭光照效果
            image.setPipeline("MultiPipeline");
        });
        this.lights.enable();
    }
}


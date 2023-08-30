import Phaser from 'phaser';
import elements from "./elements";
import shootConfetti from "@/party/confetti";

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

import HaiDiLaoSong from "@/assets/audio/hai_di_lao.wav";
import BlowSound from "@/assets/audio/blow_sound.mp3";
import HBDSong from "@/assets/audio/birthday_song_sing.wav";
import HBDBgm from "@/assets/audio/birthday_song_bgm.wav";
import ConfettiSound from "@/assets/audio/confetti.mp3";
import JiangFengSong from "@/assets/audio/jiang_feng_song.aac";

type Image = Phaser.GameObjects.Image
type InstanceMap = {[key: string]: {
    image: Image,
    posX: number,
    posY: number,
    interactable: boolean
}};

export const questStatus: {[key: string]: boolean} = {
    radio: false,
    paint: false,
    maidVideo: false,
    television: false,
    minecraft: false,
    credit: false
};

export class PartyScene extends Phaser.Scene {
    blowingCandles = false;
    HBDSongDone = false;
    bgm = "haiDiLaoSong";
    instances: InstanceMap = {};

    preload() {
        this.load.image("aige", AigeImg);
        this.load.image("bed", BedImg);
        this.load.image("cake", CakeImg);
        this.load.image("quests", CalenderImg);
        this.load.image("credit", FufuImg);
        this.load.image("maidVideo", HBDTextImg);
        this.load.image("minecraft", MCImg);
        this.load.image("paint", PaintImg);
        this.load.image("radio", RadioImg);
        this.load.image("sofa", SofaImg);
        this.load.image("table", TableImg);
        this.load.image("television", TVImg);
        this.load.image("room", RoomImg);

        this.load.audio("haiDiLaoSong", HaiDiLaoSong);
        this.load.audio("blowSound", BlowSound);
        this.load.audio("HBDSong", HBDSong);
        this.load.audio("HBDBgm", HBDBgm);
        this.load.audio("confettiSound", ConfettiSound);
        this.load.audio("jiangFengSong", JiangFengSong);
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

        // 场景随鼠标移动晃动，使用document的监听是因为不喜欢v-dialog阻止phaser获取鼠标事件
        document.addEventListener("mousemove", (event: MouseEvent) => {
            const dx = event.clientX;
            const dy = event.clientY;
            
            if (!this.blowingCandles) {
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

        // 初始bgm
        this.sound.add(this.bgm).setVolume(0.3).setLoop(true).play();
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
            const doInteract = ((element !== "cake" && !this.blowingCandles) || 
                (element === "cake" && this.blowingCandles && this.HBDSongDone));
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
                // 吹蜡烛前，只能点击非蛋糕元素，记录是否被点击
                // quest本身不计入questStatus中
                if (element !== "quests") { 
                    questStatus[element] = true; 
                } 
                
                if (element !== "radio") {
                    // 点击非收音机元素通知AtParty组件展示相对应的project子组件
                    this.events.emit("openProject", element);
                    image.emit("pointerout");
                    // 展示子组件的时候禁用游戏输入
                    this.game.input.enabled = false;
                } else {
                    // 收音机元素
                    const currentBgm = this.sound.get(this.bgm);
                    const radioSong = this.sound.add("jiangFengSong").setVolume(0.4);

                    currentBgm.pause();
                    radioSong.play();
                    radioSong.on("complete", () => {
                        setTimeout(()=>{currentBgm.play();}, 1000);
                    });
                }

                // 查看视频project的话暂停bgm
                const vedioProjects = ["maidVideo", "television", "minecraft"];
                if (vedioProjects.indexOf(element) != -1) {
                    this.sound.get(this.bgm).pause();
                }
            } else if (element === "cake" && this.blowingCandles) {
                // 吹蜡烛的时候，等生日歌放完后，只能点击蛋糕来吹蜡烛
                if (this.HBDSongDone) {
                    this.blowCandels();
                }
            }
        });
    }

    backToGame() {
        // 恢复游戏输入互动
        this.game.input.enabled = true;
        // 继续播放bgm
        const currentBgm = this.sound.get(this.bgm);
        if (currentBgm.isPaused) {
            currentBgm.resume();
        }
    }

    // 当完成所有quest后，在QuestList中出现吹蜡烛按钮，点击那个按钮后进入吹蜡烛模式，开始放生日歌
    readyToBlowCandels() {
        this.blowingCandles = true;
        Object.values(this.instances).forEach(({ image, posX, posY }) => {
            // 开启光照效果
            image.setPipeline("Light2D");
            // 重置所有元素的位置
            image.setPosition(posX, posY);
        });
        this.lights.enable();

        // 停止原bgm，1秒后放生日歌
        this.sound.get(this.bgm).stop();
        const HBDSongPlay = this.sound.add("HBDSong").setVolume(0.4);
        setTimeout(() => {
            HBDSongPlay.play();
        }, 1000);
        HBDSongPlay.play();
        HBDSongPlay.on("complete", () => { 
            // 允许点蛋糕吹蜡烛
            this.HBDSongDone = true; 
        });
    }

    blowCandels() {
        // 先播放吹蜡烛的声音
        const blowSoundPlay = this.sound.add("blowSound").setVolume(0.7);
        blowSoundPlay.play();
        blowSoundPlay.on("complete", () => {
            // 结束后吹蜡烛，放拉炮
            this.blowingCandles = false;
            Object.values(this.instances).forEach(({ image }) => {
                // 关闭光照效果
                image.setPipeline("MultiPipeline");
            });
            this.lights.enable();
            this.sound.add("confettiSound").setVolume(0.7).play();
            shootConfetti();

            // 最后将bgm定死在生日歌
            this.bgm = "HBDBgm";
            setTimeout(() => {
                this.sound.add(this.bgm).setVolume(0.3).setLoop(true).play();
            }, 1000);
            
        });
    }
}


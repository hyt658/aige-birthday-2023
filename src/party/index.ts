import Phaser from 'phaser';
import RoomImg from "@/assets/images/room/room.jpg";

class PartyScene extends Phaser.Scene {
    preload() {
        this.load.image("room", RoomImg)
    }

    create() {
        const { width, height } = this.sys.game.canvas;
        const centerX = width / 2;
        const centerY = height / 2;

        this.add.image(centerX, centerY, "room");
    }
}

export default PartyScene;

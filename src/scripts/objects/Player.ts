
export default class Person extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x, y) {
        super(scene, x, y, 'person')
        this.setDisplaySize(50, 50)
        scene.add.existing(this)
    }
}

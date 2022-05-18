export default class GameBox extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x, y) {
    super(scene, x, y, 'dirt')
    this.setDisplaySize(300, 200)
    scene.add.existing(this)
  }
}

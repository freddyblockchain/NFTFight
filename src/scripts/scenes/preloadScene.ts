export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.image('flor', 'assets/img/flor.jpg')
    this.load.image('person', 'assets/img/Person.png')
    this.load.image('dirt', 'assets/img/dirt.jpg')
    this.load.image('enemy', 'assets/img/enemy.png')
  }

  create() {
    this.scene.start('MainScene')
  }
}

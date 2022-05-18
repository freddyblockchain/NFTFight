import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import AssetInput from '../objects/assetInput';
import GameBox from '../objects/gameBox';

let target = new Phaser.Math.Vector2();
let person: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
let box: Phaser.Physics.Arcade.Sprite;

export default class MainScene extends Phaser.Scene {
  fpsText
  rexUI: RexUIPlugin;  // Declare scene property 'rexUI' as RexUIPlugin type

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    const logo = new PhaserLogo(this, this.cameras.main.width / 2, 0)
    this.fpsText = new FpsText(this)

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, 0)
    box = new GameBox(this, 600, 150)
    const wall = this.physics.add.staticImage(450, 150, 'flor');
    wall.setSize(20, 200)
    wall.setDisplaySize(20, 200)
    person = this.physics.add.image(600, 220, 'person')
    person.setDisplaySize(50, 50)
    person.setCollideWorldBounds(true)

    new AssetInput(this, 300, 300, this.rexUI, logo)
    new AssetInput(this, 900, 300, this.rexUI, logo)

    this.physics.add.collider(person, wall, this.callback)


    this.input.on('pointerdown', (pointer) => {

      target.x = pointer.x;
      target.y = pointer.y;
      this.physics.moveToObject(person, target, 200)
    }, this);
  }

  callback = (person, wall) => {
    //console.log("colltion!")
  }

  update() {
    this.fpsText.update()

    var distance = Phaser.Math.Distance.Between(person.x, person.y, target.x, target.y);
    if (person.body.velocity != new Phaser.Math.Vector2(0, 0)) {

      //  4 is our distance tolerance, i.e. how close the source can get to the target
      //  before it is considered as being there. The faster it moves, the more tolerance is required.
      if (distance < 4) {
        person.body.reset(target.x, target.y);
      }

    }
  }
}

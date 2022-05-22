import FpsText from '../objects/fpsText'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import AssetInput from '../objects/assetInput';
import GameBox from '../objects/gameBox';

let target = new Phaser.Math.Vector2();
let person: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
let box: Phaser.Physics.Arcade.Sprite;

let enemy: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

export default class MainScene extends Phaser.Scene {
  fpsText
  rexUI: RexUIPlugin;  // Declare scene property 'rexUI' as RexUIPlugin type

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.fpsText = new FpsText(this)

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px'
      })
      .setOrigin(1, 0)
    box = new GameBox(this, 600, 150)
    person = this.physics.add.image(600, 220, 'person')
    enemy = this.physics.add.image(600, 100, 'enemy')
    person.setDisplaySize(50, 50)
    person.setSize(50, 50)
    enemy.setDisplaySize(50, 50)
    enemy.setSize(50, 50)

    person.setName('person');
    enemy.setName('enemy');

    person.setCollideWorldBounds(true)
    this.initWall(450, 150, 10, 200)
    this.initWall(600, 250, 300, 10)
    this.initWall(600, 50, 300, 10)
    this.initWall(750, 150, 10, 200)

    new AssetInput(this, 500, 300, this.rexUI, person)
    new AssetInput(this, 750, 300, this.rexUI, enemy)



    this.input.on('pointerdown', (pointer) => {

      target.x = pointer.x;
      target.y = pointer.y;
      this.physics.moveToObject(person, target, 200)
    }, this);
  }


  initWall = (x: number, y: number, width: number, height: number) => {
    const wall = this.physics.add.staticImage(x, y, 'flor');
    wall.setSize(width, height)
    wall.setDisplaySize(width, height)

    this.physics.add.collider(person, wall)
  }

  update() {
    this.fpsText.update()

    var distance = Phaser.Math.Distance.Between(person.x, person.y, target.x, target.y);
    if (person.body.velocity != new Phaser.Math.Vector2(0, 0)) {
      if (distance < 4) {
        person.body.reset(target.x, target.y);
      }

    }
  }
}

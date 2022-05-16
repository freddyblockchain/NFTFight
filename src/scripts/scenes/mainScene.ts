import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import AssetInput from '../objects/assetInput';


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
    new AssetInput(this, 300, 300, this.rexUI, logo)
    new AssetInput(this, 900, 300, this.rexUI, logo)
  }

  update() {
    this.fpsText.update()
  }
}

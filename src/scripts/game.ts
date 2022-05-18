import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'
import { initIPFS } from '../ipfs/ipfsClient'


const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 500
export let glRenderer: Phaser.Renderer.WebGL.WebGLRenderer

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  parent: 'phaser-container',
  dom: {
    createContainer: true
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI'
      }
    ]
  },
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  }
}

window.addEventListener('load', async () => {
  await initIPFS()
  const game = new Phaser.Game(config)
})

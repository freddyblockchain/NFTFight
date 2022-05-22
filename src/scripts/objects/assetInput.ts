import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { getData, ipfs } from '../../ipfs/ipfsClient';
import { algodClient } from '../Algorand/algoClient';
import toBuffer from 'it-to-buffer';
import { Scene, WEBGL } from 'phaser';
import { glRenderer } from '../game';

export default class AssetInput {
    counter: number = 0
    character: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    scene: Phaser.Scene
    constructor(scene: Phaser.Scene, x: number, y: number, rexUI: RexUIPlugin, character: Phaser.Types.Physics.Arcade.ImageWithDynamicBody) {
        this.scene = scene
        this.character = character
        const assetText = new Phaser.GameObjects.Text(scene, x, y, '', { fixedWidth: 120, fixedHeight: 18 })
        const text = new Phaser.GameObjects.Text(scene, x - 180, y - 9, `AssetId ${character.name} :`, { fixedWidth: 150, fixedHeight: 36 })
        text.setFontSize(12)
        text.setColor('black')
        scene.add.existing(text)
        scene.add.existing(assetText)
        assetText.setOrigin(0.5, 0.5)
        assetText.setBackgroundColor('black');

        assetText.setInteractive().on('pointerdown', () => {
            rexUI.edit(assetText);
        })
        this.initButton(scene, x, y + 40, assetText)


    }
    initButton = (scene: Phaser.Scene, x: number, y: number, text: Phaser.GameObjects.Text) => {
        const directionButton = scene.add.text(x, y, 'Retrieve', { fixedWidth: 80, fixedHeight: 18 });
        directionButton.setBackgroundColor("GREEN");
        directionButton.setOrigin(0.5, 0.5);
        directionButton.setInteractive();
        directionButton.on('pointerdown', async () => { await this.handleClick(text.text) });
        return directionButton;
    }

    handleClick = async (assetId: string) => {
        const asset = await algodClient.getAssetByID(parseInt(assetId)).do()
        const oldString: string = asset.params.url
        const newString = oldString.replace('ipfs://', '')

        const data = await getData(newString)

        const obj = JSON.parse(data)
        const imageString = (obj.image as string)
        const extension = imageString.substring(imageString.length - 3)

        const imageCat = imageString.replace('ipfs://', '')
        const buffer = await toBuffer(ipfs.cat(imageCat))
        var b64encoded = `data:image/${extension};base64,` + Buffer.from(buffer).toString('base64');
        const key = `${this.character.name}${this.counter}`
        this.scene.textures.addBase64(key, b64encoded)

        this.scene.textures.on('onload', () => {
            this.character.setTexture(key)
            this.character.setDisplaySize(50, 50)
            this.character.setSize(50, 50)
        }, this);
        this.counter++;
    }
}

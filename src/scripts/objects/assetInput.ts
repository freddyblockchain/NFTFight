import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { getData, ipfs } from '../../ipfs/ipfsClient';
import { algodClient } from '../Algorand/algoClient';
import toBuffer from 'it-to-buffer';
import { Scene, WEBGL } from 'phaser';
import { glRenderer } from '../game';
export default class AssetInput {
    logo: Phaser.Physics.Arcade.Sprite
    scene: Phaser.Scene
    constructor(scene: Phaser.Scene, x: number, y: number, rexUI: RexUIPlugin, logo: Phaser.Physics.Arcade.Sprite) {
        this.scene = scene
        this.logo = logo
        const assetText = new Phaser.GameObjects.Text(scene, x, y, '', { fixedWidth: 120, fixedHeight: 18 })
        const text = new Phaser.GameObjects.Text(scene, x - 150, y - 9, 'AssetId :', { fixedWidth: 150, fixedHeight: 36 })
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
        console.log(asset)
        console.log(asset.params.url)
        const oldString: string = asset.params.url
        const newString = oldString.replace('ipfs://', '')
        console.log("new string is : " + newString);
        //'https://nftstorage.link/ipfs/' + 

        const data = await getData(newString)

        console.log("here " + data)

        const obj = JSON.parse(data)
        const imageString = (obj.image as string)
        console.log("image is : " + imageString)
        const extension = imageString.substring(imageString.length - 3)

        const imageCat = imageString.replace('ipfs://', '')
        const buffer = await toBuffer(ipfs.cat(imageCat))
        var b64encoded = `data:image/${extension};base64,` + Buffer.from(buffer).toString('base64');
        console.log(b64encoded);
        this.scene.textures.addBase64("picture", b64encoded)
        this.logo.setTexture("picture")
    }
}

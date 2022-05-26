
### LICENCE
```
MIT License

Copyright (c) 2022 FREDERIK NIELSEN

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Link to projects 
* https://github.com/freddyblockchain/NFTFight
* https://github.com/freddyblockchain/NFTUploader

## Technologies used
* Reactjs
* Tailwind css
* Algorand javascript sdk
* NFT.storage
* jsipfs
* Phaser3 
* Github pages

## Project Description
NFTFight is a prototype of a game, that is utilizing algorand and IPFS to customize a player and the enemy.
The player and enemy can be transformed visually by inputting an assedId, corresponding to an algorand NFT.

## Project Architecture
This project is composed of two seperate webapps. 

* The NFTUploader webapp works by allowing the user to upload an
image. This image is pinned on IPFS via NFT.storage, and afterwards an algorand NFT is minted with the url
associated with the pinned image. An assetId is then shown, which the user can use in the game webapp.

* The NFTFight webapp is made in the web game framework Phaser3. The game allows the user to input an assetId
in a black box, which corresponds to a character onscreen. When the player hits retrieve, the nft corresponding
to the assetId is retrieved by the algorand sdk. The image url is retrieved from this NFT, and the image is 
downloaded by using the jsipfs module. Finally the image is converted to base64, to be added by the phaser texture
system

## How to use

### Step 1
* Go to https://freddyblockchain.github.io/NFTUploader/
* Choose a jpg or png image after clicking on choose file on one of the sides.
* Click on confirm. Wait for an assetId to show up.
* Copy the assetId. This is needed in the NFTFight game webapp.


### Step 2
* Go to https://freddyblockchain.github.io/NFTFight/
* Paste the assetId into one of the black boxes. 
* Click Retrieve
* The Entity, corresponding to the black box chosen, has its image changed corresponding to the image uploaded previously.


## Demo

https://www.youtube.com/watch?v=XgQbAMjfckI&t=1s

## Roadmap

* The first thing to do to improve this project is to add gameplay elements related to the NFT, and customization of the NFTs created.
* The second thing to do would be to add gameplay elements based on whether the person playing NFTFight owns the NFTS, that they are using 

import * as IPFS from 'ipfs-core'

export let ipfs: IPFS.IPFS

export const initIPFS = async () => {
    ipfs = await IPFS.create();
}

export const getData = async (cat: string) => {
    const res = await ipfs.cat(cat)

    console.log("size is " + res)

    let data = ''
    console.log("before res ")
    for await (const chunk of res) {
        data += chunk.toString()
    }
    return data
}

/** Uses `URL.createObjectURL` free returned ObjectURL with `URL.RevokeObjectURL` when done with it.
 * 
 * @param {string} cid CID you want to retrieve
 * @param {string} mime mimetype of image (optional, but useful)
 * @param {number} limit size limit of image in bytes
 * @returns ObjectURL
 */
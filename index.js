const toml = require('toml')
const JSON5 = require('json5')
const fs = require("mz/fs")

const convert = async (fileIn, fileOut) => {
    return new Promise((resolve, reject) => {
        const source = await fs.readFile(fileIn).catch(err => {
            reject(`Unable to read file ${fileIn}`)
        })

        try {
            const asJSON = toml.parse(source)

            if(fileOut.split(".json")[1] == "5") {
                await fs.writeFile(fileOut, JSON5.stringify(asJSON, null, 2))
            } else {
                await fs.writeFile(fileOut, JSON.stringify(asJSON, null, 2))
            }
        
            resolve(`${fileIn} converted to ${fileOut}`)
        } catch(err) {
            reject(`Unable to convert ${fileIn} to ${fileOut}`)
        }
    })
}

module.exports = convert
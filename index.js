const toml = require('toml')
const JSON5 = require('json5')
const fs = require("mz/fs")

const convert = async (fileIn, fileOut) => {
    const source = await fs.readFile(fileIn).catch(err => {
        console.error(`Unable to read file ${fileIn}`)
    })

    try {
        const asJSON = toml.parse(source)

        if(fileOut.split(".json")[1] == "5") {
            await fs.writeFile(fileOut, JSON5.stringify(asJSON, null, 2))
        } else {
            await fs.writeFile(fileOut, JSON.stringify(asJSON, null, 2))
        }
    
        console.log(`${fileIn} converted to ${fileOut}`)
    } catch(err) {
        console.error(`Unable to convert ${fileIn} to ${fileOut}`)
    }
}

module.exports = convert
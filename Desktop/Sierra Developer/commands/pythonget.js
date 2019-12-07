const Discord = require('discord.js')
let {prefix} = require('../config.json')

module.exports.run = async (Client, message, args) => {
    let myId = message.author.id

    message.author.send("Uploaded", {files: [`./PY_FILES/${myId}.py`]})
}

module.exports.config = {
    name: "pythonget",
    aliases: ['pyget'],
    description: "uploads your python file to the chat.",
    usage: `${prefix}pythonget`
}
const Discord = require('discord.js')
let {prefix} = require('../config.json')

module.exports.run = async (Client, message, args, gh) => {
    let user = gh.getUser(args[0])
    user.getProfile().then((result) => {
        console.log(result.username)
    })
}

module.exports.config = {
    name: "getuser",
    aliases: ['gu'],
    description: "grabs user",
    usage: `${prefix}getuser`
}
const Discord = require('discord.js')
let {prefix} = require('../config.json')

module.exports.run = async (Client, message, args) => {
    if (args[0] === 'help') return message.channel.send(`Just use ${prefix}help.`)
    if (args[0]) {
        let command = args[0]
        if(Client.commands.has(command)) {
            command = Client.commands.get(command)

            message.channel.send(`\`\`\`Command name: ${command.config.name}\nDescription: ${command.config.description || "No Description"}\nUsage: ${command.config.usage || "No Usage"}\nAliases: ${command.config.aliases || "None"}\`\`\``)
        }
    }

    if (!args.length) {
        message.channel.send('<:outbox_tray:651512513267105792> Commands have been sent to your DM\'s.')
        message.author.send('**Basic command output**\nhelp\nserverinfo')
    }
}

module.exports.config = {
    name: "help",
    aliases: ["commands", "h"],
    description: "",
    usage: ""
}
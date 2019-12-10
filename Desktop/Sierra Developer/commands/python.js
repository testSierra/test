const Discord = require('discord.js')
const fs = require('fs')
let {prefix} = require('../config.json')
const {exec} = require('child_process')

module.exports.run = async (Client, message, args) => {
    let commandUserId = message.author.id

    message.channel.send('Please input your python code with the correct syntax. Remember that only 1 user can be using this command at a time. You have \`120\` seconds...')
    .then(() => {
        message.channel.awaitMessages(response => message.content, {
            max: 1,
            time: 120000,
            errors: ['time'],
        })
        .then((collected) => {
            let GOTmsg = collected.first().content
            fs.writeFile(`./${message.author.id}.py`, `${GOTmsg}`, (err) =>{
                if (err) return console.log(`Error saving to file ${err}`)
            })

            message.channel.send('**Compiling...**').then((msg) => {

                exec(`py ./${message.author.id}.py`, (err, stdout, stderr) => {
                    if (err) return message.channel.send(`**Error:**\`\`\`${err.stack}\`\`\``)
                    msg.edit('**Compiled**')

                    message.channel.send(`**Output:**\n\`\`\`${stdout}\`\`\``)
                })
            })
                
        })
        .catch(() => {
            message.channel.send('You did not write anything')
        })
    })

}

module.exports.config = {
    name: "python",
    aliases: ['py'],
    description: "compiles python code and returns the results",
    usage: `${prefix}python`
}
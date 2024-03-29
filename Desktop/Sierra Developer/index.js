//loads discord library and client (bot)
const fs = require('fs')
const chalk = require('chalk')
let simpleGitPromise = require('simple-git/promise')()
const Discord = require('discord.js')
const Client = new Discord.Client()
let path = require('path')

let {prefix, token} = require('./config.json')

//Client commands and alias collections
Client.commands = new Discord.Collection()
Client.aliases = new Discord.Collection()


fs.readdir('./commands/', (err, files) => {
    if (err) return console.log(err)

    let jsFile = files.filter(f => f.split('.').pop() === 'js')
    if (jsFile.length <= 0) return console.log('[LOG] Couldn\'t find commands.')

    jsFile.forEach((f, i) => {
        //Search file by name
        let pull = require(`./commands/${f}`)
        Client.commands.set(pull.config.name, pull)
        pull.config.aliases.forEach(alias => {
            Client.aliases.set(alias,pull.config.name)
        })
    })
})

//Run this once after the Client has logged in
Client.once('ready', async () => {
    console.log(chalk.bgGreen('Success'), 'Sierra Developer log on successful.')

    let gitData = JSON.parse(fs.readFileSync(path.normalize('./gitConfigs.json'), 'utf8'))
    simpleGitPromise.addRemote('origin', gitData.gitUrl)
})

//run anytime a message is sent through the server
Client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()


    let commandFile = Client.commands.get(command) || Client.commands.get(Client.aliases.get(command))
    if (commandFile) commandFile.run(Client, message, args)
})

//login to Discord with the app's token
Client.login(token)
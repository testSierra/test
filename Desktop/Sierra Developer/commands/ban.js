const Discord = require('discord.js')
let {prefix} = require('../config.json')

module.exports.run = async (Client, message, args) => {
    //Checks if the user and bot have permissions
    if (!message.member.hasPermission(['MANAGE_ROLES']) || !message.guild.owner) return message.channel.send('You do not have permission to run this command.')
    if (!message.guild.me.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR'])) return message.channel.send('I do not have the permissions to run this command')

    //grabs user to be muted from mention or 0th argument
    let bannedUser = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!bannedUser) return message.channel.send('Please specify a user to be muted')

    //sets reason to be arguments after the command and joins the array
    let reason = args.slice(1).join(' ')
    if (!reason) reason = 'No reason given.'

    message.guild.ban(bannedUser, 0, reason).then(() => {
        mutedUser.send(`You have been banned from the server. Reason: ${reason}.`)
        message.channel.send(`The user ${bannedUser.user.username} has been banned from the server.`)
    })
}

module.exports.config = {
    name: "ban",
    aliases: [],
    description: "bans a user from the server",
    usage: `${prefix}ban [user] [reason]`
}
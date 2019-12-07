const Discord = require('discord.js')
let {prefix} = require('../config.json')

module.exports.run = async (Client, message, args) => {
    //Checks if the user and bot have permissions
    if (!message.member.hasPermissions(['MANAGE_ROLES']) || !message.guild.owner) return message.channel.send('You do not have permission to run this command.')
    if (!message.guild.me.hasPermissions(['MANAGE_ROLES', 'ADMINISTRATOR'])) return message.channel.send('I do not have the permissions to run this command')

    //grabs user to be muted from mention or 0th argument
    let mutedUser = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!mutedUser) return message.channel.send('Please specify a user to be muted')

    //sets reason to be arguments after the command and joins the array
    let reason = args.slice(1).join(' ')
    if (!reason) reason = 'No reason given.'

    //finds the muted role
    let mutedRole = message.guild.roles.find(r => r.name === 'Kitsune_Mute')
    if (!mutedRole) return message.channel.send('There is no mute role to remove')

    //adds the muted role to the user specified
    mutedUser.removeRole(mutedRole.id).then(() => {
        mutedUser.send(`You have been unmuted from the server. Reason: ${reason}.`)
        message.channel.send(`The user ${mutedUser.user.username} has been unmuted.`)
    }) 
}

module.exports.config = {
    name: "unmute",
    aliases: [],
    description: "unmutes a specified user with optional reason.",
    usage: `${prefix}mute [user] [reason]`
}
const Discord = require('discord.js')
let {prefix} = require('../config.json')

module.exports.run = async (Client, message, args) => {
    //Checks if the user and bot have permissions
    if (!message.member.hasPermission(['MANAGE_ROLES']) || !message.guild.owner) return message.channel.send('You do not have permission to run this command.')
    if (!message.guild.me.hasPermission(['MANAGE_ROLES', 'ADMINISTRATOR'])) return message.channel.send('I do not have the permissions to run this command')

    //grabs user to be muted from mention or 0th argument
    let mutedUser = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!mutedUser) return message.channel.send('Please specify a user to be muted')

    //sets reason to be arguments after the command and joins the array
    let reason = args.slice(1).join(' ')
    if (!reason) reason = 'No reason given.'

    //finds the muted role
    let mutedRole = message.guild.roles.find(r => r.name === 'Kitsune_Mute')
    if (!mutedRole) {
        try {
            //If the muted role does not exist, create one with certain parameters
            mutedRole = await message.guild.createRole({
                name: "Kitsune_Mute",
                color: "#6e1710",
                permissions: []
            })

            //adds the muted role to each channel with certain permissions
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(mutedRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false
                })
            })
        }
        catch (error) {
            console.log(error.stack)
        }
    }

    //adds the muted role to the user specified
    mutedUser.addRole(mutedRole.id).then(() => {
        mutedUser.send(`You have been muted from the server. Reason: ${reason}.`)
        message.channel.send(`The user ${mutedUser.user.username} has been muted.`)
    }) 
}

module.exports.config = {
    name: "mute",
    aliases: [],
    description: "",
    usage: `${prefix}mute [user] [reason]`
}
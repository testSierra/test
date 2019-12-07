const Discord = require('discord.js')
let {prefix} = require('../config.json')
const {exec} = require('child_process')

module.exports.run = async (Client, message, args, gh) => {
    let uploadId = message.author.id
    exec('del /f .git\index', (err, stdout, stderr) => {
        if (err) return console.log(err)
    })
    exec(`git add .`, (err, stdout, stderr) => {
        if (err) return console.log(err)
    })

    exec(`git commit -m "Upload File"`, (err, stdout, stderr) => {
        if (err) return console.log(err)
    })
    exec(`git remote set-url origin https://sierraTest:T3st123+@github.com/test.git`, (err, stdout, stderr) => {
        if (err) return console.log(err)
    })
    exec(`git remote -v`, (err, stdout, stderr) => {
        if (err) return console.log(err)
    })
    exec(`git push origin master`, (err, stdout, stderr) => {
        if (err) return console.log(err)
    })
    console.log('SUCCESSFUL')
}

module.exports.config = {
    name: "gitupload",
    aliases: ['gup'],
    description: "uploads your file to the github repository",
    usage: `${prefix}gitupload`
}
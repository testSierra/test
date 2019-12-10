const Discord = require('discord.js')
let {prefix} = require('../config.json')
let shellJs = require('shelljs')
let path = require('path')
let fs = require('fs')
let simpleGit = require('simple-git')()
let simpleGitPromise = require('simple-git/promise')()

module.exports.run = async (Client, message, args, gh) => {
    shellJs.cd(path.normalize('./PY_FILES'))
    let gitData = JSON.parse(fs.readFileSync(path.normalize('../gitConfigs.json'), 'utf8'))
    let username = gitData.username
    let password = gitData.password

    simpleGitPromise.addRemote('origin', gitData.gitUrl)
    simpleGitPromise.add('.')
    .then(
        (addSuccess) => {
            console.log(addSuccess)
        }, (failAdd) => {
            console.log('adding files failed')
        }
    )
    simpleGitPromise.commit('commit')
    .then(
        (successCommit) => {
            console.log(successCommit)
        }, (failed) => {
            console.log('failed commit')
        }
    )
    simpleGitPromise.push('origin', 'master')
    .then(
        (success) => {
            console.log('repo successfully pushed')
        }, (failed) => {
            console.log('repo push failed')
        }
    )

}
module.exports.config = {
    name: "gitupload",
    aliases: ['gup'],
    description: "uploads your file to the github repository",
    usage: `${prefix}gitupload`
}
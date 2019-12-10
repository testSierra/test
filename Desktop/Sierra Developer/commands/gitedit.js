let {prefix} = require('../config.json')
let fs = require('fs')
let path = require('path')
let fileName = path.normalize('../gitConfigs.json')
let file = require(fileName)

module.exports.run = async (Client, message, args, gh) => {
    let [email ,uname, passwd, repo] = args

    file.username = uname
    file.password = passwd
    file.email = email
    file.repository = repo
    file.gitUrl = `https://${uname}:${passwd}@github.com/${uname}/${repo}`
    
    let data = JSON.stringify(file, null, 2)
    console.log(__dirname)
    fs.writeFileSync(path.normalize('./gitConfigs.json'), `${data}`)
    let content = JSON.parse(fs.readFileSync(path.normalize('./gitConfigs.json'), 'utf8'))

    message.channel.send(`Changes Complete\n\`\`\`username: ${content.username}\nPassword: ${content.password}\nEmail: ${content.email}\nRepository: ${content.repository}\`\`\``)
    
}
module.exports.config = {
    name: "gitedit",
    aliases: ['ged'],
    description: "edits the git configurations",
    usage: `${prefix}gitedit [email] [username] [password] [repository]`
}
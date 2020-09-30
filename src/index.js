//Permissions-Int: 19457
//https://discord.com/oauth2/authorize?client_id=CLIENT-ID&scope=bot&permissions=19457

const Discord = require('discord.js');
const client = new Discord.Client();

const { token, commandChannel, command } = require('./config.json');

client.on('ready', () => {
    console.log('Der Bot ist bereit!');

    client.user.setActivity('BeepBoop', { type: 'PLAYING' })
        .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
        .catch(console.error);
});

client.on('message', message => {
    if (message.channel.type === 'dm') return;

    if (!message.content.startsWith(command) || message.author.bot || !message.channel.id == commandChannel) return;

    const taggedUser = message.mentions.users.first();

    try {
        if (taggedUser) {
            if (commandChannel != undefined) {
                if (message.guild.member(taggedUser.id).voice.channel) {
                    let invite = message.guild.member(taggedUser.id).voice.channel.createInvite({ unique: true }).then(invite => {
                        message.reply('\nDiscord-Tag: ' + taggedUser.tag + '\nChannel: ' + message.guild.member(taggedUser.id).voice.channel.name + '\nLink: https://discord.gg/' + invite.code)
                    });
                } else {
                    message.reply('Nutzer ist in keinem Voice-Channel!')
                }
            } 
        } else {
            message.reply('Kein gültiger Benutzer!');
        }
        
    } catch (error) {
        console.error(error);
        message.reply('Fehler beim ausführen des Befehls!');
    }
});

client.login(token);
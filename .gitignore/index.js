const Discord = require('discord.js')
const bot = new Discord.Client()
const token = process.env.TOKEN
const prefix = process.env.PREFIX
bot.login(token)
bot.on('message', function (message) { 
    if (message.content.startsWith(prefix) && message.channel.name.toString().includes('bot')){
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        
        if (command === 'party' ){
            if(message.member.highestRole.name !== 'Chat de gouttière' && message.member.highestRole.name !== '@everyone'){
                const voiceChannel = message.member.voiceChannel
                var rightgame = false
                try{
                    var rightgame = message.guild.member(message.member.id).presence.game.name.includes('Warframe')
                }
                catch(error){}
                finally{}
                if (rightgame === true){
                    try{
                        voiceChannel.setName(voiceChannel.name.split(" -",1)+" - "+args.toString().replace(","," "))
                    }
                    catch(error){
                        message.reply("Eh mais tu n'es dans aucun channel vocal !")
                    }
                    finally{}
                }
                else {
                    message.reply("Eh mais tu ne joues pas à Warframe petit malin ! ^^")
                }
            } else {
            message.reply('Désoler mais tu n\'as pas la permission de faire ça')
            }    
        }


        if (command === 'game' ){
            try{
                message.reply(message.guild.member(message.member.id).presence.game.name) 
            }
            catch(error){
                message.reply('Tu ne joues à aucun jeu !')
            }
            finally{}
        }



        if (command === 'help'){
            message.channel.send({embed: {
                color: 3447003,
                title: "LISTE DES COMMANDES :",
                fields: [{
                    name: "**__"+prefix+"help__**",
                    value: "Affiche cette page."
                },
                {
                    name: "**__"+prefix+"game__**",
                    value: "Indique à quel jeu tu es en train de jouer."
                },
                {
                    name: "**__"+prefix+"party <party_info>__**",
                    value: "Indique dans le nom de ton channel vocal actuelle les informations de ta partie"
                }]
            }})
        }
    }
})    
        
        
bot.on('voiceStateUpdate', (oldMember, newMember) =>{
    let newChannel = newMember.voiceChannel
    let oldChannel = oldMember.voiceChannel
    if (oldChannel !== undefined && oldChannel !== newChannel){
        let users = oldChannel.members.size
        if (users === 0){
            oldChannel.setName(oldChannel.name.split(" -",1).toString())
        }
    }     
})

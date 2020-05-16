require("dotenv").config()
const Discord = require("discord.js")
const fs = require('fs');
const client = new Discord.Client()
var amount = 50
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setPresence({ activity: { name: "Turbohacks getting destroyed", type: "WATCHING"}, status: "online" })
})

const CommandList = new Discord.MessageEmbed()
    .setColor("#82be42")
    .setTitle("Commands:")
    .setThumbnail("https://i.imgur.com/I2IrB4s.png")
    .addFields(
        { 
            name: "Text Commands:", value: "+ping: Replies with Pong! to test if bot is online.\n"
                                        + "+wipe *n*: Searches the last *n* (max 100) messages and deletes bot messages and commands. Default is 50 if no *n* is given.\n"
        },
        {
            name: "Voice Channel Commands:", value: "+hor: MLG-AirHorn\n"
                                                    +"+ohyea: Vector's iconic line: \"Oh yeah\"\n"
                                                    +"+rekt: Crowd going wild\n"
                                                    +"+yeet: \"**YEET**\"\n"
                                                    +"+leave: Makes bot leave the voice channel\n"
        }
    )

client.on("message", async msg => {
    if(msg.content.toLowerCase() === "sda"){
        msg.channel.send("<:Waluigi:688139607228940324>")
    }
    //If message is a command with prefix '+'
    if(msg.content.startsWith("+")){
        
        switch(msg.content.substring(1)){
            case "ping":
                msg.reply("Pong!")
            case "wipe":
                if(msg.content.length > 5){
                    amount = parseInt(msg.content.substring(5))
                    }
                    if(amount >= 0 && amount <= 100){
                       msg.channel.messages.fetch({ limit: amount }).then(messages => {
                            const botmessages = messages.filter(msg => msg.author.bot || msg.content.startsWith("+") || msg.content.startsWith("p!") || msg.content.startsWith("!") || msg.content.startsWith("-") || msg.content.startsWith("$"))
                            msg.channel.bulkDelete(botmessages)
                            msg.channel.send("Removed " + botmessages.size + " messages").then(tempMessage => {
                                tempMessage.react('687914531820666906')
                                tempMessage.delete({timeout : 5000})
                            })
                        })
                    } else {
                        if(amount > 100){
                            msg.channel.send("That's too many messages.")
                        } else {
                            msg.channel.send("How am I supposed to delete a negative amount of messages?")
                        }
                    }
                    amount = 50
            case "info":
                msg.channel.send(CommandList)
            case "noice":
                msg.channel.send('FUCKING NOICE');
                msg.channel.send('<:Bratt:688138276422680666>');
            
            //Voice Channel Commands
            case "ohyea":
                if(msg.member.voice.channel) {
                    const connection = await msg.member.voice.channel.join().then( connection => {
                        const dispatcher = connection.play(fs.createReadStream('./sounds/ohyeah.mp3'))              
                        dispatcher.on('finish', () => {
                            msg.member.voice.channel.leave()
                        })
                        dispatcher.on('error', console.error)
                })
                } else {
                    msg.channel.send("You need to be in a voice channel to use audio commands.")
                }
            case "yeet":
                if(msg.member.voice.channel) {
                    const connection = await msg.member.voice.channel.join().then( connection => {
                        const dispatcher = connection.play(fs.createReadStream('./sounds/yeet.mp3'), {volume: .5})              
                        dispatcher.on('finish', () => {
                            msg.member.voice.channel.leave()
                        })
                        dispatcher.on('error', console.error)
                })
                } else {
                    msg.channel.send("You need to be in a voice channel to use audio commands.")
                }
            case "hor":
                if(msg.member.voice.channel) {
                    const connection = await msg.member.voice.channel.join().then( connection => {
                        const dispatcher = connection.play(fs.createReadStream('./sounds/horn.mp3'), {volume: .15})              
                        dispatcher.on('finish', () => {
                            msg.member.voice.channel.leave()
                        })
                        dispatcher.on('error', console.error)
                })
                } else {
                    msg.channel.send("You need to be in a voice channel to use audio commands.")
                }
            case "butt":
                if(msg.member.voice.channel) {
                    const connection = await msg.member.voice.channel.join().then( connection => {
                        const dispatcher = connection.play(fs.createReadStream('./sounds/inthebutt.mp3'), {volume: 1.3})              
                        dispatcher.on('finish', () => {
                            msg.member.voice.channel.leave()
                        })
                        dispatcher.on('error', console.error)
                })
                } else {
                    msg.channel.send("You need to be in a voice channel to use audio commands.")
                }
            case "rekt":
                if(msg.member.voice.channel) {
                    const connection = await msg.member.voice.channel.join().then( connection => {
                        const dispatcher = connection.play(fs.createReadStream('./sounds/career.mp3'), {volume: .4})              
                        dispatcher.on('finish', () => {
                            msg.member.voice.channel.leave()
                        })
                        dispatcher.on('error', console.error)
                })
                } else {
                    msg.channel.send("You need to be in a voice channel to use audio commands.")
                }
            case "leave":
                msg.member.voice.channel.leave()
            default:
                msg.channel.send("Specify a command. Try +info for help.")

            }
        /*
        if (msg.content.substring(1) === "ping") {
            msg.reply("Pong!")
        }
        //Deletes bot commands and messages
        if(msg.content.substring(1, 5) === "wipe"){
            if(msg.content.length > 5){
            amount = parseInt(msg.content.substring(5))
            }
            if(amount >= 0 && amount <= 100){
               msg.channel.messages.fetch({ limit: amount }).then(messages => {
                    const botmessages = messages.filter(msg => msg.author.bot || msg.content.startsWith("+") || msg.content.startsWith("p!") || msg.content.startsWith("!") || msg.content.startsWith("-") || msg.content.startsWith("$"))
                    msg.channel.bulkDelete(botmessages)
                    msg.channel.send("Removed " + botmessages.size + " messages").then(tempMessage => {
                        tempMessage.react('687914531820666906')
                        tempMessage.delete({timeout : 5000})
                    })
                })
            } else {
                if(amount > 100){
                    msg.channel.send("That's too many messages.")
                } else {
                    msg.channel.send("How am I supposed to delete a negative amount of messages?")
                }
            }
            amount = 50
        }
        if(msg.content.substring(1) === "info"){
            msg.channel.send(CommandList)
        }
        if(msg.content.substring(1) === "noice"){
            msg.channel.send('FUCKING NOICE');
            msg.channel.send('<:Bratt:688138276422680666>');
        }

        //Voice channel commands
        if(msg.content.substring(1) === "ohyea"){
            if(msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join().then( connection => {
                    const dispatcher = connection.play(fs.createReadStream('./sounds/ohyeah.mp3'))              
                    dispatcher.on('finish', () => {
                        msg.member.voice.channel.leave()
                    })
                    dispatcher.on('error', console.error)
            })
            } else {
                msg.channel.send("You need to be in a voice channel to use audio commands.")
            }
        }
        if(msg.content.substring(1) === "yeet"){
            if(msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join().then( connection => {
                    const dispatcher = connection.play(fs.createReadStream('./sounds/yeet.mp3'), {volume: .5})              
                    dispatcher.on('finish', () => {
                        msg.member.voice.channel.leave()
                    })
                    dispatcher.on('error', console.error)
            })
            } else {
                msg.channel.send("You need to be in a voice channel to use audio commands.")
            }
        }
        if(msg.content.substring(1) === "hor"){
            if(msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join().then( connection => {
                    const dispatcher = connection.play(fs.createReadStream('./sounds/horn.mp3'), {volume: .15})              
                    dispatcher.on('finish', () => {
                        msg.member.voice.channel.leave()
                    })
                    dispatcher.on('error', console.error)
            })
            } else {
                msg.channel.send("You need to be in a voice channel to use audio commands.")
            }
        }
        if(msg.content.substring(1) === "butt"){
            if(msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join().then( connection => {
                    const dispatcher = connection.play(fs.createReadStream('./sounds/inthebutt.mp3'), {volume: 1.3})              
                    dispatcher.on('finish', () => {
                        msg.member.voice.channel.leave()
                    })
                    dispatcher.on('error', console.error)
            })
            } else {
                msg.channel.send("You need to be in a voice channel to use audio commands.")
            }
        }
        if(msg.content.substring(1) === "rekt"){
            if(msg.member.voice.channel) {
                const connection = await msg.member.voice.channel.join().then( connection => {
                    const dispatcher = connection.play(fs.createReadStream('./sounds/career.mp3'), {volume: .4})              
                    dispatcher.on('finish', () => {
                        msg.member.voice.channel.leave()
                    })
                    dispatcher.on('error', console.error)
            })
            } else {
                msg.channel.send("You need to be in a voice channel to use audio commands.")
            }
        }
        if(msg.content.substring(1) === "leave"){
            msg.member.voice.channel.leave()
        }

        //Disabled commands
        /*if(msg.content.substring(1) === "print30"){
            var i;
            for(i = 0; i < 30; i ++){
                setTimeout(() => {
                    msg.channel.send("please spawn").then(tempMessage => {
                        tempMessage.delete({timeout: 2000}).catch(console.log('oof'))
                    })
                }, 3000);               
            }
        }*/
        
    }
})
client.login(process.env.BOT_TOKEN)
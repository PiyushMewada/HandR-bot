require("dotenv").config()
const Discord = require("discord.js")
const fs = require('fs');
const client = new Discord.Client()
var amount = 50
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setPresence({ activity: { name: "Turbohacks get destroyed", type: "WATCHING" }, status: "online" })
})

const CommandList = new Discord.MessageEmbed()
    .setColor("#82be42")
    .setTitle("H&R Bot Commands:")
    .setThumbnail("https://i.imgur.com/I2IrB4s.png")
    .addFields({
        name: "Text Commands:",
        value: "+ping: Replies with Pong! to test if bot is online.\n" +
            "+wipe *n*: Searches the last *n* (max 100) messages and deletes bot messages and commands. Default is 50 if no *n* is given.\n" +
            "+server: Displays server information\n" +
            "+headout: Displays the 'aight imma head out' gif\n" +
            "+ansh: Displays Ansh's custom message\n" +
            "+megamoto: Displays a bunch of moto moto emojis\n"
    }, {
        name: "Voice Channel Commands:",
        value: "+horn: MLG-AirHorn\n" +
            "+ohyeah: Vector's iconic line: \"Oh yeah\"\n" +
            "+rekt: Crowd going wild\n" +
            "+yeet: \"**YEET**\"\n" +
            "+donkey: Gordon Ramsay's 'You Fucking Donkey!'\n" +
            "+getover: Just gotta get over\n" +
            "+leave: Makes bot leave the voice channel\n"
    })

client.on("message", async msg => {
    if (msg.content.toLowerCase() === "sda") {
        msg.channel.send("<:Waluigi:688139607228940324>")
    }

    //Shut up the dad bot
    if (msg.author.username == 'Dad Bot') {
        msg.delete();
        msg.channel.send('Fuck off Dad I deleted your message');
    }

    //Thirsty emoji auto-send
    if (msg.content.includes("thirsty") || msg.content.includes('Thirsty')) {
        msg.channel.send('<:Thirst:689204786083659776>');
    }

    //If message is a command with prefix '+'
    if (msg.content.startsWith("+")) {
        switch (msg.content.substring(1)) {
            case "ping":
                msg.reply("Pong!")
                break;
            case "info":
                msg.channel.send(CommandList)
                break;
            case "server":
                msg.channel.send(`Server name: ${msg.guild.name}\nTotal Members: ${msg.guild.memberCount}`);
                break;
            case "noice":
                msg.channel.send('FUCKING NOICE');
                msg.channel.send('<:Bratt:688138276422680666>');
                break;
            case "headout":
                const attachment = new Discord.MessageAttachment('https://anshjainpublic.s3.us-east-2.amazonaws.com/headout.gif');
                msg.channel.send(attachment);
                break;
            case "ansh":
                msg.channel.send('Justin is a dumbass.');
                break;
            case "megamoto":
                msg.channel.send('<:big:689542236878274608> <:chunky:689542818410266726> <:spunky:689543031967186944>')
                break;


                //Voice Channel Commands
            case "ohyeah":
            case "yeet":
            case "horn":
            case "butt":
            case "rekt":
            case "donkey":
            case "getover":
                if (msg.member.voice.channel) {
                    const connection = await msg.member.voice.channel.join().then(connection => {
                        var dispatcher
                        switch (msg.content.substring(1)) {
                            case "ohyeah":
                                dispatcher = connection.play(fs.createReadStream('./sounds/ohyeah.mp3'), { volume: 1 })
                                break;
                            case "yeet":
                                dispatcher = connection.play(fs.createReadStream('./sounds/yeet.mp3'), { volume: .5 })
                                break;
                            case "horn":
                                dispatcher = connection.play(fs.createReadStream('./sounds/horn.mp3'), { volume: .15 })
                                break;
                            case "butt":
                                dispatcher = connection.play(fs.createReadStream('./sounds/inthebutt.mp3'), { volume: 1.3 })
                                break;
                            case "rekt":
                                dispatcher = connection.play(fs.createReadStream('./sounds/career.mp3'), { volume: .4 })
                                break;
                            case "donkey":
                                dispatcher = connection.play(fs.createReadStream('./sounds/donkey.mp3'), { volume: 1.0 })
                                break;
                            case "getover":
                                dispatcher = connection.play(fs.createReadStream('./sounds/getover.mp3'), { volume: 1.0 })
                                break;
                            default:
                                break;
                        }
                        dispatcher.on('finish', () => {
                            msg.member.voice.channel.leave()
                        })
                        dispatcher.on('error', console.error)
                    })
                } else {
                    msg.channel.send("You need to be in a voice channel to use audio commands.")
                }
                break;
            case "leave":
                msg.member.voice.channel.leave()
                break;
            default:
                //Wipe command to remove bot messages and commands
                if (msg.content.substring(1, 5) === "wipe") {
                    if (msg.content.length > 5) {
                        amount = parseInt(msg.content.substring(5))
                    }
                    if (amount >= 0 && amount <= 100) {
                        msg.channel.messages.fetch({ limit: amount }).then(messages => {
                            const botmessages = messages.filter(msg => msg.author.bot || msg.content.startsWith("+") || msg.content.startsWith("p!") || msg.content.startsWith("!") || msg.content.startsWith("-") || msg.content.startsWith("$"))
                            msg.channel.bulkDelete(botmessages)
                            msg.channel.send("Removed " + botmessages.size + " messages").then(tempMessage => {
                                tempMessage.react('687914531820666906')
                                tempMessage.delete({ timeout: 5000 })
                                console.log(botmessages.size + " messages were deleted on server " + msg.guild.name + " in the channel " + msg.channel.name)
                            })
                        })
                    } else {
                        if (amount > 100) {
                            msg.channel.send("That's too many messages.")
                        } else {
                            msg.channel.send("How am I supposed to delete a negative amount of messages?")
                        }
                    }
                    amount = 50
                } else {
                    msg.channel.send("That's not a vaild command. Try +info for help.")
                }
                break;
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

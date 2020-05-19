require("dotenv").config()
const Discord = require("discord.js")
const Canvas = require("canvas")
const fs = require('fs')
const client = new Discord.Client()
var amount = 50
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setPresence({ activity: { name: "violin at TurboHacks's funeral", type: "PLAYING" }, status: "online" })
})

const CommandList = new Discord.MessageEmbed()
    .setColor("#82be42")
    .setTitle("H&R Bot Commands:")
    .setThumbnail("https://i.imgur.com/I2IrB4s.png")
    .addFields({
        name: "Text Channel Commands:",
        value: "+headout: Displays the 'aight imma head out' gif\n" +
            "+megamoto: Sends a bunch of moto moto emojis\n" +
            "+ping: Replies with Pong! to test if bot is online\n" +
            "+server: Displays server information\n" +
            "+sonicsays *text*: Gets Sonic to say the message\n" +
            "+wipe *n*: Searches the last *n* (max 100) messages and deletes bot messages and commands. Default is 50 if no *n* is given\n" +
            "+#1 *text*: Creates a Victory Royale image with the text instead\n"
    }, {
        name: "Voice Channel Commands:",
        value: "+donkey: Gordon Ramsay's 'You Fucking Donkey!'\n" +
            "+getover: Just gotta get over\n" +
            "+horn: MLG-AirHorn\n" +
            "+ohyeah: Vector's iconic line: \"Oh yeah\"\n" +
            "+rekt: Crowd going wild\n" +
            "+yeet: \"**YEET**\"\n" +
            "+leave: Makes bot leave the voice channel\n"
    })
client.on("message", async msg => {
    if (msg.content.toLowerCase() === "sda") {
        msg.channel.send("<:Waluigi:688139607228940324>")
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
            case "help":
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
                msg.channel.send('<:chunky:689542818410266726> <:spunky:689543031967186944>')
                break;
            case "anikait":
                const Camryattachment = new Discord.MessageAttachment('./images/Camry.jpg')
                msg.channel.send(Camryattachment)
                break;
            case "freemoney":
            case "rickroll":
            case "piyush":
                const foolAttachment = new Discord.MessageAttachment('./images/fool.jpg')
                msg.channel.send(foolAttachment)
                break;
                
                //Voice Channel Commands
            case "ohyeah":
            case "yeet":
            case "horn":
            case "butt":
            case "rekt":
            case "donkey":
            case "getover":
            case "haha":
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
                                dispatcher = connection.play(fs.createReadStream('./sounds/inthebutt.mp3'), { volume: 1.4 })
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
                            case "haha":
                                dispatcher = connection.play(fs.createReadStream('./sounds/laughtrack.mp3'), { volume: 1.0})
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
                            const botmessages = messages.filter(msg => msg.author.bot || msg.content.startsWith("~") || msg.content.startsWith("+") || msg.content.startsWith("p!") || msg.content.startsWith("!") || msg.content.startsWith("-") || msg.content.startsWith("$"))
                            msg.channel.bulkDelete(botmessages)

                            msg.channel.send("Removed " + botmessages.size + " messages").then(tempMessage => {
                                tempMessage.react('687914531820666906')
                                tempMessage.delete({ timeout: 5000 }).catch()
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
                //Custom Sonic Image Command
                } else if (msg.content.substring(1,10) === "sonicsays"){
                    //Create the canvas and the sonicsays image
                    const canvas = Canvas.createCanvas(600, 340)
                    const ctx = canvas.getContext('2d')
                    const background = await Canvas.loadImage('./images/sonicsays.jpg')

                    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

                    //Font and color selection
                    ctx.font = '25px sans-serif'
                    ctx.fillStyle = '#ffffff'

                    //Split up the message by the spaces to divide into new lines
                    var wordsArr = msg.content.substring(11).split(" ")
                    var messageArr = [""]
                    var editedMessage = ""
                    var j = 0
                    for(var i = 0; i < wordsArr.length; i++){
                        //If the message gets too long, then add it to a new line
                        if(messageArr[j].length + wordsArr[i].length > 27){
                            j++
                            messageArr[j] = ""
                        }
                        messageArr[j] += wordsArr[i] + " "
                    }

                    for(i = 0; i < messageArr.length; i++){
                        editedMessage += messageArr[i] + "\n"
                    }

                    //Create text
	                ctx.fillText(editedMessage, 20, 80, 350)
                   
                    //Send image
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sonicsays.png')
                    msg.channel.send(attachment)
                //Custom Victory Royale Image
                } else if (msg.content.substring(1,3) === "#1"){
                    //Create the canvas and the Victory Royale image
                    const canvas = Canvas.createCanvas(850, 280)
                    const ctx = canvas.getContext('2d')
                    const background = await Canvas.loadImage('./images/Victory.png')

                    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

                    //Font and color selection
                    ctx.font = '58px sans-serif'
                    ctx.fillStyle = '#ffffff'
                    //ctx.textAlign = "center"
                    //Split up the message by the spaces to divide into new lines
                    var wordsArr = msg.content.substring(4).split(" ")
                    var messageArr = [""]
                    var editedMessage = ""
                    var j = 0
                    for(var i = 0; i < wordsArr.length; i++){
                        //If the message gets too long, then add it to a new line
                        if(j < 2  && messageArr[j].length + wordsArr[i].length > 16){
                            j++
                            messageArr[j] = ""
                        }
                        messageArr[j] += wordsArr[i] + " "
                    }

                    for(i = 0; i < messageArr.length; i++){
                        editedMessage += messageArr[i] + "\n"
                    }

                    //Create text
                    ctx.rotate(-.02*Math.PI)
                    ctx.fillText(editedMessage, 210, 120)
                    ctx.strokeText(editedMessage, 210, 120)
                    //Send image
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Victory.png')
                    msg.channel.send(attachment)

                } else {
                    msg.channel.send("That's not a vaild command. Try +info for help.")
                }
                break;
        }
    }
})
client.login(process.env.BOT_TOKEN)

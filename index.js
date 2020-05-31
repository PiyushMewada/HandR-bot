require("dotenv").config()
const Discord = require("discord.js")
const Canvas = require("canvas")
const fs = require('fs')
const client = new Discord.Client()

//All the different activities of the bot
const PresenceList = [{name: "today's sponsor: Audible", type: "LISTENING"},
    {name: "Mind Games", type: "PLAYING"},
    {name: "your conversations", type: "LISTENING"},
    {name: "you", type: "WATCHING"},
    {name: "your requests", type: "LISTENING"}]

//The help command attachment
const CommandList = new Discord.MessageEmbed()
    .setColor("#82be42")
    .setTitle("H&R Bot Commands:")
    .setURL("https://github.com/PiyushMewada/HandR-bot")
    .setThumbnail("https://i.imgur.com/I2IrB4s.png")
    .addFields({
        name: "Text Channel Commands:",
        value: "+headout: Displays the 'aight imma head out' gif\n" +
            "+megamoto: Sends a bunch of moto moto emojis\n" +
            "+poll: Creates a poll. Separate the title and each option with an '*'\n" +
            "+ping: Replies with Pong! to test if bot is online\n" +
            "+server: Displays server information\n" +
            "+sonicsays *text*: Gets Sonic to say the message\n" +
            "+wwd: Tells you where to drop in Fortnite\n" +
            "+wipe *n*: Searches the last *n* (max 100) messages and deletes bot messages and commands. Default is 50 if no *n* is given\n" +
            "+#1 *text*: Creates a Victory Royale image with the text instead\n"
    }, {
        name: "Voice Channel Commands:",
        value: "+clap: Ha, Gottem\n" +
            "+default: Default dance from Fortnite\n" +
            "+dum: 6ix9ine calling you dumb\n" +
            "+haha: Laughtrack\n" +
            "+horn: MLG-AirHorn\n" +
            "+loss: Losing sound effect\n" +
            "+mad: When you make people mad\n" +
            "+ohyeah: Vector's iconic line: \"Oh yeah\"\n" +
            "+roll: Try it out\n" +
            "+rekt: Crowd going wild\n" +
            "+sans: Plays first notes of Megalovania\n" +
            "+yeet: \"**YEET**\"\n" +
            "+leave: Makes bot leave the voice channel\n"
    })

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    /*Possible Status:
        -Playing with your heart
        -Listening to your requests
        -Watching TurboHacks get destroyed
        -Watching you
        -Watching your every move
        -Listening to your conversations
        -Playing Mind Games
        -Watching the fall of Humanity
        -Listening to today's sponsor: Audible
    */
    client.user.setPresence({ activity: { name: "today's sponsor: Audible", type: "LISTENING" }, status: "online"})
})

client.on("message", async msg => {
    //Sad Waluigi emoji auto-send
    if (msg.content.toLowerCase().includes("sda")) {
        msg.channel.send("<:Waluigi:688139607228940324>")
    }

    //Thirsty emoji auto-send
    if (msg.content.toLowerCase().includes("thirsty")) {
        msg.channel.send('<:Thirst:689204786083659776>');
    }

    //If message says Good Night send Arrivederci
    if (msg.content.toLowerCase().includes("good night")) {
        msg.channel.send("Arrivederci");
    }
    
    //Confused command
    if (msg.content === "?") {
        const questionAttactment = new Discord.MessageAttachment("./images/questionmark.jpg");
        msg.channel.send(questionAttactment);
    }

    //If message is a command with prefix '+'
    if (msg.content.startsWith("+")) {
        
        msg.channel.startTyping()
        
        //After an average of 100 commands, it'll change its status
        if(Math.random() < .01){
            msg.channel.send("You changed my status!").then(statusChange => {
                statusChange.delete({timeout: 3000}).catch()
            })
            client.user.setActivity(PresenceList[Math.floor(Math.random() * PresenceList.length)])
        }
        //Switch case for all the commands
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
                const attachment = new Discord.MessageAttachment('https://media.giphy.com/media/S9nuoEQkwXUms2ZNaz/giphy.gif');
                await msg.channel.send(attachment).then( headout => {
                    msg.delete({timeout: 5000}).catch()
                    headout.delete({timeout: 5000}).catch()
                })
                break;
            case "ansh":
                msg.channel.send('Justin is a dumbass.', {tts: true});
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
            case "wwd":
                var locations = ["The Agency", "The Shark", "The Rig", "The Grotto", "The Yacht", "Pleasant Park", "Holly Hedges", "Misty Meadows",
                                "Henchmen Bases", "4 Corners"]
                
                var endings = ["Good Luck!", "This is going to be quick one...", "God Speed!", "May the Force be with you.", "Break a Leg!",
                                "Use those Lucky Cheeks.", "*Yare Yare Daze*.", "Arrivederci.", "May the odds be ever in your favor.", "Carpe Omnia."]
                
                msg.channel.send("I think you should go to " + locations[Math.floor(Math.random() * locations.length)] + ". " +  endings[Math.floor(Math.random() * endings.length)])
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
            case "clap":
            case "roll":
            case "smooth":
            case "default":
            case "loss":
            case "sans":
            case "dum":
            case "mad":
                if (msg.member.voice.channel) {
                    var currentChannel = msg.member.voice.channel
                    const connection = await msg.member.voice.channel.join().then(connection => {
                        var dispatcher
                        switch (msg.content.substring(1)) {
                            case "ohyeah":
                                dispatcher = connection.play(fs.createReadStream('./sounds/ohyeah.mp3'), { volume: 1.3 })
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
                                dispatcher = connection.play(fs.createReadStream('./sounds/career.mp3'), { volume: .3 })
                                break;
                            case "donkey":
                                dispatcher = connection.play(fs.createReadStream('./sounds/donkey.mp3'), { volume: 1.0 })
                                break;
                            case "getover":
                                dispatcher = connection.play(fs.createReadStream('./sounds/getover.mp3'), { volume: 1.0 })
                                break;
                            case "haha":
                                dispatcher = connection.play(fs.createReadStream('./sounds/laughtrack.mp3'), { volume: 1.0})
                                break;
                            case "clap":
                                msg.channel.send("That was a good one" + "<:clap:712393807353610321> <:clap:712393807353610321>")
                                dispatcher = connection.play(fs.createReadStream('./sounds/claps.mp3'), { volume: .80})
                                break;
                            case "roll":
                                dispatcher = connection.play(fs.createReadStream('./sounds/roll.mp3'), { volume: .75 })
                                break;
                            case "smooth":
                                dispatcher = connection.play(fs.createReadStream('./sounds/smooth.mp3'), { volume: .6 })
                                break;
                            case "default":
                                dispatcher = connection.play(fs.createReadStream('./sounds/default.mp3'), { volume: 1 })
                                break;
                            case "loss":
                                dispatcher = connection.play(fs.createReadStream('./sounds/loss.mp3'), { volume: .7 })
                                break;
                            case "sans":
                                dispatcher = connection.play(fs.createReadStream('./sounds/megalovania.mp3'), { volume: .9 })
                                break;
                            case "dum":
                                dispatcher = connection.play(fs.createReadStream('./sounds/dumb.mp3'), { volume: .3 })
                                break;
                            case "mad":
                                dispatcher = connection.play(fs.createReadStream('./sounds/mad.mp3'), { volume: .3 })
                                break;
                            default:
                                break;
                        }
                        dispatcher.on('finish', () => {
                            currentChannel.leave()
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
            //For commands that require more information afterwards:

                //Wipe command to remove bot messages and commands
                if (msg.content.substring(1, 5) === "wipe") {
                    if (msg.content.length > 5) {
                        amount = parseInt(msg.content.substring(5))
                    } else {
                        amount = 50
                    }
                    if (amount >= 0 && amount <= 100) {
                        msg.channel.messages.fetch({ limit: amount }).then(messages => {
                            const botmessages = messages.filter(msg => msg.author.bot || msg.content.startsWith("?") || msg.content.startsWith("~") || msg.content.startsWith("+") || msg.content.startsWith("p!") || msg.content.startsWith("!") || msg.content.startsWith("-") || msg.content.startsWith("$") || msg.content.startsWith("="))
                            msg.channel.bulkDelete(botmessages)

                            msg.channel.send("Removed " + botmessages.size + " messages").then(tempMessage => {
                                tempMessage.react('687914531820666906')
                                tempMessage.delete({ timeout: 5000 }).catch()
                            })
                        })
                    } else {
                        if (amount > 100) {
                            msg.channel.send("That's too many messages.")
                        } else {
                            msg.channel.send("How am I supposed to delete a negative amount of messages?")
                        }
                    }
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

                } else if (msg.content.substring(1,5) === "poll"){
                    //Create a Poll
                    const pollParts = msg.content.split('*')
                    if(pollParts.length < 3){
                        //There is something missing
                        msg.channel.send("There is something missing from the poll, make sure there are 2 possible options. Separate the title and each option with a \'*\'.")
                    } else if (pollParts.length > 11){
                        msg.channel.send("The max number of options is 10.")
                    } else {
                        const Poll = new Discord.MessageEmbed()
                        .setColor("#ffffff")
                        .setURL("https://tinyurl.com/pollImage")
                        .setTitle(pollParts[0].substring(6))
                        .setThumbnail("https://images-na.ssl-images-amazon.com/images/I/51cOM2ZPaoL.png")

                        var optionText = ""
                        for(i = 1; i < pollParts.length; i++){
                            optionText += i + ". " + pollParts[i] + "\n"
                        }

                        Poll.addField("Options:", optionText)

                        msg.channel.send(Poll).then(pollMessage => {
                            pollMessage.react("1️⃣")
                            pollMessage.react("2️⃣")
                            if(pollParts.length > 3){
                                pollMessage.react("3️⃣")
                                if(pollParts.length > 4){
                                    pollMessage.react("4️⃣")
                                    if(pollParts.length > 5){
                                        pollMessage.react("5️⃣")
                                        if(pollParts.length > 6){
                                            pollMessage.react("6️⃣")
                                            if(pollParts.length > 7){
                                                pollMessage.react("7️⃣")
                                                if(pollParts.length > 8){
                                                    pollMessage.react("8️⃣")
                                                    if(pollParts.length > 9){
                                                        pollMessage.react("9️⃣")
                                                        if(pollParts.length > 10){
                                                            pollMessage.react("🔟")
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        })
                    }
                } else {
                    //Not a vaild command
                    msg.channel.send("That's not a valid command. Try +info for help.")
                }
                break;
        }
    msg.channel.stopTyping(true)
    }
})
client.login(process.env.BOT_TOKEN)

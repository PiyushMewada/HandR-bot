require("dotenv").config()
const Discord = require("discord.js")
const Canvas = require("canvas")
const fs = require('fs')
const client = new Discord.Client()

//All the different activities of the bot
/*Possible Status:
        -Playing with your heart
        -Watching TurboHacks get destroyed
        -Watching your every move
    */
const presenceList = [{
		activity: {
			name: "today's sponsor: Audible",
			type: "LISTENING"
		},
		status: "idle"
	},
	{
		activity: {
			name: "Mind Games",
			type: "PLAYING"
		},
		status: "dnd"
	},
	{
		activity: {
			name: "your conversations",
			type: "LISTENING"
		},
		status: "online"
	},
	{
		activity: {
			name: "you",
			type: "WATCHING"
		},
		status: "online"
	},
	{
		activity: {
			name: "your requests",
			type: "LISTENING"
		},
		status: "online"
	},
	{
		activity: {
			name: "Discord Deception",
			type: "PLAYING"
		},
		status: "online"
	},
	{
		activity: {
			name: "the rise of machines and the fall of humanity",
			type: "WATCHING"
		},
		status: "online"
	},
	{
		activity: {
			name: "with a blindfold on",
			type: "PLAYING"
		},
		status: "online"
	},
	{
		activity: {
			name: "with tilt controls",
			type: "PLAYING"
		},
		status: "online"
	},
	{
		activity: {
			name: "Bowser's Big Bean Burrito | Trying to get the world record.",
			type: "STREAMING",
			url: "https://www.twitch.tv/dunkstream"
		},
		status: "online"
	}
]

//The help command attachment
const commandList = new Discord.MessageEmbed()
	.setColor("#82be42")
	.setTitle("H&R Bot Commands:")
	.setURL("https://github.com/PiyushMewada/HandR-bot")
	.setThumbnail("https://i.imgur.com/I2IrB4s.png")
	.addFields({
		name: "**Text Channel Commands:**",
		value: "```diff\n" +
			"+headout: Displays the 'aight imma head out' gif\n" +
			"+megamoto: Sends a bunch of moto moto emojis\n" +
			"+poll: Creates a poll. Separate the title and each option with an '*'\n" +
			"+ping: Replies with Pong! to test if bot is online\n" +
			"+server: Displays server information\n" +
			"+sonicsays text: Gets Sonic to say the message\n" +
			"+tourney: Creates a tournament bracket. Separate the command and each participant with an ' * '\n" +
			"+tourneyr: Same as +tourney, but randomizes the participants\n" +
			"+tourneys: Same as +tourney, but seeds the participants. Enter them in order of skill level\n" +
			"+wwd: Tells you where to drop in Fortnite\n" +
			"+wipe n: Searches the last n (max 100) messages and deletes bot messages and commands. Default is 50 if no n is given\n" +
			"+#1: Creates a Victory Royale image with custom text\n" +
			"```"
	}, {
		name: "**Voice Channel Commands:**",
		value: "```fix\n" +
			"+clap: Ha, Gottem\n" +
			"+default: Default dance from Fortnite\n" +
			"+dum: Calls you dumb\n" +
			"+haha: Laughtrack\n" +
			"+horn: MLG-AirHorn\n" +
			"+loss: Losing sound effect\n" +
			"+mad: When you make people mad\n" +
			"+oof: OOF sound\n" +
			"+ohyeah: Vector's iconic line: \"Oh yeah\"\n" +
			"+roll: Try it out\n" +
			"+rekt: Crowd going wild\n" +
			"+sans: Plays first notes of Megalovania\n" +
			"+yeet: \"YEET\"\n" +
			"+leave: Makes bot leave the voice channel\n" +
			"```"
	})

//The hidden help command attachment
const hiddenCommandList = new Discord.MessageEmbed()
	.setColor("#82be42")
	.setTitle("H&R Bot Commands:")
	.setURL("https://github.com/PiyushMewada/HandR-bot")
	.setThumbnail("https://i.imgur.com/I2IrB4s.png")
	.addFields({
		name: "**Text Channel Commands:**",
		value: "```diff\n" +
			"+headout: Displays the 'aight imma head out' gif\n" +
			"+megamoto: Sends a bunch of moto moto emojis\n" +
			"+poll: Creates a poll. Separate the title and each option with an '*'\n" +
			"+ping: Replies with Pong! to test if bot is online\n" +
			"+server: Displays server information\n" +
			"+sonicsays text: Gets Sonic to say the message\n" +
			"+tourney: Creates a tournament bracket. Separate the command and each participant with an ' * '\n" +
			"+tourneyr: Same as +tourney, but randomizes the participants\n" +
			"+tourneys: Same as +tourney, but seeds the participants. Enter them in order of skill level\n" +
			"+wwd: Tells you where to drop in Fortnite\n" +
			"+wipe n: Searches the last n (max 100) messages and deletes bot messages and commands. Default is 50 if no n is given\n" +
			"+#1: Creates a Victory Royale image with custom text\n" +
			"```"
	}, {
		name: "**Voice Channel Commands:**",
		value: "```fix\n" +
			"+clap: Ha, Gottem\n" +
			"+default: Default dance from Fortnite\n" +
			"+dum: Calls you dumb\n" +
			"+haha: Laughtrack\n" +
			"+horn: MLG-AirHorn\n" +
			"+loss: Losing sound effect\n" +
			"+mad: When you make people mad\n" +
			"+ohyeah: Vector's iconic line: \"Oh yeah\"\n" +
			"+oof: OOF sound\n" +
			"+roll: Try it out\n" +
			"+rekt: Crowd going wild\n" +
			"+sans: Plays first notes of Megalovania\n" +
			"+yeet: \"YEET\"\n" +
			"+leave: Makes bot leave the voice channel\n" +
			"```"
	}, {
		name: "**Hidden Commands:**",
		value: "```diff\n" +
			"+anikait: Sends an image of his car exploding\n" +
			"+ansh: Calls Justin a dumbass\n" +
			"+help, +info: Sends command list\n" +
			"+help all, +info all, +ia: Sends hidden command list\n" +
			"+freemoney, +piyush, +rickroll: Calls you a fool\n" +
			"```" +
			"```fix\n" +
			"+butt: Ansh getting boned\n" +
			"+donkey: Gordom Ramsay calling you a donkey\n" +
			"+getover: Trevor getting over\n" +
			"+smooth: Smooth Moves from Fortnite\n" +
			"```"
	}, {
		name: "**Other:**",
		value: "```bash\n" +
			"\"-If a message includes 'bruh' reply with B R U H\n" +
			"-If a message includes 'good night' reply with a farewell and react to their message\n" +
			"-If a message includes 'sda' reply with sad waluigi\n" +
			"-If a message includes 'thirsty' reply with Justin drinking\n" +
			"-If a message is '?' reply with question mark image\n" +
			"-If a message is 'wot' and the author is 1choklitboi, tell him to stop being confused.\"\n" +
			"```"
	})

//Embed that has the invite link for the bot
const botInvite = new Discord.MessageEmbed()
	.setColor("#82be42")
	.setTitle("Invite the Bot to Your Server!")
	.setURL("https://discord.com/api/oauth2/authorize?client_id=707642874766032916&permissions=8&scope=bot")
	.setThumbnail("https://i.imgur.com/I2IrB4s.png")
	.setDescription("Click the title to add the bot")

//Tournament Dictionary
var tournamentDict = []

//Function to get the index of the server from the tournament dictionary
function getServerIndex(dict, guildID) {
	for (i = 0; i < dict.length; i++) {
		if (dict[i].info.ID == guildID) {
			return i
		}
	}
	return false;
}

//When the bot goes online
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`)
	client.user.setPresence({
		activity: {
			name: "with tilt controls",
			type: "PLAYING"
		},
		status: "online"
	})
})

//Whenever a message is sent
client.on("message", async msg => {

	//Sad Waluigi emoji auto-send
	if (msg.content.toLowerCase().includes("sda")) {
		msg.channel.send("<:Waluigi:718312850141216798>")
	}

	//Thirsty emoji auto-send
	if (msg.content.toLowerCase().includes("thirsty")) {
		msg.react("718313560186290207")

	}

	//If a message says bruh, reply with B R U H
	if (msg.content.toLowerCase().includes("bruh")) {
		msg.channel.send("***B R U H***")
	}

	//If message says Good Night reply Arrivederci
	if ((msg.content.toLowerCase().includes("good night") || msg.content.toLowerCase().includes("goodnight") || msg.content.toLowerCase() === "gn") && !msg.author.bot) {
		const goodnights = [
			["Arrivederci", "👋"],
			["Good Night", "😴"],
			["See You Later", "🏃"],
			["You can never leave", "😈"],
			["Later", "🌊"],
			["Bye", "👋"],
			["Sleep tight", "🛏️"],
			["Finally", "🙌"],
			["Farewell", "🌊"],
			["Minecraft", "Minecraft Mobs"]
		]

		//Pick a random phrase and emoji
		goodbye = goodnights[Math.floor(Math.random() * goodnights.length)]
		if (goodbye[0] == "Finally") {
			//If it is the finally emoji send this response
			msg.react("🙌")
			msg.react("🥳")
			msg.channel.send("Finally, " + msg.author.username + " is leaving. Now we can have some real fun.")
		}
		else if (goodbye[0] == "Minecraft") {
			//Minecraft Mobs: Zombie, Skeleton, Creeper, Enderman. in order
			msg.react("718311214404599809")
			msg.react("718311214312325182")
			msg.react("718311214375239681")
			msg.react("718311864517525586")
			msg.channel.send("You may not rest now, " + msg.author.username + ", there are monsters nearby...")
		}
		else {
			//For all others send this response and reaction
			msg.react(goodbye[1])
			msg.channel.send(goodbye[0] + ", " + msg.author.username)
		}
	}

	//Confused command, sends an image with question marks
	if (msg.content === "?") {
		const questionAttactment = new Discord.MessageAttachment("./images/questionmark.jpg");
		msg.channel.send(questionAttactment)
	}

	//Personal command for a friend. Whenever he says "wot", it replies
	if (msg.content.toLowerCase() === "wot" && msg.author.id == 488542158542995458) {
		msg.channel.send("Conner, that was not confusing in any way. What could you possibly not understand.")
	}

	//If message is a command with prefix '+'
	if (msg.content.startsWith("+")) {

		//Set bot status to typing so you know it is working
		msg.channel.startTyping()

		//After an average of 25 commands, it'll change its status
		if (Math.random() < .04) {
			client.user.setPresence(presenceList[Math.floor(Math.random() * presenceList.length)])
			msg.channel.send("You changed my status!")
		}
		//Switch case for all the commands
		switch (msg.content.substring(1)) {
			case "ping":
				//Ping the bot so you know it's online
				msg.reply("Pong!")
				break;
				// Future idea: Make 2 embeds and use reactions to switch between voice and text commands.
			case "help":
			case "info":
				//Send the info embeded message
				msg.channel.send(commandList)
				break;
			case "help all":
			case "helpall":
			case "infoall":
			case "info all":
			case "ia":
				//Sends hidden command list
				msg.channel.send(hiddenCommandList)
				break;
			case "server":
				//Gives server info (Taken from Tubrohacks)
				msg.channel.send(`Server name: ${msg.guild.name}\nTotal Members: ${msg.guild.memberCount}`);
				break;
			case "headout":
				//Sends a Spongebob gif and then deletes both the messages
				const attachment = new Discord.MessageAttachment('https://media.giphy.com/media/S9nuoEQkwXUms2ZNaz/giphy.gif');
				await msg.channel.send(attachment).then(headout => {
					msg.delete({
						timeout: 5000
					}).catch()
					headout.delete({
						timeout: 5000
					}).catch()
				})
				break;
			case "ansh":
				//Custom command taken from Turbohacks
				msg.channel.send('Justin is a dumbass.', {
					tts: true
				});
				break;
			case "megamoto":
				//Sends emojis
				msg.channel.send('<:chunky:718313891372990524> <:spunky:718313891766992898>')
				break;
			case "anikait":
				//Custom command for a friend, send an image
				const Camryattachment = new Discord.MessageAttachment('./images/Camry.jpg')
				msg.channel.send(Camryattachment)
				break;
			case "freemoney":
			case "rickroll":
			case "piyush":
				//Custom hidden commands for memes. Sends an image
				const foolAttachment = new Discord.MessageAttachment('./images/fool.jpg')
				msg.channel.send(foolAttachment)
				break;
			case "wwd":
			case "Wwd":
				//Tells you where to drop in fortnite
				//List of locations
				var locations = ["The Authority", "The Fortilla", "Rickety Rig", "Catty Corner", "Pleasant Park", "Holly Hedges", "Misty Meadows",
					"Lazy Lake", "4 Boats"
				]

				//List of endings to sentence
				var endings = ["Good Luck!", "This is going to be quick one...", "God Speed!", "May the Force be with you.", "Break a Leg!",
					"Use those Lucky Cheeks.", "*Yare Yare Daze*.", "Arrivederci.", "May the odds be ever in your favor.", "Carpe Omnia."
				]

				//Pick 2 random elements and use them to make a phrase
				msg.channel.send("I think you should go to " + locations[Math.floor(Math.random() * locations.length)] + ". " + endings[Math.floor(Math.random() * endings.length)])
				break;
			case "invite":
				//Sends invite link
				msg.channel.send(botInvite)
				break;
			case "status":
				//So I can manually change the status of the bot
				if (msg.author.id == 241052712458911744) {
					client.user.setPresence(presenceList[Math.floor(Math.random() * presenceList.length)]).then(() => {
						msg.channel.send("Status Changed to " + client.user.presence.activities.toString() + "!")
					})
				}
				else {
					//Not a vaild command for people who aren't me
					msg.channel.send("That's not a valid command. Try +info for help.")
				}
				break;
			case "stopTyping":
				//Force the bot to stop typing
				msg.channel.stopTyping(true)
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
			case "oof":
				//Join voice channel of memeber or the first voice channel available
				var currentChannel
				if (!msg.member.voice.channel) {
					currentChannel = msg.guild.channels.cache.find(ch => (ch.type == 'voice' && ch.rawPosition == 0))
				}
				else {
					currentChannel = msg.member.voice.channel
				}
				const connection = await currentChannel.join().then(connection => {
					var dispatcher
					switch (msg.content.substring(1)) {
						case "ohyeah":
							//Vector's Oh Yeah
							dispatcher = connection.play(fs.createReadStream('./sounds/ohyeah.mp3'), {
								volume: 1.3
							})
							break;
						case "yeet":
							//YEET
							dispatcher = connection.play(fs.createReadStream('./sounds/yeet.mp3'), {
								volume: .5
							})
							break;
						case "horn":
							//Airhorn
							dispatcher = connection.play(fs.createReadStream('./sounds/horn.mp3'), {
								volume: .15
							})
							break;
						case "butt":
							//Custom hidden command
							dispatcher = connection.play(fs.createReadStream('./sounds/inthebutt.mp3'), {
								volume: 1.4
							})
							break;
						case "rekt":
							//Crowd
							dispatcher = connection.play(fs.createReadStream('./sounds/career.mp3'), {
								volume: .3
							})
							break;
						case "donkey":
							//Hidden Gordon Ramsay
							dispatcher = connection.play(fs.createReadStream('./sounds/donkey.mp3'), {
								volume: 1.0
							})
							break;
						case "getover":
							//Hidden friend commmand
							dispatcher = connection.play(fs.createReadStream('./sounds/getover.mp3'), {
								volume: 1.0
							})
							break;
						case "haha":
							//Laughtrack
							dispatcher = connection.play(fs.createReadStream('./sounds/laughtrack.mp3'), {
								volume: 1.0
							})
							break;
						case "clap":
							//Friend saying "ha gottem"
							msg.channel.send("That was a good one" + "👏👏")
							dispatcher = connection.play(fs.createReadStream('./sounds/claps.mp3'), {
								volume: .80
							})
							break;
						case "roll":
							//Rickroll
							dispatcher = connection.play(fs.createReadStream('./sounds/roll.mp3'), {
								volume: .75
							})
							break;
						case "smooth":
							//Smooth Moves from Fortnite
							dispatcher = connection.play(fs.createReadStream('./sounds/smooth.mp3'), {
								volume: .6
							})
							break;
						case "default":
							//Default Dance from Fortnite
							dispatcher = connection.play(fs.createReadStream('./sounds/default.mp3'), {
								volume: 1
							})
							break;
						case "loss":
							//Losing sound  effect from Price is Right
							dispatcher = connection.play(fs.createReadStream('./sounds/loss.mp3'), {
								volume: .5
							})
							break;
						case "sans":
							//Sans theme
							dispatcher = connection.play(fs.createReadStream('./sounds/megalovania.mp3'), {
								volume: .9
							})
							break;
						case "dum":
							//6ix9ine calling you dumb
							dispatcher = connection.play(fs.createReadStream('./sounds/dumb.mp3'), {
								volume: .2
							})
							break;
						case "mad":
							//6ix9ine talking about being mad
							dispatcher = connection.play(fs.createReadStream('./sounds/mad.mp3'), {
								volume: .2
							})
							break;
						case "oof":
							//Roblox oof sound
							const oofSounds = ['./sounds/oofR.mp3', './sounds/oofMC.mp3']
							dispatcher = connection.play(fs.createReadStream(oofSounds[Math.floor(Math.random() * oofSounds.length)]), {
								volume: .8
							})
							break;
						default:
							break;
					}
					//Once the audio clip finishes leave the channel
					dispatcher.on('finish', () => {
						currentChannel.leave()
					})
					dispatcher.on('error', console.error)
				})
				break;
			case "leave":
				//For emergencies, make the bot leave
				msg.member.voice.channel.leave()
				break;
			default:
				//For commands that require more information afterwards:

				//Wipe command to remove bot messages and commands
				if (msg.content.substring(1, 5) === "wipe") {
					if (msg.content.length > 5) {
						//If there is an amount specified set it equal to that
						amount = parseInt(msg.content.substring(5))
					}
					else {
						//Default amount it 50
						amount = 50
					}
					if (amount >= 0 && amount <= 100) {
						//Get the last 'amount' messages
						msg.channel.messages.fetch({
							limit: amount
						}).then(messages => {
							//Then filter the messages you want to delete (Bot messages, and the commands)
							const botmessages = messages.filter(msg => msg.author.bot || msg.content.startsWith("#") || msg.content.startsWith("_") || msg.content.startsWith("m.") || msg.content.startsWith("u!") || msg.content.startsWith("rpg ") || msg.content.startsWith("?") || msg.content.startsWith("~") || msg.content.startsWith("+") || msg.content.startsWith("p!") || msg.content.startsWith("!") || msg.content.startsWith("-") || msg.content.startsWith("$") || msg.content.startsWith("="))
							//Delete them all at once
							msg.channel.bulkDelete(botmessages)

							//Send info message saying how many were deleted
							msg.channel.send("Removed " + botmessages.size + " messages").then(tempMessage => {
								//React to it with Thanos, and then delete that message too
								tempMessage.react('718312854973055027')
								tempMessage.delete({
									timeout: 5000
								}).catch()
							})
						})
					}
					else {
						//If the amount is too high or too low use these responses
						if (amount > 100) {
							//Too many
							msg.channel.send("That's too many messages.")
						}
						else {
							//Less than 0
							msg.channel.send("How am I supposed to search a negative amount of messages?")
						}
					}
				}
				else if (msg.content.substring(1, 10) === "sonicsays") {
					//Custom Sonic Image Command
					//Create the canvas and the sonicsays image
					const canvas = Canvas.createCanvas(600, 340)
					const ctx = canvas.getContext('2d')
					const background = await Canvas.loadImage('./images/sonicsays.jpg')

					//Draw the image on the canvas
					ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

					//Font and color selection
					ctx.font = '25px sans-serif'
					ctx.fillStyle = '#ffffff'

					//Split up the message by the spaces to divide into new lines
					var wordsArr = msg.content.substring(11).split(" ")
					var messageArr = [""]
					var editedMessage = ""
					var j = 0
					for (var i = 0; i < wordsArr.length; i++) {
						//If the message gets too long, then add it to a new line
						if (messageArr[j].length + wordsArr[i].length > 27) {
							j++
							messageArr[j] = ""
						}
						messageArr[j] += wordsArr[i] + " "
					}

					//Create string with proper endlines
					for (i = 0; i < messageArr.length; i++) {
						editedMessage += messageArr[i] + "\n"
					}

					//Create text
					ctx.fillText(editedMessage, 20, 80, 350)

					//Send image
					const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sonicsays.png')
					msg.channel.send(attachment)
				}
				else if (msg.content.substring(1, 3) === "#1") {
					//Custom Victory Royale Image
					//Create the canvas and the Victory Royale image
					const canvas = Canvas.createCanvas(850, 280)
					const ctx = canvas.getContext('2d')
					const background = await Canvas.loadImage('./images/Victory.png')

					//Draw image
					ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

					//Font and color selection
					ctx.font = '58px sans-serif'
					ctx.fillStyle = '#ffffff'
					/*ctx.textAlign = "center"*/

					//Split up the message by the spaces to divide into new lines
					var wordsArr = msg.content.substring(4).split(" ")
					var messageArr = [""]
					var editedMessage = ""
					var j = 0
					for (var i = 0; i < wordsArr.length; i++) {
						//If the message gets too long, then add it to a new line
						if (j < 2 && messageArr[j].length + wordsArr[i].length > 16) {
							j++
							messageArr[j] = ""
						}
						messageArr[j] += wordsArr[i] + " "
					}

					//Create the string with proper endlines
					for (i = 0; i < messageArr.length; i++) {
						editedMessage += messageArr[i] + "\n"
					}

					//Create text
					ctx.rotate(-.02 * Math.PI)
					ctx.fillText(editedMessage, 210, 120)
					ctx.strokeText(editedMessage, 210, 120)

					//Send image
					const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'Victory.png')
					msg.channel.send(attachment)

				}
				else if (msg.content.substring(1, 5) === "poll") {
					//Create a Poll
					//Split the message by the '*' divider
					const pollParts = msg.content.split('*')

					if (pollParts.length < 3) {
						//If there is something missing send this response to tell them how to format it
						msg.channel.send("There is something missing from the poll, make sure there are 2 possible options. Separate the title and each option with a \'*\'.")
					}
					else if (pollParts.length > 11) {
						//If they use too many options then reply with this
						msg.channel.send("The max number of options is 10.")
					}
					else {
						//Creating a poll embeded message
						const Poll = new Discord.MessageEmbed()
							.setColor("#ffffff")
							.setURL("https://tinyurl.com/pollImage")
							.setTitle(pollParts[0].substring(6))
							.setThumbnail("https://images-na.ssl-images-amazon.com/images/I/51cOM2ZPaoL.png")

						//Create one string for all the options with new lines
						var optionText = ""
						for (i = 1; i < pollParts.length; i++) {
							optionText += i + ". " + pollParts[i] + "\n"
						}

						//Set the options in the option field
						Poll.addField("Options:", optionText)

						//The voting system is based on the reactions to the image
						//So react with the appropriate amount of options
						msg.channel.send(Poll).then(pollMessage => {
							pollMessage.react("1️⃣")
							pollMessage.react("2️⃣")
							if (pollParts.length > 3) {
								pollMessage.react("3️⃣")
								if (pollParts.length > 4) {
									pollMessage.react("4️⃣")
									if (pollParts.length > 5) {
										pollMessage.react("5️⃣")
										if (pollParts.length > 6) {
											pollMessage.react("6️⃣")
											if (pollParts.length > 7) {
												pollMessage.react("7️⃣")
												if (pollParts.length > 8) {
													pollMessage.react("8️⃣")
													if (pollParts.length > 9) {
														pollMessage.react("9️⃣")
														if (pollParts.length > 10) {
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
				}
				else if (msg.content.substring(1, 8) === "tourney" && !msg.author.bot) {
					//If there isn't a tournament happening then make one
					if (!tournamentDict[getServerIndex(tournamentDict, msg.guild.id)]) {
						//Create a tournmanet bracket
						var tourneyParticipants = msg.content.split(' * ')
						tourneyParticipants.shift()
						if (tourneyParticipants.length <= 128 && tourneyParticipants.length >= 4) {
							if (msg.content.substring(8, 9) === "r") {
								//If the tournament is seeded randomly then randomize the participants array
								//Shuffling the array with Fisher-Yates Algorithm
								var iterator = tourneyParticipants.length,
									temp, selection
								// While there remain elements to shuffle
								while (iterator) {
									// Pick a remaining element
									selection = Math.floor(Math.random() * iterator--)

									// And swap it with the current element.
									temp = tourneyParticipants[iterator]
									tourneyParticipants[iterator] = tourneyParticipants[selection]
									tourneyParticipants[selection] = temp
								}
							}
							else if (msg.content.substring(8, 9) === "s") {
								//If they want to seed the participants then this will put them in the right spot
								if (tourneyParticipants.length == 4 || tourneyParticipants.length == 8 || tourneyParticipants.length == 16 || tourneyParticipants.length == 32 || tourneyParticipants == 64) {
									slice = 1
									while (slice < tourneyParticipants.length / 2) {
										temp = tourneyParticipants.slice()
										tourneyParticipants = []
										while (temp.length > 0) {
											tourneyParticipants = tourneyParticipants.concat(temp.splice(0, slice))
											tourneyParticipants = tourneyParticipants.concat(temp.splice(-slice, slice))
										}
										slice *= 2
									}
								}
								else {
									//Function for seeded tournaments otherwise: https://stackoverflow.com/questions/5770990/sorting-tournament-seeds/45572051#45572051
									//Will wait til I understand it to implement
									msg.channel.send("Currently seeded tournaments only work with 4, 8, 16, 32, or 64 participants.")
								}

							}
							//Send starting message
							msg.channel.send("Tournament is starting with " + tourneyParticipants.length + " players!")

							//Fill the tournament with byes so that there are a power of 2 number of participants
							var i = 1
							if (tourneyParticipants.length > 64) {
								while (tourneyParticipants.length != 128) {
									tourneyParticipants.splice(i, 0, -1)
									i += 2
								}
							}
							else if (tourneyParticipants.length > 32) {
								while (tourneyParticipants.length != 64) {
									tourneyParticipants.splice(i, 0, -1)
									i += 2
								}
							}
							else if (tourneyParticipants.length > 16) {
								while (tourneyParticipants.length != 32) {
									tourneyParticipants.splice(i, 0, -1)
									i += 2
								}
							}
							else if (tourneyParticipants.length > 8) {
								while (tourneyParticipants.length != 16) {
									tourneyParticipants.splice(i, 0, -1)
									i += 2
								}
							}
							else if (tourneyParticipants.length > 4) {
								while (tourneyParticipants.length != 8) {
									tourneyParticipants.splice(i, 0, -1)
									i += 2
								}
							}

							//Create a tournament in the dictionary
							tournamentDict.push({
								info: {
									"ID": msg.guild.id,
									"winners": tourneyParticipants.slice(),
									"First": 0,
									"Second": 1
								}
							})
							msg.channel.send("After someone wins send, \"+*name* won\" to advance them.")

							//For every 'bye' advance the other person forward
							while (tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second] == -1) {
								msg.channel.send(tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First] +
									" gets a bye!")

								//Delete the bye and iterate the vars
								tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners.splice(tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second, 1)
								tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First++
									tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second++
							}
							//console.log(tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners.toString())

							//Send message for first real tournament round
							msg.channel.send("Ok, now it is time for: " +
								tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First] +
								" and " + tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second] +
								". Good Luck!")
						}
						else {
							//If they tried to enter an invalid amount of people
							if (tourneyParticipants.length > 128) {
								msg.channel.send("That's too many participants. The max is 128.")
							}
							else {
								msg.channel.send("You need a minimum of 4 participants for a tournament. If you have less than that, then I'm sure you can make the bracket in your head." +
									" Make sure you are formatting the command correctly. Put ' * ' in between each participant (with the spaces).")
							}
						}
					}
					else {
						//If there is already a tournament happening in the server
						msg.channel.send("There is already a tournament ocurring. Please wait for the current one to end before starting another. " +
							"Or type +forceTourneyEnd to stop the ongoing tourney.")
					}
				}
				else if (msg.content.endsWith("won")) {
					//If the first person won the tournament round advance them and remove the second person
					if (tournamentDict[getServerIndex(tournamentDict, msg.guild.id)]) {
						roundWinner = msg.content.split(" ")
						if (roundWinner[0].substring(1) == tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First] ||
							roundWinner[0].substring(1) == tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second]) {

							//Checks to see if it was the final round
							if (tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners.length > 2) {
								//console.log("This is winners rn: " + tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners.toString())

								//Congratulate the winner and remove the loser
								if (roundWinner[0].substring(1) == tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First]) {
									msg.channel.send("Congrats, " +
										tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First] +
										" on beating " + tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second] + ".")

									//Send voice command and then delete it
									msg.channel.send("+horn").then(message => {
										message.delete().catch()
									})

									//Remove loser and iterate the variables
									tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners.splice(tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second, 1)
									tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First++
									tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second++

								}
								else if (roundWinner[0].substring(1) == tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second]) {
									msg.channel.send("Well done, " + tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second] +
										". It's sad to see " + tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First] + " be defeated.")

									//Send voice command and the delete it instantly
									msg.channel.send("+ohyeah").then(message => {
										message.delete().catch()
									})

									//Remove Loser and iterate vars
									tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners.splice(tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First, 1)
									tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First++
									tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second++
								}

								//If the iterators are overflowing then reset them
								if (tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First >= tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners.length) {
									tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First = 0
									tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second = 1
								}

								//Check to see if the next round is the finals or just another round
								if (tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners.length > 2) {
									//Output the next round message with the new players
									const roundStarts = ["Next round will be: ", "Next up are: "]
									const roundStartsEndings = [". I know who I'm betting on.", ". Best of Luck!"]

									msg.channel.send(roundStarts[Math.floor(Math.random() * roundStarts.length)] +
										tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First] +
										" and " + tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second] +
										roundStartsEndings[Math.floor(Math.random() * roundStartsEndings.length)])
								}
								else {
									//Send a random finals message
									if (Math.random() > .5) {
										msg.channel.send("Time for the finals! This will be a legendary duel between " +
											tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First] +
											" and " + tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second] + "!")
									}
									else {
										msg.channel.send("Time for the finals! " +
											tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First] +
											" will battle " + tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second] +
											" in a legendary duel!")
									}
								}
							}
							else {
								//Send the ending message and delete the tournament from the dictionary
								if (roundWinner[0].substring(1) == tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First]) {
									msg.channel.send("YOUR TOURNAMENT CHAMPION IS " +
										tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.First].toUpperCase() +
										"! That was fun, let's do it again sometime!")

									//Send voice command and then delete it
									msg.channel.send("+ohyeah").then(message => {
										message.delete().catch()
									})
								}
								else if (roundWinner[0].substring(1) == tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second]) {
									msg.channel.send("YOUR TOURNAMENT CHAMPION IS " +
										tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.winners[tournamentDict[getServerIndex(tournamentDict, msg.guild.id)].info.Second].toUpperCase() +
										"! It was a hard fought battle with many twists.")

									//Send voice command and then delete it
									msg.channel.send("+horn").then(message => {
										message.delete().catch()
									})
								}

								//Delete Tournament
								tournamentDict.splice(getServerIndex(tournamentDict, msg.guild.id), 1)
							}
						}
						else {
							msg.channel.send("That is not one of the people in this round.")
						}
					}
					/* else {
						//If they to use the command without a tournament happening
						msg.channel.send("There isn't currently a tournament happening. Use +tourney to start one.")
					} */
				}
				else if (msg.content.substring(1) == "forceTourneyEnd") {
					if (tournamentDict[getServerIndex(tournamentDict, msg.guild.id)]) {
						//Stop the tournament and reset all the variables
						msg.channel.send("Tournament ended.")
						tournamentDict.splice(getServerIndex(tournamentDict, msg.guild.id), 1)
					}
					else {
						//If they to use the command without a tournament happening
						msg.channel.send("There isn't a tournament happening right now.")
					}
				}
				else {
					//If the user types an invalid command reply with this
					msg.channel.send("That's not a valid command. Try +info for help.")
				}
				break;

		}
		//Stop the typing status after the bot is done
		msg.channel.stopTyping(true)
	}
})
client.login(process.env.BOT_TOKEN)
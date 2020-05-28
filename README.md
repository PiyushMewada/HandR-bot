![Banner](/images/H&RBotLogo.png)

# How to run
Make sure you have node and npm installed. Clone the repository and run "npm install" to get all the dependencies and stuff.

Also make sure you have the necessary tools for Canvas. The requirements are listed here: [Canvas](https://github.com/Automattic/node-canvas#compiling)

Add a file called .env in the top level folder with the following format: 

``` json
BOT_TOKEN = "INSERT_BOT_TOKEN"
```

If you want the token, either text or email me. Replace the "INSERT_BOT_TOKEN" with the actual token, making sure to remove the quotes.

Simply open a command prompt and run the command "npm run dev" to get the bot online.

---
# Command List
## Text Commands:
- +headout: Displays the 'aight imma head out' gif.
- +megamoto: Sends a bunch of moto moto emojis.
- +poll: Creates a poll. People can vote by reacting to the message.
- +ping: Replies with Pong! to test if bot is online.
- +server: Displays server information.
- +sonicsays *text*: Gets Sonic to say the message.
- +wipe *n*: Searches the last *n* (max 100) messages and deletes bot messages and commands. Default is 50 if no *n* is given.
- +#1 *text*: Creates a Victory Royale image with the text instead.

## Voice Channel Commands:
- +clap: Ha, Gottem.
- +default: Default Dance from Fortnite.
- +getover: Just gotta get over.
- +haha: Plays a Laughtrack.
- +horn: MLG-AirHorn.
- +loss: Losinh sounds effect from 'The Price is Right'.
- +ohyeah: Vector's iconic line: "Oh yeah".
- +roll: Try it out.
- +rekt: Crowd going wild.
- +sans: Plays the first couple notes of Megalovania
- +smooth: Smooth Moves
- +yeet: Says "**YEET**".
- +leave: Makes bot leave the voice channel.

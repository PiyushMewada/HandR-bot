![Banner](/assets/H&RBotLogo.png)
Discord bot

# How to run
Make sure you have node and npm installed. Clone the repostiory and run "npm install" to get all the dependencies and stuff.

Also make sure you have the necessary tools for Canvas. The requirements are listed here: [Canvas](https://github.com/Automattic/node-canvas#compiling)

Add a file called .env in the top level folder with the following format: 

``` json
BOT_TOKEN = [INSERT_BOT_TOKEN];
```

If you want the token, either text or email me. Replace the [INSERT_BOT_TOKEN] with the actual token, making sure to remove the brackets.

Simply open a command prompt and run the command "npm run dev" to get the bot online.

---
# Command List
## Text Commands:
+headout: Displays the 'aight imma head out' gif.
+megamoto: Sends a bunch of moto moto emojis.
+ping: Replies with Pong! to test if bot is online.
+server: Displays server information.
+sonicsays *text*: Gets Sonic to say the message.
+wipe *n*: Searches the last *n* (max 100) messages and deletes bot messages and commands. Default is 50 if no *n* is given.

## "Voice Channel Commands:
+donkey: Gordon Ramsay's 'You Fucking Donkey!
+getover: Just gotta get over.
+horn: MLG-AirHorn.
+ohyeah: Vector's iconic line: "Oh yeah".
+rekt: Crowd going wild.
+yeet: Says "**YEET**".
+leave: Makes bot leave the voice channel.

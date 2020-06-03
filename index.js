const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => { //Activities code below when the bot is turned on
    console.log('This bot is online') // Message "This bot is online" when the bot is online

    client.user.setStatus('invisible') //Set the bot status as invisible
}) 

client.on('message', message => { // Activities code below when a message is sent
    // Variables
    var msg = message.content.toLowerCase(); //Takes the message and sets it to all lowercase
    var msg_length = message.content.length(); //Takes the message and gives the length in number of characters the bot is
    var msg_length_mod = msg.slice(1,msg_length); //Takes the message and removes the first character 
    var exclamation_pos = msg_length_mod.indexOf('!'); //Finds the first exclamation point of msg_length_mod
    var last_exclamation_pos = msg.lastIndexOf('!'); //Finds the last index of exclamtion point of the message
    var prefix = ['!', '-','<@']; // List of prefixes bots use
    var exclamation_point = true; // Assumes the message contains an exclamation point
    var prefix_exclamation_point = []; // List for indexes of exclamation marks in prefixes
    var mention = message.mentions.users.first(); //Finds the first mentions (@user) in the message

    for (var i in prefix) { //Searches for the indexes of exclamation points in prefix
        if (prefix[i].indexOf('!') != -1) { //Checks if there is an exclamation point in the prefix
            prefix_exclamation_point.push(prefix[i].lastIndexOf('!')); //Adds the last index of an exclamation point from the prefix into the list prefix_exclamation_point
        } else { //If there is no exclamation points it assumes the last exclamation point is at index(0) or the first character
            prefix_exclamation_point.push('0');
        }

    }

    //Ignores Bot Messages and Other Bot Pings
    if (message.author.bot) return; //Skips code if the message is from a bot

    for (var i in prefix) { //Checks if the message is a bot ping and sets exclamation_point to false
        if (msg_length != 1) { //Checks if the ping is an actual ping and determines if it is a singular exclamation point
            if (last_exclamation_pos == prefix_exclamation_point[i]) { //Determines if there is exclamation points outside bot ping
                if (msg.startsWith(prefix[i])) { //Checks if the message starts with a bot prefix
                    exclamation_point = false; //Returns exclamation_point as false, so later it will not be deleted
                    return; //Returns and skips the rest of the code
                }
            }
        }
    }

    //Declares the characters, words, or phrases that are blacklisted
    let blacklisted = ['!', '¡', '！'] //List of blacklisted characters, words, or phrases that will be checked to delete the message

    //Checks  if the message contains blacklisted characters, words, or phrases and if found deletes the message
    let foundInText = false; //Variable used to determine if the message contains anything in the blacklist

    if (exclamation_pos != -1) foundInText = true; //Checks if there is exclamation points and if so change foundInText to true

    for (var i in blacklisted) { //Cycles through blacklisted characters, words, or phrases 
        if (msg.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true; //Determines if the message contains any blacklisted characters, words, or phrases and then if there is sets foundInText to true
    }
    if (mention != null) { //Checks if the message does not contain mentions
        if (foundInText == false) return; //Checks if the message contains mentions and if it does
    }

    if (foundInText) message.delete();

});

client.login(process.env.token);
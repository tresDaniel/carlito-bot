var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    // var message = "!1d6:1d";
    //  if (message.substring(0, 1) == '!') {
    //     var args = message.substring(1).split(/[d:\[]/);
    //     var numDados = args[0];
    //     var numLados = args[1];
    //     var numDadosColoridos = args[2];

    //     var rolagem
    //     var resultado = "A rolagem foi: \n";
    //     for (var i = 0; i < numDados; i++) {
    //         if(i < numDadosColoridos){
    //             rolagem = Math.floor((Math.random() * numLados) + 1);  
    //             resultado += rolagem + " dark \n";
    //         } else{
    //             rolagem = Math.floor((Math.random() * numLados) + 1);  
    //             resultado += rolagem + " light\n";
    //         }
    //     }

    //     console.log(resultado);
    // }
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
     if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(/[d:\[]/);
        var numDados = args[0];
        var numLados = args[1];
        var numDadosColoridos = args[2];
        
        var rolagem
        var resultado = "```md\nA rolagem foi: \n--------\n";
        for (var i = 0; i < numDados; i++) {
            if(i < numDadosColoridos){
                rolagem = Math.floor((Math.random() * numLados) + 1);  
                resultado += "> " + rolagem + "\n";
            } else{
                rolagem = Math.floor((Math.random() * numLados) + 1);  
                resultado += rolagem + "\n";
            }
        }

        resultado += "```";

        if(numLados != '' && numDados != '' ){
            bot.sendMessage({
            to: channelID,
            message: resultado
            });
        }
     }
    
});
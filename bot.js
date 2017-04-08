var builder = require('botbuilder');
var request = require('request');

// imgfliplogin
// usr: previewdaybot
// password: mememe

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

//var dialog = new builder.DialogAction(connector);

bot.dialog('/', [
    function(session){
	session.beginDialog('/intro');
    },
    function(session){
    	session.beginDialog('/getWeather');
    },
    function(session, results){
    	session.send('Hello %s!', results.response);
    }
]);

// var memeGen = request('https://api.imgflip.com/get_memes', function(err, response, body){
//     console.log(body);
// });
// var memes = request('https://api.imgflip.com/caption_image', function(err, response, body){
//     console.log(body);
// });

var holder = request('http://api.wunderground.com/api/4863d9fbca8e5290/conditions/q/CA/Los_Angeles.json', function(err, response, body){
    var h = JSON.parse(body);
//    console.log(h.current_observation.temperature_string);
    bot.dialog('/getWeather', [
	function(session){
    	    builder.Prompts.text(session, 'wanna know the weather??');
	},
	function(session, results){
    	    if(results.response.toLowerCase() == 'yes'){
    		builder.Prompts.text(session, h.current_observation.temperature_string);
    	    }
    	    else{
    		session.send('Screw you then!');
    	    }
	}
    ]);
});


bot.dialog('/intro', [
    function(session){
	    builder.Prompts.text(session,'Whats up dude');
    },
    function(session, results){
	session.endDialogWithResult(results);
    }
]);





// bot.dialog('/', [
//     function (session) {
//         session.beginDialog('/askName');
//     },
//     function (session, results) {
//         session.send('Hello %s!', results.response);
//     }
// ]);
// bot.dialog('/askName', [
//     function (session) {
//         builder.Prompts.text(session, 'Hi! What is your name?');
//     },
//     function (session, results) {
//         session.endDialogWithResult(results);
//     }
// ]);

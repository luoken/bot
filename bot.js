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
    function(session, results){
	builder.Prompts.text(session,"Hi "+ results.response + " I was kinda built overnight, wanna see what things I can do?");
    },
    function(session, results){
	session.userData.answer = results.response;
	if(session.userData.answer == 'sure' || 'yes'){
    	    session.beginDialog('/give choices');
    	}
    	else{
	    session.send("Well what else do you want me to do? I can determine what marvel superhero you can be.... or pokemon maybe?");
    	}
    },
    function(session, results){
	session.userData.choice = results.response.entity;
	if(session.userData.choice.toLowerCase == 'tell me the weather!' || 'weather'){
	    session.beginDialog('/getWeather');
	}
    }

    // function(session){
    // 	session.beginDialog('/getWeather');
    // }
]);

// var memeGen = request('https://api.imgflip.com/get_memes', function(err, response, body){
//     console.log(body);
// });
// var memes = request('https://api.imgflip.com/caption_image', function(err, response, body){
//     console.log(body);
// });


bot.dialog('/give choices',[
    function(session){
	builder.Prompts.choice(session, "So I can tell you the Weather or you can make dank memes through me, whatcha want?", "dank memes|tell me the weather!");
    },
    function(session, results){
	session.endDialogWithResult(results);
    }
]);


var holder = request('http://api.wunderground.com/api/4863d9fbca8e5290/conditions/q/CA/Los_Angeles.json', function(err, response, body){});
//    var h = JSON.parse(body);

    bot.dialog('/getWeather', [
	function(session){
	    session.beginDialog('/getState');
	},
	function(session,results){
	    session.userData.getState = results.response;
	    session.beginDialog('/getCity');
	},

	function(session, results){
	    session.userData.getCity = results.response;
	    var holder = request('http://api.wunderground.com/api/4863d9fbca8e5290/conditions/q/'+ session.userData.getState+'/' + session.userData.getCity + '.json', function(err, response, body){
		var h = JSON.parse(body);
		console.log(h);
		
	    builder.Prompts.text(session, "The area you selected was " + h.current_observation.display_location.full + " and the temperature is " + h.current_observation.temperature_string + " but it feels more like " + h.current_observation.feelslike_string);
	    });

    	    // if(results.response.toLowerCase() == 'yes' || results.response.toLowerCase() == 'sure'){
    	    // 	builder.Prompts.text(session, h.current_observation.temperature_string);
    	    // }
    	    // else{
    	    // 	session.send('Screw you then!');
    	    // }
	},
	function(sess, res){
	    builder.Prompts.text(sess, 'Want to do another city and state?');
	}
    ]);

bot.dialog('/getState',[
    function(session){
	builder.Prompts.text(session, 'What state did you want to look up? type in as an abbreviation');
    },
    function(session, results){
	session.endDialogWithResult(results);
    }
]);

bot.dialog('/getCity',[
    function(session){
	builder.Prompts.text(session, 'What city did you wanna look up? if you\'re looking up Los Angeles, input it as Los_Angeles.');
    },
    function(session, results){
	session.endDialogWithResult(results);
    }
    
]);

bot.dialog('/intro', [
    function(session){
	builder.Prompts.text(session,'What should I call you dude?');
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

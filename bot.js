var builder = require('botbuilder');
var request = require('request');

// imgfliplogin
// usr: previewdaybot
// password: mememe

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function(session){
	session.beginDialog('/intro');
    },

    function(session, results){
	builder.Prompts.text(session,"Hi "+ results.response + " I was kinda built overnight, wanna see what things I can do?");
    },

    function(session, results){
	session.userData.answer = results.response;

	if(session.userData.answer == 'sure' || session.userData.answer == 'yes'){
    	    session.beginDialog('/give choices');
    	}
    	else{
	    session.send("Well what else do you want me to do? I can determine what marvel superhero you can be.... or pokemon maybe?");
    	}
    },

    function(session, results){
    	session.userData.choice = results.response.entity;
    	console.log(session.userData.choice);

    	    if(session.userData.choice == 'tell me the weather!' || session.userData.choice == 'weather'){
    		session.beginDialog('/howToEnterValues');
    	    }
    	    else{
    		session.send("HA! you suck");
    	    }
    },
    
    function(sess, res){
    	sess.userData.choice2 = res.response.entity;
    	if(sess.userData.choice2 == 'zip (we all know you\'re lazy)' || sess.userData.choice2 == 'zip'){
    	    sess.beginDialog('/zip');
    	}
    	else if(sess.userData.choice2  == 'city and state' || sess.userData.choice2 == 'city'){
    	    sess.beginDialog('/getWeatherWithCityState');
    	}
    },
    function(sess, res){
	
    	var holder = request('http://api.wunderground.com/api/4863d9fbca8e5290/conditions/q/'+ sess.userData.getState+'/' + sess.userData.getCity + '.json', function(err, response, body){
    	    var h = JSON.parse(body);
	    
    	    builder.Prompts.text(sess, "The area you selected was " + h.current_observation.display_location.full + " and the temperature is " + h.current_observation.temperature_string + " but it feels more like " + h.current_observation.feelslike_string);
    	});
    }
]);

// var memeGen = request('https://api.imgflip.com/get_memes', function(err, response, body){
//     console.log(body);
// });
// var memes = request('https://api.imgflip.com/caption_image', function(err, response, body){
//     console.log(body);
// });

bot.dialog('/howToEnterValues',[
    function(session){
	builder.Prompts.choice(session, "How do you want to enter your values?", "Zip|City and State");
    },
    function(sess, res){
	sess.userData.choiceFromEnterValues = res.response.entity;
	sess.endDialogWithResult(res);
    }
]);

bot.dialog('/zip',[
    function(session){
	builder.Prompts.text(session, "Whats the Zipcode you wanna input?");
    },
    function(sess, res){
	sess.userData.zip = res.response;
	sess.endDialogWithResult(res);
    }
]);

bot.dialog('/give choices',[
    function(session){
	builder.Prompts.choice(session, "So I can tell you the Weather or you can make dank memes through me, whatcha want?", "dank memes|tell me the weather!");
    },
    function(session, results){
	session.endDialogWithResult(results);
    }
]);

bot.dialog('/getWeatherWithCityState', [
    function(session){
	session.beginDialog('/getState');
    },
    function(session,results){
	session.userData.getState = results.response;
	session.beginDialog('/getCity');
    },
    function(session, results){
	session.userData.getCity = results.response;
	session.endDialogWithResults(results);
	// var holder = request('http://api.wunderground.com/api/4863d9fbca8e5290/conditions/q/'+ session.userData.getState+'/' + session.userData.getCity + '.json', function(err, response, body){
	// 	var h = JSON.parse(body);
	
	// builder.Prompts.text(session, "The area you selected was " + h.current_observation.display_location.full + " and the temperature is " + h.current_observation.temperature_string + " but it feels more like " + h.current_observation.feelslike_string);
	// });

    	// if(results.response.toLowerCase() == 'yes' || results.response.toLowerCase() == 'sure'){
    	// 	builder.Prompts.text(session, h.current_observation.temperature_string);
    	// }
    	// else{
    	// 	session.send('Screw you then!');
    	// }
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

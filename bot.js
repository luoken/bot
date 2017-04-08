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
    	if(session.userData.choice == 'tell me the weather!' || session.userData.choice == 'weather'){
    	    session.beginDialog('/howToEnterValues');
    	}
    	else{
	    session.beginDialog('/introToMeme');
    	}
    },

    function(sess, res){
	if(res.response.entity){
	    sess.userData.choice2 = res.response.entity;
    	    if(sess.userData.choice2.toLowerCase() == 'zip'){
    		sess.beginDialog('/zip');
    	    }
    	    else if(sess.userData.choice2.toLowerCase()  == 'city and state' || sess.userData.choice2 == 'city'){
    		sess.beginDialog('/getWeatherWithCityState');
    	    }
	}
	else{
	    sess.send("jk no memes here, look in the mirror for a meme");
	}
    }
]);

// var memes = request('https://api.imgflip.com/caption_image', function(err, response, body){
//     console.log(body);
// });
bot.dialog('/add text', [
    function(session){
	builder.Prompts.text(session, "Do you want to add text to the top, bottom or both?");
    },
    function(sess, res){
	
    }
]);

bot.dialog('/introToMeme', [
    function(session){
	var memeGen = request('https://api.imgflip.com/get_memes', function(err, response, body){
	    var temp = JSON.parse(body);
	    builder.Prompts.text(session, "I got some dank choices for you to make. Check it out: " + temp.data.memes[0].name + ", " + temp.data.memes[1].name + ", " + temp.data.memes[2].name + ", " + temp.data.memes[3].name + ", " + temp.data.memes[5].name + " and many more! just try typing in something and i'll let you know if i got it or not.");
	});
    },

    function(sess, req){
	var memeGen = request('https://api.imgflip.com/get_memes', function(err, response, body){
	    var temp = JSON.parse(body);
	    for(i = 0; i < temp.data.memes.length; i++){
		if(req.response == temp.data.memes[i].name.toLowerCase()){
		    sess.endDialogWithResult(req);
		}
	    }
	});
    }
    // function(sess, res){
    // 	var memeGen = request('https://api.imgflip.com/get_memes', function(err, response, body){
    // 	    var temp = JSON.parse(body);
    // 	    var memeArray = [];
	    
    // 	    for(i = 0; i < 5; i++){
    // 		memeArray.push(temp.data.memes[i].name);
    // 	    }
    // 	    builder.Prompts.text(sess, memeArray[0] + " " + memeArray[1]);
    // 	});
				
    // }
]);

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

	var holder = request('http://api.wunderground.com/api/4863d9fbca8e5290/conditions/q/'+ sess.userData.zip + '.json', function(err, response, body){
    	    var h = JSON.parse(body);
	    
    	    builder.Prompts.text(sess, "The area you selected was " + h.current_observation.display_location.full + " and the temperature is " + h.current_observation.temperature_string + " but it feels more like " + h.current_observation.feelslike_string);
	});
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

	var holder = request('http://api.wunderground.com/api/4863d9fbca8e5290/conditions/q/'+ session.userData.getState+'/' + session.userData.getCity + '.json', function(err, response, body){
		var h = JSON.parse(body);
	
	builder.Prompts.text(session, "The area you selected was " + h.current_observation.display_location.full + " and the temperature is " + h.current_observation.temperature_string + " but it feels more like " + h.current_observation.feelslike_string);
	});
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

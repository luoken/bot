var builder = require('botbuilder');
var request = require('request');
var bodyParser = require('body-parser');


var holder = request('http://api.wunderground.com/api/4863d9fbca8e5290/conditions/q/CA/Los_Angeles.json', function(err, response, body){
//    console.log(body);
    var h = JSON.parse(body);

    //    console.log(h.current_observation.zip);
    //    console.log(h.response.version);
    console.log(h.current_observation.temperature_string);
});





//console.log(h.temp_f);
//console.log(h);

// var connector = new builder.ConsoleConnector().listen();
// var bot = new builder.UniversalBot(connector);

// bot.dialog('/', [
//     // function(session){
//     // 	session.beginDialog('/askName');
//     // },
//     // function(session, results){
//     // 	session.send('Hello %s!', results.response);
//     // }
//     function(session){
// 	builder.Prompts.text(session, 'Hi! whats yo name');
//     },
//     function(session, results){
// 	session.send('hello ' + results.response);
//     }

    
// ]);

// bot.dialog('/askName', [
//     function(session){
// 	builder.Prompts.text(session, 'Hi! What is your name?');
//     },
//     function(session, results){
// 	session.endDialogWithResult(results);
//     }
// ]);



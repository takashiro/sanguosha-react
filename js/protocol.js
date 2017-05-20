
var net = enums([
	"Invalid",

	"CheckVersion",

	"Login",
	"Logout",

	"CreateRoom",
	"EnterRoom",

	"Speak",

	"NetworkCommandCount"
]);

function BasicActions(){
	var actions = {};

	actions[net.Speak] = function(args){
		var user_name = args.uid;

		var speaker = $('<div></div>');
		speaker.addClass('speaker');
		speaker.html(user_name);

		var message = $('<div></div>');
		message.html(args.message);

		var log = $('<li></li>');
		log.append(speaker);
		log.append(message);

		$('#chat-log').append(log);
	};

	return actions;
}

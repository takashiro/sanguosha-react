
const net = enums([
	"Invalid",

	"CheckVersion",

	"Login",
	"Logout",

	"CreateRoom",
	"EnterRoom",
	"UpdateRoom",

	"SetUserList",
	"AddUser",
	"RemoveUser",

	"Speak",
	"LoadGame",

	"NetworkCommandCount"
]);

function BasicActions(){
	var actions = {};

	actions[net.Login] = function(uid){
		if(isNaN(uid) || uid <= 0){
			alert('Login failed');
			return;
		}

		room.uid = uid;

		if($_GET['room_id']){
			var room_id = parseInt($_GET['room_id'], 10);
			if(!isNaN(room_id) && room_id > 0){
				if($_GET['action'] == 'create'){
					server.request(net.CreateRoom, {
						'id' : room_id,
						'game' : 'sanguosha'
					});
				}else{
					server.request(net.EnterRoom, {
						'id' : room_id,
						'game' : 'sanguosha'
					});
				}
			}
		}
	}

	actions[net.Logout] = function(){
		alert('You logged out.');
	};

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

	var update_owner_panel = function(){
		if(room.owner_id == room.uid){
			$('#owner-panel').show();
		}
	};

	actions[net.EnterRoom] = function(args){
		var room_id = parseInt(args.room_id, 10);
		var owner_id = parseInt(args.owner_id, 10);
		if(!isNaN(room_id)){
			$('#room-id').text(room_id);
		}

		room.id = room_id;
		room.owner_id = owner_id;
		update_owner_panel();
	}

	actions[net.UpdateRoom] = function(args){
		var owner_id = parseInt(args.owner_id, 10);
		if(!isNaN(owner_id) && owner_id > 0){
			room.owner_id = owner_id;
			update_owner_panel();
		}
	}

	actions[net.SetUserList] = function(args){
		for(let uid of args){
			room.users[uid] = new Photo(uid);
		}
	};

	actions[net.AddUser] = function(uid){
		if(room.users[uid]){
			room.users[uid].remove();
			delete room.users[uid];
		}
		room.users[uid] = new Photo(uid);
	};

	actions[net.RemoveUser] = function(uid){
		if(room.users[uid]){
			room.users[uid].remove();
			delete room.users[uid];
		}
	};

	return actions;
}
